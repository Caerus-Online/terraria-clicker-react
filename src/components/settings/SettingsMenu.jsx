import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { playerService } from '../../services/playerService';
import { achievements } from '../../data/achievementData';
import { tierUpgradesArray, swordUpgradesArray, summonUpgradesArray } from '../../data/upgradeData';
import { prestigeArtifacts } from '../../data/prestigeArtifacts';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  bgVolume, 
  setBgVolume, 
  effectsVolume, 
  setEffectsVolume,
  onOpenAuth
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) throw error;
      alert('Password reset email sent!');
    } catch (error) {
      alert('Error sending reset email: ' + error.message);
    }
  };

  const handleClearData = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all save data? This cannot be undone!');
    if (!confirmed) return;

    try {
      setLoading(true);

      if (user) {
        // First delete all data
        await Promise.all([
          supabase.from('game_progress').delete().eq('user_id', user.id),
          supabase.from('upgrades').delete().eq('user_id', user.id),
          supabase.from('achievements').delete().eq('user_id', user.id),
          supabase.from('lifetime_stats').delete().eq('user_id', user.id),
          supabase.from('leaderboard').delete().eq('user_id', user.id)
        ]);

        // Then initialize with default values
        await Promise.all([
          // Game progress defaults
          supabase.from('game_progress').insert([{
            user_id: user.id,
            clicks: 0,
            click_value: 1,
            cps: 0,
            prestige_currency: 0,
            prestige_level: 0,
            prestige_requirement: 1000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]),

          // Upgrades defaults with proper structure
          supabase.from('upgrades').insert([{
            user_id: user.id,
            tier_upgrades: tierUpgradesArray.map(upgrade => ({ 
              ...upgrade, 
              level: 0, 
              purchased: false,
              clicksProvided: 0,
              totalClicksProvided: 0
            })),
            sword_upgrades: swordUpgradesArray.map(upgrade => ({ 
              ...upgrade, 
              purchased: false 
            })),
            summon_upgrades: summonUpgradesArray.map(upgrade => ({ 
              ...upgrade, 
              level: 0,
              purchased: false,
              cpsProvided: 0,
              totalCps: 0
            })),
            artifacts: prestigeArtifacts.map(artifact => ({ 
              ...artifact, 
              level: 0 
            })),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]),

          // Achievements with proper structure
          supabase.from('achievements').insert([{
            user_id: user.id,
            achievements: achievements.map(achievement => ({
              ...achievement,
              earned: false,
              progress: 0
            })),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]),

          // Reset lifetime stats
          supabase.from('lifetime_stats').insert([{
            user_id: user.id,
            total_clicks: 0,
            total_coins: 0,
            total_prestiges: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]),

          // Reset leaderboard entry
          supabase.from('leaderboard').insert([{
            user_id: user.id,
            username: user.user_metadata?.username || 'Anonymous',
            total_coins: 0,
            prestige_level: 0,
            achievements_earned: 0,
            updated_at: new Date().toISOString()
          }])
        ]);
      }

      // Clear localStorage
      localStorage.clear();

      // Force a full page reload
      window.location.reload();
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Error clearing data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg p-6 shadow-game max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-game text-xl text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Account Section */}
          {user ? (
            <div className="bg-black bg-opacity-50 rounded-lg p-4">
              <h3 className="font-game text-sm text-white mb-2">Account</h3>
              <div className="space-y-2">
                <p className="text-white text-sm break-all">
                  Email: {user.email}
                </p>
                <p className="text-white text-sm">
                  Username: {user.user_metadata?.username || 'Anonymous'}
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={handleResetPassword}
                    className="flex-1 py-2 px-4 bg-game-highlight hover:bg-opacity-80 text-white rounded-lg font-game text-sm transition-colors"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-game text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black bg-opacity-50 rounded-lg p-4">
              <h3 className="font-game text-sm text-white mb-2">Account</h3>
              <p className="text-white text-sm mb-4">
                Create an account to save your progress and appear on the leaderboard!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full py-2 px-4 bg-game-highlight hover:bg-opacity-80 text-white rounded-lg font-game text-sm transition-colors"
              >
                Login / Register
              </button>
            </div>
          )}

          {/* Volume Controls */}
          <div className="volume-control">
            <h3 className="font-game text-sm text-white mb-2">Background Music</h3>
            <div className="flex items-center space-x-4">
              <span className="material-icons text-white">
                {bgVolume === 0 ? 'volume_off' : 'volume_up'}
              </span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={bgVolume} 
                onChange={(e) => setBgVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-game-accent rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="volume-control">
            <h3 className="font-game text-sm text-white mb-2">Sound Effects</h3>
            <div className="flex items-center space-x-4">
              <span className="material-icons text-white">
                {effectsVolume === 0 ? 'volume_off' : 'music_note'}
              </span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={effectsVolume} 
                onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-game-accent rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Clear Data */}
          <div className="border-t border-game-accent pt-6">
            <button
              onClick={handleClearData}
              disabled={loading}
              className={`
                w-full py-2 px-4 rounded-lg font-game text-sm transition-colors
                ${loading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                }
              `}
            >
              {loading ? 'Clearing...' : 'Clear Save Data'}
            </button>
          </div>

          {/* Save Data Info */}
          {!user && (
            <div className="text-center text-white text-xs mt-4">
              Your progress is currently saved locally.
              <br />
              Create an account to save across devices!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu; 