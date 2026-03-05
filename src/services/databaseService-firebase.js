// Firebase Database Service
// This file replaces src/services/databaseService.js

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { tierUpgradesArray, swordUpgradesArray, summonUpgradesArray } from '../data/upgradeData';
import { prestigeArtifacts } from '../data/prestigeArtifacts';
import { achievements } from '../data/achievementData';

export const databaseService = {
  // Initialize all user data
  async initializeNewUser(userId, username) {
    try {
      console.log('Initializing new user:', userId, username);
      
      // Create user record first (source of truth for username)
      const userDoc = {
        id: userId,
        username: username,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', userId), userDoc);

      // Create leaderboard entry with same username
      const leaderboardDoc = {
        userId: userId,
        username: username,
        totalCoins: 0,
        prestigeLevel: 0,
        achievementsEarned: 0,
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'leaderboard', userId), leaderboardDoc);

      // Initialize game data
      const gameProgressDoc = {
        userId: userId,
        clicks: 0,
        clickValue: 1,
        cps: 0,
        prestigeCurrency: 0,
        prestigeLevel: 0,
        prestigeRequirement: 1000,
        lastUpdate: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'gameProgress', userId), gameProgressDoc);

      // Initialize upgrades
      const upgradesDoc = {
        userId: userId,
        tierUpgrades: tierUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        swordUpgrades: swordUpgradesArray.map(upgrade => ({ ...upgrade, purchased: false })),
        summonUpgrades: summonUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        artifacts: prestigeArtifacts.map(artifact => ({ ...artifact, level: 0 })),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'upgrades', userId), upgradesDoc);

      // Initialize achievements
      const achievementsDoc = {
        userId: userId,
        achievements: achievements.map(achievement => ({
          ...achievement,
          earned: false,
          progress: 0
        })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'achievements', userId), achievementsDoc);

      // Initialize lifetime stats
      const statsDoc = {
        userId: userId,
        totalClicks: 0,
        totalCoins: 0,
        totalPrestiges: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'lifetimeStats', userId), statsDoc);

      return { success: true };
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    }
  },

  // Load user data
  async loadUserData(userId) {
    try {
      // Load each type of data separately
      const [
        gameProgressSnap,
        upgradesSnap,
        achievementsSnap,
        lifetimeStatsSnap,
        leaderboardSnap
      ] = await Promise.all([
        getDoc(doc(db, 'gameProgress', userId)),
        getDoc(doc(db, 'upgrades', userId)),
        getDoc(doc(db, 'achievements', userId)),
        getDoc(doc(db, 'lifetimeStats', userId)),
        getDoc(doc(db, 'leaderboard', userId))
      ]);

      // Initialize missing data with defaults
      let gameProgress = gameProgressSnap.data();
      if (!gameProgress) {
        gameProgress = await this.saveGameProgress(userId, {
          clicks: 0,
          clickValue: 1,
          cps: 0,
          prestigeCurrency: 0,
          prestigeLevel: 0,
          prestigeRequirement: 1000
        });
      }

      let upgrades = upgradesSnap.data();
      if (!upgrades) {
        upgrades = await this.saveUpgrades(userId, {
          tierUpgrades: tierUpgradesArray,
          swordUpgrades: swordUpgradesArray,
          summonUpgrades: summonUpgradesArray,
          artifacts: prestigeArtifacts
        });
      }

      let userAchievements = achievementsSnap.data();
      if (!userAchievements) {
        userAchievements = await this.saveAchievements(userId, achievements);
      }

      let lifetimeStats = lifetimeStatsSnap.data();
      if (!lifetimeStats) {
        lifetimeStats = await this.saveLifetimeStats(userId, {
          clicks: 0,
          coins: 0,
          prestigeCount: 0
        });
      }

      let leaderboard = leaderboardSnap.data();
      if (!leaderboard) {
        // Try to get username from users table
        const userDocSnap = await getDoc(doc(db, 'users', userId));
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          leaderboard = await this.updateLeaderboard(userId, userData.username, {
            totalCoins: 0,
            prestigeLevel: 0,
            achievementsEarned: 0
          });
        }
      }

      // Return combined data
      return {
        data: {
          progress: gameProgress,
          upgrades: upgrades,
          achievements: userAchievements,
          stats: lifetimeStats,
          leaderboard: leaderboard
        }
      };
    } catch (error) {
      console.error('Error loading user data:', error);
      throw error;
    }
  },

  // User Management
  async createUser(userId, username) {
    try {
      // First check if username is available
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error('Username already taken');
      }

      // Create user record
      const userData = {
        id: userId,
        username,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', userId), userData);

      // Also update leaderboard
      const leaderboardData = {
        userId: userId,
        username,
        totalCoins: 0,
        prestigeLevel: 0,
        achievementsEarned: 0,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'leaderboard', userId), leaderboardData);

      return { data: userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Game Progress
  async saveGameProgress(userId, progress) {
    try {
      // Get current progress to validate changes
      const currentProgressSnap = await getDoc(doc(db, 'gameProgress', userId));
      const currentProgress = currentProgressSnap.data();

      // Validate changes
      const validatedProgress = {
        userId: userId,
        clicks: Math.floor(Number(progress.clicks) || 0),
        clickValue: Math.floor(Number(progress.clickValue) || 1),
        cps: Math.floor(Number(progress.cps) || 0),
        prestigeCurrency: Math.floor(Number(progress.prestigeCurrency) || 0),
        prestigeLevel: Math.floor(Number(progress.prestigeLevel) || 0),
        prestigeRequirement: Math.floor(Number(progress.prestigeRequirement) || 1000),
        lastUpdate: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // If there's existing progress, validate the changes
      if (currentProgress) {
        const timeDiff = Date.now() - currentProgress.lastUpdate?.toDate?.().getTime() || Date.now();
        const maxClicksPerSecond = 20;
        const maxPossibleClicks = (timeDiff / 1000) * maxClicksPerSecond;
        const clickDiff = validatedProgress.clicks - currentProgress.clicks;

        // If clicks increased more than possible, reject the update
        if (clickDiff > maxPossibleClicks) {
          throw new Error('Invalid click rate detected');
        }

        // Validate CPS isn't higher than possible from upgrades
        const maxPossibleCPS = 1000000;
        if (validatedProgress.cps > maxPossibleCPS) {
          throw new Error('Invalid CPS value detected');
        }

        // Validate prestige level changes
        if (validatedProgress.prestigeLevel > currentProgress.prestigeLevel + 1) {
          throw new Error('Invalid prestige level change detected');
        }
      }

      await setDoc(doc(db, 'gameProgress', userId), validatedProgress);
      return { data: validatedProgress };
    } catch (error) {
      console.error('Error saving game progress:', error);
      throw error;
    }
  },

  async loadGameProgress(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'gameProgress', userId));

      if (!docSnap.exists()) {
        // Create initial progress
        return this.saveGameProgress(userId, {
          clicks: 0,
          clickValue: 1,
          cps: 0,
          prestigeCurrency: 0,
          prestigeLevel: 0,
          prestigeRequirement: 1000
        });
      }

      const data = docSnap.data();
      
      // Ensure all values are proper integers
      return {
        data: {
          ...data,
          clicks: Math.floor(Number(data.clicks) || 0),
          clickValue: Math.floor(Number(data.clickValue) || 1),
          cps: Math.floor(Number(data.cps) || 0),
          prestigeCurrency: Math.floor(Number(data.prestigeCurrency) || 0),
          prestigeLevel: Math.floor(Number(data.prestigeLevel) || 0),
          prestigeRequirement: Math.floor(Number(data.prestigeRequirement) || 1000)
        }
      };
    } catch (error) {
      console.error('Error loading game progress:', error);
      throw error;
    }
  },

  // Upgrades
  async saveUpgrades(userId, upgrades) {
    try {
      const defaultUpgrades = {
        tierUpgrades: tierUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        swordUpgrades: swordUpgradesArray.map(upgrade => ({ ...upgrade, purchased: false })),
        summonUpgrades: summonUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        artifacts: prestigeArtifacts.map(artifact => ({ ...artifact, level: 0 }))
      };

      const upgradeData = {
        userId: userId,
        tierUpgrades: upgrades.tierUpgrades || defaultUpgrades.tierUpgrades,
        swordUpgrades: upgrades.swordUpgrades || defaultUpgrades.swordUpgrades,
        summonUpgrades: upgrades.summonUpgrades || defaultUpgrades.summonUpgrades,
        artifacts: upgrades.artifacts || defaultUpgrades.artifacts,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'upgrades', userId), upgradeData);
      return { data: upgradeData };
    } catch (error) {
      console.error('Error saving upgrades:', error);
      throw error;
    }
  },

  async loadUpgrades(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'upgrades', userId));

      const defaultUpgrades = {
        tierUpgrades: tierUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        swordUpgrades: swordUpgradesArray.map(upgrade => ({ ...upgrade, purchased: false })),
        summonUpgrades: summonUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
        artifacts: prestigeArtifacts.map(artifact => ({ ...artifact, level: 0 }))
      };

      if (!docSnap.exists()) {
        return this.saveUpgrades(userId, defaultUpgrades);
      }

      const data = docSnap.data();

      // Ensure all upgrades exist with proper structure
      return {
        data: {
          ...data,
          tierUpgrades: data.tierUpgrades || defaultUpgrades.tierUpgrades,
          swordUpgrades: data.swordUpgrades || defaultUpgrades.swordUpgrades,
          summonUpgrades: data.summonUpgrades || defaultUpgrades.summonUpgrades,
          artifacts: data.artifacts || defaultUpgrades.artifacts
        }
      };
    } catch (error) {
      console.error('Error loading upgrades:', error);
      throw error;
    }
  },

  // Achievements
  async saveAchievements(userId, userAchievements) {
    try {
      // Always ensure we have the full achievement structure
      const defaultAchievements = achievements.map(achievement => ({
        ...achievement,
        earned: false,
        progress: 0
      }));

      // Merge existing achievements with defaults
      const mergedAchievements = defaultAchievements.map(defaultAchievement => {
        const existingAchievement = userAchievements.find(a => a.id === defaultAchievement.id);
        return existingAchievement || defaultAchievement;
      });

      const achievementData = {
        userId: userId,
        achievements: mergedAchievements,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'achievements', userId), achievementData);
      return { data: achievementData };
    } catch (error) {
      console.error('Error saving achievements:', error);
      throw error;
    }
  },

  async loadAchievements(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'achievements', userId));

      // Initialize with default achievements if no data exists
      if (!docSnap.exists()) {
        const defaultAchievements = achievements.map(achievement => ({
          ...achievement,
          earned: false,
          progress: 0
        }));

        const achievementData = {
          userId: userId,
          achievements: defaultAchievements,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await setDoc(doc(db, 'achievements', userId), achievementData);
        return { data: achievementData };
      }

      const data = docSnap.data();

      // Ensure all achievements exist with proper structure
      const currentAchievements = data.achievements || [];
      const updatedAchievements = achievements.map(achievement => {
        const existing = currentAchievements.find(a => a.id === achievement.id);
        return {
          ...achievement,
          earned: existing?.earned || false,
          progress: existing?.progress || 0
        };
      });

      // Update if achievements were missing or changed
      if (JSON.stringify(currentAchievements) !== JSON.stringify(updatedAchievements)) {
        await updateDoc(doc(db, 'achievements', userId), { 
          achievements: updatedAchievements,
          updatedAt: serverTimestamp()
        });
      }

      return {
        data: {
          ...data,
          achievements: updatedAchievements
        }
      };
    } catch (error) {
      console.error('Error loading achievements:', error);
      // Return default achievements on error
      return {
        data: {
          achievements: achievements.map(achievement => ({
            ...achievement,
            earned: false,
            progress: 0
          }))
        }
      };
    }
  },

  // Lifetime Stats
  async saveLifetimeStats(userId, stats) {
    try {
      const statsData = {
        userId: userId,
        totalClicks: Math.floor(Number(stats.clicks) || 0),
        totalCoins: Math.floor(Number(stats.coins) || 0),
        totalPrestiges: Math.floor(Number(stats.prestigeCount) || 0),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'lifetimeStats', userId), statsData);
      return { data: statsData };
    } catch (error) {
      console.error('Error saving lifetime stats:', error);
      throw error;
    }
  },

  async loadLifetimeStats(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'lifetimeStats', userId));

      if (!docSnap.exists()) {
        // Create initial stats
        return this.saveLifetimeStats(userId, {
          clicks: 0,
          coins: 0,
          prestigeCount: 0
        });
      }

      const data = docSnap.data();

      // Ensure all values are proper integers
      return {
        data: {
          ...data,
          totalClicks: Math.floor(Number(data.totalClicks) || 0),
          totalCoins: Math.floor(Number(data.totalCoins) || 0),
          totalPrestiges: Math.floor(Number(data.totalPrestiges) || 0)
        }
      };
    } catch (error) {
      console.error('Error loading lifetime stats:', error);
      throw error;
    }
  },

  // Leaderboard
  async updateLeaderboard(userId, username, stats) {
    try {
      // Get current stats to validate changes
      const currentStatsSnap = await getDoc(doc(db, 'leaderboard', userId));
      const currentStats = currentStatsSnap.data();

      // Validate changes
      const validatedStats = {
        totalCoins: Math.floor(Number(stats.totalCoins) || 0),
        prestigeLevel: Math.floor(Number(stats.prestigeLevel) || 0),
        achievementsEarned: Math.floor(Number(stats.achievementsEarned) || 0)
      };

      // If there are existing stats, validate the changes
      if (currentStats) {
        // Validate coin increase isn't impossibly high
        const maxPossibleCoinsPerHour = 1000000000;
        const timeDiff = Date.now() - currentStats.updatedAt?.toDate?.().getTime() || Date.now();
        const maxPossibleIncrease = (timeDiff / 3600000) * maxPossibleCoinsPerHour;
        
        if (validatedStats.totalCoins - currentStats.totalCoins > maxPossibleIncrease) {
          throw new Error('Invalid coin increase detected');
        }

        // Validate prestige level isn't impossibly high
        if (validatedStats.prestigeLevel > currentStats.prestigeLevel + 1) {
          throw new Error('Invalid prestige level change detected');
        }

        // Validate achievements count isn't impossibly high
        const maxPossibleAchievements = 100;
        if (validatedStats.achievementsEarned > maxPossibleAchievements) {
          throw new Error('Invalid achievements count detected');
        }
      }

      // First verify username from users table
      const userDocSnap = await getDoc(doc(db, 'users', userId));
      if (!userDocSnap.exists()) {
        throw new Error('User profile not found');
      }

      const userData = userDocSnap.data();

      // Update leaderboard with verified username
      const leaderboardData = {
        userId: userId,
        username: userData.username,
        ...validatedStats,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'leaderboard', userId), leaderboardData);
      return { data: leaderboardData };
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      throw error;
    }
  },

  async getLeaderboard() {
    try {
      const q = query(
        collection(db, 'leaderboard'),
        orderBy('totalCoins', 'desc'),
        limit(100)
      );

      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map(doc => doc.data());

      return { data: leaderboardData };
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return { data: querySnapshot.docs[0].data() };
      }

      return { data: null };
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'users', userId));
      
      if (docSnap.exists()) {
        return { data: docSnap.data() };
      }

      return { data: null };
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  },

  // Real-time listeners
  onGameProgressUpdate(userId, callback) {
    const docRef = doc(db, 'gameProgress', userId);
    return onSnapshot(docRef, callback);
  },

  onUserUpdate(userId, callback) {
    const docRef = doc(db, 'users', userId);
    return onSnapshot(docRef, callback);
  },

  onLeaderboardUpdate(callback) {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('totalCoins', 'desc'),
      limit(10)
    );
    return onSnapshot(q, callback);
  },

  // Clear user data (for testing/reset)
  async clearUserData(userId) {
    try {
      // Clear all user documents
      await Promise.all([
        deleteDoc(doc(db, 'gameProgress', userId)),
        deleteDoc(doc(db, 'upgrades', userId)),
        deleteDoc(doc(db, 'achievements', userId)),
        deleteDoc(doc(db, 'lifetimeStats', userId)),
        deleteDoc(doc(db, 'leaderboard', userId)),
        deleteDoc(doc(db, 'users', userId))
      ]);

      return { success: true };
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }
};
