import { supabase } from '../lib/supabase';
import { tierUpgradesArray, swordUpgradesArray, summonUpgradesArray } from '../data/upgradeData';
import { prestigeArtifacts } from '../data/prestigeArtifacts';
import { achievements } from '../data/achievementData';

export const databaseService = {
  // Initialize all user data
  async initializeNewUser(userId, username) {
    try {
      console.log('Initializing new user:', userId, username);
      
      // Create user profile first
      const { error: userError } = await supabase
        .from('users')
        .upsert([{
          id: userId,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (userError) throw userError;

      // Initialize game data
      const { error: progressError } = await supabase
        .from('game_progress')
        .upsert([{
          user_id: userId,
          clicks: 0,
          click_value: 1,
          cps: 0,
          prestige_currency: 0,
          prestige_level: 0,
          prestige_requirement: 1000
        }]);

      if (progressError) throw progressError;

      // Initialize upgrades
      const { error: upgradesError } = await supabase
        .from('upgrades')
        .upsert([{
          user_id: userId,
          tier_upgrades: tierUpgradesArray,
          sword_upgrades: swordUpgradesArray,
          summon_upgrades: summonUpgradesArray,
          artifacts: prestigeArtifacts
        }]);

      if (upgradesError) throw upgradesError;

      // Initialize achievements
      const { error: achievementsError } = await supabase
        .from('achievements')
        .upsert([{
          user_id: userId,
          achievements: achievements.map(a => ({ ...a, earned: false }))
        }]);

      if (achievementsError) throw achievementsError;

      // Initialize lifetime stats
      const { error: statsError } = await supabase
        .from('lifetime_stats')
        .upsert([{
          user_id: userId,
          total_clicks: 0,
          total_coins: 0,
          total_prestiges: 0
        }]);

      if (statsError) throw statsError;

      // Initialize leaderboard entry
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .upsert([{
          user_id: userId,
          username,
          total_coins: 0,
          prestige_level: 0,
          achievements_earned: 0
        }]);

      if (leaderboardError) throw leaderboardError;

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
        userProfile,
        gameProgress,
        upgrades,
        achievements,
        lifetimeStats,
        leaderboard
      ] = await Promise.all([
        supabase.from('users').select('*').eq('id', userId).single(),
        supabase.from('game_progress').select('*').eq('user_id', userId).single(),
        supabase.from('upgrades').select('*').eq('user_id', userId).single(),
        supabase.from('achievements').select('*').eq('user_id', userId).single(),
        supabase.from('lifetime_stats').select('*').eq('user_id', userId).single(),
        supabase.from('leaderboard').select('*').eq('user_id', userId).single()
      ]);

      // If any required data is missing, initialize it
      if (!gameProgress.data) {
        await this.saveGameProgress(userId, {
          clicks: 0,
          clickValue: 1,
          cps: 0,
          prestigeCurrency: 0,
          prestigeLevel: 0,
          prestigeRequirement: 1000
        });
      }

      if (!upgrades.data) {
        await this.saveUpgrades(userId, {
          tierUpgrades: [],
          swordUpgrades: [],
          summonUpgrades: [],
          artifacts: []
        });
      }

      if (!achievements.data) {
        await this.saveAchievements(userId, []);
      }

      if (!lifetimeStats.data) {
        await this.saveLifetimeStats(userId, {
          clicks: 0,
          coins: 0,
          prestigeCount: 0
        });
      }

      if (!leaderboard.data) {
        await this.updateLeaderboard(userId, userProfile.data.username, {
          totalCoins: 0,
          prestigeLevel: 0,
          achievementsEarned: 0
        });
      }

      // Return combined data
      return {
        data: {
          profile: userProfile.data,
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
    return await supabase
      .from('users')
      .upsert([{ 
        id: userId, 
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select('*')
      .single();
  },

  // Game Progress
  async saveGameProgress(userId, gameState) {
    const { clicks, clickValue, cps, prestigeCurrency, prestigeLevel, prestigeRequirement } = gameState;
    
    return await supabase
      .from('game_progress')
      .upsert([{
        user_id: userId,
        clicks: parseInt(clicks) || 0,
        click_value: parseInt(clickValue) || 1,
        cps: parseInt(cps) || 0,
        prestige_currency: parseInt(prestigeCurrency) || 0,
        prestige_level: parseInt(prestigeLevel) || 0,
        prestige_requirement: parseInt(prestigeRequirement) || 1000,
        updated_at: new Date().toISOString()
      }], {
        onConflict: 'user_id'
      })
      .select()
      .single();
  },

  async loadGameProgress(userId) {
    const { data, error } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (!data) {
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

    return { data };
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
          total_clicks: parseInt(stats.clicks) || 0,
          total_coins: parseInt(stats.coins) || 0,
          total_prestiges: parseInt(stats.prestigeCount) || 0,
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'user_id',
          returning: 'minimal'
        });

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error saving lifetime stats:', error);
      // Try update if insert failed
      try {
        const { data, error: updateError } = await supabase
          .from('lifetime_stats')
          .update({
            total_clicks: parseInt(stats.clicks) || 0,
            total_coins: parseInt(stats.coins) || 0,
            total_prestiges: parseInt(stats.prestigeCount) || 0,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        if (updateError) throw updateError;
        return { data };
      } catch (updateError) {
        console.error('Error updating lifetime stats:', updateError);
        throw updateError;
      }
    }
  },

  async loadLifetimeStats(userId) {
    try {
      const { data, error } = await supabase
        .from('lifetime_stats')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Create initial stats
        const { data: newData, error: insertError } = await supabase
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

        if (insertError) throw insertError;
        return { data: newData };
      }

      return { data };
    } catch (error) {
      console.error('Error loading lifetime stats:', error);
      throw error;
    }
  },

  // Leaderboard
  async updateLeaderboard(userId, username, stats) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .upsert([{
          user_id: userId,
          username,
          total_coins: stats.totalCoins || 0,
          prestige_level: stats.prestigeLevel || 0,
          achievements_earned: stats.achievementsEarned || 0,
          updated_at: new Date().toISOString()
        }], {
          onConflict: 'user_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

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
    return await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();
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
  }
}; 