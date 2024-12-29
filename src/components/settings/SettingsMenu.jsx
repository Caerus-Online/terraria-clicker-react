import React, { useState } from 'react';
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
  onOpenAuth 
}) => {
  const { user, username } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out');
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!user?.email) {
        alert('No email found for user');
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) throw error;
      alert('Password reset email sent!');
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert(error.message);
    }
  };

  const handleClearData = async () => {
    try {
      if (user) {
        await databaseService.clearUserData(user.id);
      }
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('Failed to clear data');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Settings Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-game text-white">Settings</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-game-highlight transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Account Section */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-4">
            <h3 className="font-game text-game-highlight mb-4">Account</h3>
            <div className="space-y-2">
              {user ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Email:</span>
                    <span className="text-game-highlight break-all text-right max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Username:</span>
                    <span className="text-game-highlight">
                      {username || 'Anonymous'}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleResetPassword}
                      className="flex-1 px-4 py-2 bg-game-highlight text-white rounded hover:bg-opacity-80 transition-colors font-game"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-game"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="w-full px-4 py-2 bg-game-highlight text-white rounded hover:bg-opacity-80 transition-colors font-game"
                >
                  Login / Create Account
                </button>
              )}
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-4">
            <h3 className="font-game text-game-highlight mb-4">Audio</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white mb-2 block">Background Music</label>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">
                    {bgVolume === 0 ? 'volume_off' : 'volume_up'}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={bgVolume}
                    onChange={(e) => setBgVolume(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-white mb-2 block">Sound Effects</label>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">
                    {effectsVolume === 0 ? 'volume_off' : 'music_note'}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={effectsVolume}
                    onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <h3 className="font-game text-game-highlight mb-4">Data Management</h3>
            <button
              onClick={() => setShowConfirmation(true)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-game"
            >
              Clear All Data
            </button>
            <p className="text-red-400 text-sm mt-2">
              Warning: This will reset all progress and cannot be undone!
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-game-accent">
            <div className="text-sm text-white">
              A project by{' '}
              <a 
                href="https://caerus-online.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-game-highlight hover:text-game-highlight/80"
              >
                Caerus Online
              </a>
            </div>
            <div className="text-xs text-white mt-1">
              Terraria made by Re-Logic
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowConfirmation(false)} />
          <div className="relative bg-game-secondary rounded-lg p-6 max-w-sm w-full m-4">
            <h3 className="text-xl font-game text-white mb-4">Are you sure?</h3>
            <p className="text-game-text mb-6">
              This will permanently delete all your progress. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-opacity-80 transition-colors font-game"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleClearData();
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-game"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu; 