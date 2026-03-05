import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext-firebase';
import { databaseService } from '../../services/databaseService-firebase';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import ErrorModal from '../ui/ErrorModal';
import SuccessModal from '../ui/SuccessModal';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  bgVolume,
  setBgVolume,
  effectsVolume,
  setEffectsVolume,
  onOpenAuth 
}) => {
  const { user, username, setUsername } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [showUsernameUpdate, setShowUsernameUpdate] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, title: '', message: '' });
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
      setErrorModal({ isOpen: true, title: 'Sign Out Error', message: 'Failed to sign out' });
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!user?.email) {
        setErrorModal({ isOpen: true, title: 'Email Error', message: 'No email found for user' });
        return;
      }
      // Note: Firebase password reset requires additional setup in Firebase Console
      setErrorModal({ isOpen: true, title: 'Password Reset', message: 'Password reset feature requires Firebase Console setup. Please contact support.' });
    } catch (error) {
      console.error('Error sending reset email:', error);
      setErrorModal({ isOpen: true, title: 'Reset Error', message: error.message });
    }
  };

  const handleUpdateUsername = async () => {
    if (isUpdatingUsername) {
      console.log('Update already in progress, ignoring click');
      return;
    }

    try {
      setIsUpdatingUsername(true);
      console.log('Updating username for user:', user);
      console.log('New username:', newUsername);
      
      if (!user || !newUsername.trim()) {
        setErrorModal({ isOpen: true, title: 'Invalid Username', message: 'Please enter a valid username' });
        return;
      }

      if (newUsername.length < 3 || newUsername.length > 20) {
        setErrorModal({ isOpen: true, title: 'Invalid Username', message: 'Username must be between 3 and 20 characters' });
        return;
      }

      // Check if username is available
      console.log('Checking username availability...');
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', newUsername.trim()));
      
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Query timeout')), 5000)
        );
        
        const queryPromise = getDocs(q);
        const querySnapshot = await Promise.race([queryPromise, timeoutPromise]);
        
        console.log('Username check result:', querySnapshot.empty);
        console.log('Query snapshot size:', querySnapshot.size);

        if (!querySnapshot.empty) {
          console.log('Username already taken by:', querySnapshot.docs[0].data());
          setErrorModal({ isOpen: true, title: 'Username Taken', message: 'Username is already taken' });
          return;
        }
      } catch (queryError) {
        console.error('Error checking username availability:', queryError);
        if (queryError.message === 'Query timeout') {
          // Skip username check on timeout and proceed
          console.log('Username check timed out, proceeding with update...');
        } else {
          setErrorModal({ isOpen: true, title: 'Query Error', message: `Failed to check username: ${queryError.message}` });
          return;
        }
      }

      console.log('Updating user document...');
      // Update username in users collection
      const userDocRef = doc(db, 'users', user.uid);
      
      try {
        // Check if user document exists first
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          console.log('User document does not exist, creating it...');
          await setDoc(userDocRef, {
            id: user.uid,
            username: newUsername.trim(),
            email: user.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else {
          await updateDoc(userDocRef, {
            username: newUsername.trim(),
            updatedAt: new Date().toISOString()
          });
        }
        console.log('User document updated successfully');
      } catch (userDocError) {
        console.error('Error updating user document:', userDocError);
        setErrorModal({ isOpen: true, title: 'User Document Error', message: `Failed to update user profile: ${userDocError.message}` });
        return;
      }

      console.log('Updating leaderboard document...');
      // Update username in leaderboard
      const leaderboardRef = doc(db, 'leaderboard', user.uid);
      
      try {
        // Check if leaderboard document exists first
        const leaderboardDocSnap = await getDoc(leaderboardRef);
        if (!leaderboardDocSnap.exists()) {
          console.log('Leaderboard document does not exist, creating it...');
          await setDoc(leaderboardRef, {
            userId: user.uid,
            username: newUsername.trim(),
            totalCoins: 0,
            prestigeLevel: 0,
            achievementsEarned: 0,
            updatedAt: new Date().toISOString()
          });
        } else {
          await updateDoc(leaderboardRef, {
            username: newUsername.trim(),
            updatedAt: new Date().toISOString()
          });
        }
        console.log('Leaderboard document updated successfully');
      } catch (leaderboardError) {
        console.error('Error updating leaderboard document:', leaderboardError);
        setErrorModal({ isOpen: true, title: 'Leaderboard Error', message: `Failed to update leaderboard: ${leaderboardError.message}` });
        return;
      }

      console.log('Updating local state...');
      // Update local state
      setUsername(newUsername.trim());
      setShowUsernameUpdate(false);
      setNewUsername('');
      
      setSuccessModal({ isOpen: true, title: 'Success', message: 'Username updated successfully!' });
    } catch (error) {
      console.error('Error updating username:', error);
      setErrorModal({ isOpen: true, title: 'Update Error', message: `Failed to update username: ${error.message}` });
    } finally {
      setIsUpdatingUsername(false);
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
                    <div className="flex items-center space-x-2">
                      <span className="text-game-highlight">
                        {username || 'Anonymous'}
                      </span>
                      <button
                        onClick={() => setShowUsernameUpdate(true)}
                        className="text-xs px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
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

      {/* Username Update Modal */}
      {showUsernameUpdate && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-64 w-auto m-4 p-4">
            <h3 className="text-base font-game text-white mb-3">Update Username</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-white text-sm mb-2">New Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                />
                <p className="text-xs text-gray-400 mt-1">3-20 characters, letters, numbers, and underscores only</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    console.log('Update button clicked');
                    console.log('Current username:', newUsername);
                    console.log('Button disabled:', !newUsername.trim() || newUsername.length < 3 || isUpdatingUsername);
                    handleUpdateUsername();
                  }}
                  disabled={!newUsername.trim() || newUsername.length < 3 || isUpdatingUsername}
                  className="flex-1 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors font-game disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isUpdatingUsername ? 'Updating...' : 'Update'}
                </button>
                <button
                  onClick={() => {
                    setShowUsernameUpdate(false);
                    setNewUsername('');
                  }}
                  className="flex-1 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-game text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, title: '', message: '' })}
        title={errorModal.title}
        message={errorModal.message}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, title: '', message: '' })}
        title={successModal.title}
        message={successModal.message}
      />
    </div>
  );
};

export default SettingsMenu; 