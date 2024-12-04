import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { databaseService } from '../../services/databaseService';
import { supabase } from '../../lib/supabase';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  bgVolume,
  setBgVolume,
  effectsVolume,
  setEffectsVolume,
  onOpenAuth,
  setCurrentCoins,
  setClickValue,
  setCps,
  setPrestigeCurrency,
  setPrestigeLevel,
  setPrestigeRequirement,
  setTierUpgrades,
  setSwordUpgrades,
  setSummonUpgrades,
  setArtifacts,
  setUserAchievements,
  setLifetimeStats,
  tierUpgradesArray,
  swordUpgradesArray,
  summonUpgradesArray,
  prestigeArtifacts,
  achievements
}) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      const authKeys = ['supabase.auth.token'];
      authKeys.forEach(key => localStorage.removeItem(key));
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
      if (user) {
        await databaseService.clearUserData(user.id);
      }

      // Reset all game state
      setCurrentCoins(0);
      setClickValue(1);
      setCps(0);
      setPrestigeCurrency(0);
      setPrestigeLevel(0);
      setPrestigeRequirement(1000);
      
      // Reset upgrades
      setTierUpgrades(tierUpgradesArray);
      setSwordUpgrades(swordUpgradesArray);
      setSummonUpgrades(summonUpgradesArray);
      setArtifacts(prestigeArtifacts);
      
      // Reset achievements
      setUserAchievements(achievements.map(a => ({ ...a, earned: false })));
      
      // Reset lifetime stats
      setLifetimeStats({
        clicks: 0,
        coins: 0,
        prestigeCount: 0
      });

      // Reload the page to ensure all state is fresh
      window.location.reload();
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Error clearing data. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Settings Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <h2 className="font-game text-xl text-game-text">Settings</h2>
          <button 
            onClick={onClose}
            className="text-game-text hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
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
          <div className="bg-black bg-opacity-50 rounded-lg p-4 space-y-4">
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
          </div>

          {/* Clear Data */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <h3 className="font-game text-sm text-white mb-2">Clear Data</h3>
            <button
              onClick={handleClearData}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-game py-2 px-4 rounded transition-colors"
            >
              Clear All Data
            </button>
            <p className="text-red-400 text-sm mt-2">
              Warning: This will reset all progress and cannot be undone!
            </p>
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