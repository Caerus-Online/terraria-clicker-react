import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext-firebase';
import { databaseService } from '../../services/databaseService-firebase';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setLocalUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { signUp, signIn, signInWithGoogle, signOut, setUsername } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user } = await signIn(email, password);
      
      // Username will be fetched automatically by AuthContext
      console.log('Login successful:', user.uid);
      
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle Firebase auth errors
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Account has been disabled';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Try again later';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, username: createdUsername } = await signUp(email, password, username);
      
      console.log('Signup successful:', user.uid);
      
      setVerificationSent(true);
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle Firebase auth errors
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.message === 'Username is already taken') {
        errorMessage = 'Username is already taken';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      const result = await signInWithGoogle();
      
      console.log('Google sign-in initiated:', result.message);
      
      // For redirect method, the modal will close automatically when user returns
      if (result.success) {
        // Don't close immediately - let redirect happen
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = error.message;
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in was blocked by the browser';
      }
      
      setError(errorMessage);
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
          <h2 className="text-xl text-white font-game mb-4">Account Created!</h2>
          <p className="text-white mb-4">
            Your account has been created successfully. You can now sign in and start playing!
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md"
          >
            Start Playing
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
            {!isLogin && (
              <div className="space-y-1">
                <label className="block text-white font-game text-sm">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-black bg-opacity-50 rounded border border-game-accent text-white focus:border-game-highlight outline-none"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                  title="Username must be 3-20 characters, letters, numbers, and underscores only"
                />
              </div>
            )}
            
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
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-game">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-game transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </button>

            {/* Google Sign-in Button */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2 px-4 bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-game transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Loading...' : 'Continue with Google'}
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
