import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { databaseService } from '../../services/databaseService';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      } else {
        // Create auth user first without username
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });

        if (signUpError) throw signUpError;

        if (authData?.user) {
          // Store username for later
          localStorage.setItem('pendingUsername', username);
          localStorage.setItem('pendingUserId', authData.user.id);
          setVerificationSent(true);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Show verification message
  if (verificationSent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4">
          <div className="flex justify-between items-center p-4 border-b border-game-accent">
            <h2 className="font-game text-xl text-white">Verify Your Email</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-game-highlight transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="p-6">
            <div className="text-center space-y-4">
              <span className="material-icons text-4xl text-game-highlight">mail</span>
              <p className="text-white">
                We've sent a verification email to:
              </p>
              <p className="text-game-highlight break-all font-medium">
                {email}
              </p>
              <p className="text-white text-sm">
                Please check your email and click the verification link to complete your registration.
                After verifying, you can log in with your credentials.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-game-highlight hover:bg-opacity-80 text-white rounded font-game transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular auth form
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

          <form onSubmit={handleSubmit} className="space-y-3">
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
                  onChange={(e) => setUsername(e.target.value)}
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