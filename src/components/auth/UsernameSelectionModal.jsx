import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext-firebase';

const UsernameSelectionModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setGoogleUsername, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!username.trim()) {
        throw new Error('Please enter a username');
      }

      if (username.length < 3 || username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters');
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error('Username can only contain letters, numbers, and underscores');
      }

      await setGoogleUsername(username.trim());
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-game">Choose Your Username</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-white text-sm mb-2">
            Welcome! You've signed in with Google. Please choose a username to continue:
          </p>
          <div className="bg-black bg-opacity-50 rounded p-2 mb-4">
            <p className="text-xs text-gray-400">
              Email: {user?.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white font-game text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
              required
              minLength={3}
              maxLength={20}
              pattern="[a-zA-Z0-9_]+"
              disabled={loading}
            />
            <p className="text-xs text-gray-400">
              3-20 characters, letters, numbers, and underscores only
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-game">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim() || username.length < 3}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Profile...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameSelectionModal;
