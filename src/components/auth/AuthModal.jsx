import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { databaseService } from '../../services/databaseService';
import { useAuth } from '../../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setLocalUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { setUsername } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // First sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Immediately fetch and set username
      const { data: userData, error: userError } = await supabase
        .from('leaderboard')
        .select('username')
        .eq('user_id', authData.user.id)
        .single();

      if (userError) {
        console.error('Error fetching username:', userError);
        throw new Error('Failed to fetch username');
      }

      if (userData?.username) {
        setUsername(userData.username);
      }

      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // First check if username is available in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        throw new Error('Username already taken');
      }

      // Create auth user first
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create user record first (source of truth for username)
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          username: username,
          created_at: new Date().toISOString()
        }]);

      if (userError) throw userError;

      // Then create leaderboard entry with same username
      const { error: leaderboardError } = await supabase
        .from('leaderboard')
        .insert([{
          user_id: authData.user.id,
          username: username,
          total_coins: 0,
          prestige_level: 0,
          achievements_earned: 0
        }]);

      if (leaderboardError) throw leaderboardError;

      // Initialize game data
      await databaseService.initializeNewUser(authData.user.id, username);

      setVerificationSent(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (verificationSent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4 p-6">
          <h2 className="text-xl text-white font-game mb-4">Verify Your Email</h2>
          <p className="text-white mb-4">
            Please check your email ({email}) for a verification link.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4">
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <h2 className="font-game text-xl text-white">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="p-4">
          <p className="text-white text-sm mb-4">
            {isLogin ? 'Sign in to save your progress' : 'Create an account to save progress and join the leaderboard'}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-white font-game text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white font-game text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="block text-white font-game text-sm">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm font-game">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md"
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md mt-4"
              >
                {isLogin ? 'Need an account?' : 'Already have an account?'}
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md"
          >
            Continue Without Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 