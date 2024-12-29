import { supabase } from '../lib/supabase';
import { tierUpgradesArray, swordUpgradesArray, summonUpgradesArray } from '../data/upgradeData';
import { prestigeArtifacts } from '../data/prestigeArtifacts';
import { achievements } from '../data/achievementData';

export const databaseService = {
  // Initialize all user data
  async initializeNewUser(userId, username) {
    try {
      console.log('Initializing new user:', userId, username);
      
      // Create user record first (source of truth for username)
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: userId,
          username: username,
          created_at: new Date().toISOString()
        });

      if (userError) throw userError;

      // Then create leaderboard entry with same username
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .insert({
          user_id: userId,
          username: username,
          total_coins: 0,
          prestige_level: 0,
          achievements_earned: 0,
          updated_at: new Date().toISOString()
        });

      if (leaderboardError) throw leaderboardError;

      // Initialize game data
      const { error: progressError } = await supabase
        .from('game_progress')
        .insert({
          user_id: userId,
          clicks: 0,
          click_value: 1,
          cps: 0,
          prestige_currency: 0,
          prestige_level: 0,
          prestige_requirement: 1000
        });

      if (progressError) throw progressError;

      // Initialize upgrades
      const { error: upgradesError } = await supabase
        .from('upgrades')
        .insert([{
          user_id: userId,
          tier_upgrades: [],
          sword_upgrades: [],
          summon_upgrades: [],
          artifacts: []
        }]);

      if (upgradesError) throw upgradesError;

      // Initialize achievements
      const { error: achievementsError } = await supabase
        .from('achievements')
        .insert([{
          user_id: userId,
          achievements: []
        }]);

      if (achievementsError) throw achievementsError;

      // Initialize lifetime stats
      const { error: statsError } = await supabase
        .from('lifetime_stats')
        .insert([{
          user_id: userId,
          total_clicks: 0,
          total_coins: 0,
          total_prestiges: 0
        }]);

      if (statsError) throw statsError;

      return { success: true };
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    }
  },

  // Load user data
  async loadUserData(userId) {
    try {
      // Load each type of data separately to avoid relationship issues
      const [
        gameProgress,
        upgrades,
        achievements,
        lifetimeStats,
        leaderboard
      ] = await Promise.all([
        supabase.from('game_progress').select('*').eq('user_id', userId).single(),
        supabase.from('upgrades').select('*').eq('user_id', userId).single(),
        supabase.from('achievements').select('*').eq('user_id', userId).single(),
        supabase.from('lifetime_stats').select('*').eq('user_id', userId).single(),
        supabase.from('leaderboard').select('*').eq('user_id', userId).single()
      ]);

      // Initialize missing data with defaults
      if (!gameProgress.data) {
        const { data } = await this.saveGameProgress(userId, {
          clicks: 0,
          clickValue: 1,
          cps: 0,
          prestigeCurrency: 0,
          prestigeLevel: 0,
          prestigeRequirement: 1000
        });
        gameProgress.data = data;
      }

      if (!upgrades.data) {
        const { data } = await this.saveUpgrades(userId, {
          tierUpgrades: tierUpgradesArray,
          swordUpgrades: swordUpgradesArray,
          summonUpgrades: summonUpgradesArray,
          artifacts: prestigeArtifacts
        });
        upgrades.data = data;
      }

      if (!achievements.data) {
        const { data } = await this.saveAchievements(userId, achievements);
        achievements.data = data;
      }

      if (!lifetimeStats.data) {
        const { data } = await this.saveLifetimeStats(userId, {
          clicks: 0,
          coins: 0,
          prestigeCount: 0
        });
        lifetimeStats.data = data;
      }

      // If no leaderboard entry, try to get username from users table
      if (!leaderboard.data) {
        const { data: userData } = await supabase
          .from('users')
          .select('username')
          .eq('id', userId)
          .single();

        if (userData?.username) {
          const { data } = await this.updateLeaderboard(userId, userData.username, {
            totalCoins: 0,
            prestigeLevel: 0,
            achievementsEarned: 0
          });
          leaderboard.data = data;
        }
      }

      // Return combined data
      return {
        data: {
          progress: gameProgress.data,
          upgrades: upgrades.data,
          achievements: achievements.data,
          stats: lifetimeStats.data,
          leaderboard: leaderboard.data
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
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;
      if (existingUser) throw new Error('Username already taken');

      // Create user record
      const { data, error } = await supabase
        .from('users')
        .upsert([{ 
          id: userId,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Also update leaderboard
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .upsert([{
          user_id: userId,
          username,
          total_coins: 0,
          prestige_level: 0,
          achievements_earned: 0,
          updated_at: new Date().toISOString()
        }]);

      if (leaderboardError) throw leaderboardError;

      return { data };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Game Progress
  async saveGameProgress(userId, progress) {
    try {
      const { data, error } = await supabase
        .from('game_progress')
        .upsert([{
          user_id: userId,
          clicks: Math.floor(Number(progress.clicks) || 0),
          click_value: Math.floor(Number(progress.click_value) || 1),
          cps: Math.floor(Number(progress.cps) || 0),
          prestige_currency: Math.floor(Number(progress.prestige_currency) || 0),
          prestige_level: Math.floor(Number(progress.prestige_level) || 0),
          prestige_requirement: Math.floor(Number(progress.prestige_requirement) || 1000),
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error saving game progress:', error);
      throw error;
    }
  },

  async loadGameProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        // Create initial progress with proper number conversion
        return this.saveGameProgress(userId, {
          clicks: 0,
          click_value: 1,
          cps: 0,
          prestige_currency: 0,
          prestige_level: 0,
          prestige_requirement: 1000
        });
      }

      // Ensure all values are proper integers
      return {
        data: {
          ...data,
          clicks: Math.floor(Number(data.clicks) || 0),
          click_value: Math.floor(Number(data.click_value) || 1),
          cps: Math.floor(Number(data.cps) || 0),
          prestige_currency: Math.floor(Number(data.prestige_currency) || 0),
          prestige_level: Math.floor(Number(data.prestige_level) || 0),
          prestige_requirement: Math.floor(Number(data.prestige_requirement) || 1000)
        }
      };
    } catch (error) {
      console.error('Error loading game progress:', error);
      throw error;
    }
  },

  // Upgrades
  async saveUpgrades(userId, upgrades) {
    const defaultUpgrades = {
      tier_upgrades: tierUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
      sword_upgrades: swordUpgradesArray.map(upgrade => ({ ...upgrade, purchased: false })),
      summon_upgrades: summonUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
      artifacts: prestigeArtifacts.map(artifact => ({ ...artifact, level: 0 }))
    };

    const upgradeData = {
      user_id: userId,
      tier_upgrades: upgrades.tierUpgrades || defaultUpgrades.tier_upgrades,
      sword_upgrades: upgrades.swordUpgrades || defaultUpgrades.sword_upgrades,
      summon_upgrades: upgrades.summonUpgrades || defaultUpgrades.summon_upgrades,
      artifacts: upgrades.artifacts || defaultUpgrades.artifacts,
      updated_at: new Date().toISOString()
    };

    return await supabase
      .from('upgrades')
      .upsert([upgradeData], {
        onConflict: 'user_id'
      })
      .select()
      .single();
  },

  async loadUpgrades(userId) {
    const { data, error } = await supabase
      .from('upgrades')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    const defaultUpgrades = {
      tier_upgrades: tierUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
      sword_upgrades: swordUpgradesArray.map(upgrade => ({ ...upgrade, purchased: false })),
      summon_upgrades: summonUpgradesArray.map(upgrade => ({ ...upgrade, level: 0, purchased: false })),
      artifacts: prestigeArtifacts.map(artifact => ({ ...artifact, level: 0 }))
    };

    if (!data) {
      return this.saveUpgrades(userId, defaultUpgrades);
    }

    // Ensure all upgrades exist with proper structure
    return {
      data: {
        ...data,
        tier_upgrades: data.tier_upgrades || defaultUpgrades.tier_upgrades,
        sword_upgrades: data.sword_upgrades || defaultUpgrades.sword_upgrades,
        summon_upgrades: data.summon_upgrades || defaultUpgrades.summon_upgrades,
        artifacts: data.artifacts || defaultUpgrades.artifacts
      }
    };
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

      const { data, error } = await supabase
        .from('achievements')
        .upsert([{
          user_id: userId,
          achievements: mergedAchievements,
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error saving achievements:', error);
      throw error;
    }
  },

  async loadAchievements(userId) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Initialize with default achievements if no data exists
      if (!data || error) {
        const defaultAchievements = achievements.map(achievement => ({
          ...achievement,
          earned: false,
          progress: 0
        }));

        const { data: newData, error: insertError } = await supabase
          .from('achievements')
          .insert([{
            user_id: userId,
            achievements: defaultAchievements,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        return { data: newData };
      }

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
        await supabase
          .from('achievements')
          .update({ 
            achievements: updatedAchievements,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
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
      const { data, error } = await supabase
        .from('lifetime_stats')
        .upsert([{
          user_id: userId,
          total_clicks: Math.floor(Number(stats.clicks) || 0),
          total_coins: Math.floor(Number(stats.coins) || 0),
          total_prestiges: Math.floor(Number(stats.prestigeCount) || 0),
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error saving lifetime stats:', error);
      throw error;
    }
  },

  async loadLifetimeStats(userId) {
    try {
      const { data, error } = await supabase
        .from('lifetime_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        // Create initial stats with proper number conversion
        return this.saveLifetimeStats(userId, {
          clicks: 0,
          coins: 0,
          prestigeCount: 0
        });
      }

      // Ensure all values are proper integers
      return {
        data: {
          ...data,
          total_clicks: Math.floor(Number(data.total_clicks) || 0),
          total_coins: Math.floor(Number(data.total_coins) || 0),
          total_prestiges: Math.floor(Number(data.total_prestiges) || 0)
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
      // First verify username from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error verifying username:', userError);
        throw userError;
      }

      // Use verified username from users table
      const { data, error } = await supabase
        .from('leaderboard')
        .upsert({
          user_id: userId,
          username: userData.username, // Always use username from users table
          total_coins: Math.floor(Number(stats.totalCoins) || 0),
          prestige_level: Math.floor(Number(stats.prestigeLevel) || 0),
          achievements_earned: Math.floor(Number(stats.achievementsEarned) || 0),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      throw error;
    }
  },

  async getLeaderboard() {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('total_coins', { ascending: false })
        .limit(100);

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return { data };
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return { data };
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  },

  async createUserProfile(userData) {
    return await supabase
      .from('users')
      .insert([userData]);
  },

  async initializeGameProgress(userId) {
    return this.loadGameProgress(userId); // This will create if doesn't exist
  },

  async initializeLifetimeStats(userId) {
    const { data, error } = await supabase
      .from('lifetime_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return await supabase
        .from('lifetime_stats')
        .insert([{
          user_id: userId,
          total_clicks: 0,
          total_coins: 0,
          total_prestiges: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
    }

    return { data };
  },

  // Add this method to databaseService
  async clearUserData(userId) {
    try {
      // Clear game progress
      await supabase
        .from('game_progress')
        .delete()
        .eq('user_id', userId);

      // Clear upgrades
      await supabase
        .from('upgrades')
        .delete()
        .eq('user_id', userId);

      // Clear achievements
      await supabase
        .from('achievements')
        .delete()
        .eq('user_id', userId);

      // Clear lifetime stats
      await supabase
        .from('lifetime_stats')
        .delete()
        .eq('user_id', userId);

      // Clear leaderboard entry
      await supabase
        .from('leaderboard')
        .delete()
        .eq('user_id', userId);

      return { success: true };
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  }
}; 