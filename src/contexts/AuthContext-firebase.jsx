import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  linkWithRedirect
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);

  // Always fetch username when we have a user ID
  useEffect(() => {
    const getUsername = async () => {
      if (!user?.uid) {
        setUsername(null);
        setNeedsUsername(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData?.username) {
            console.log('Setting username for user:', user.uid, userData.username);
            setUsername(userData.username);
            setNeedsUsername(false);
          } else {
            // User exists but has no username (Google user case)
            setNeedsUsername(true);
          }
        } else {
          // User profile doesn't exist at all
          setNeedsUsername(true);
        }
      } catch (error) {
        console.error('Error in getUsername:', error);
      }
    };

    getUsername();
  }, [user?.uid]);

  // Handle auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state change:', firebaseUser?.uid || 'null');
      console.log('Auth user email:', firebaseUser?.email || 'null');
      console.log('Auth user displayName:', firebaseUser?.displayName || 'null');
      console.log('Auth user object:', firebaseUser);
      
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle realtime updates for username
  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        if (userData?.username && userData.username !== username) {
          console.log('Realtime username update:', userData.username);
          setUsername(userData.username);
        }
      }
    }, (error) => {
      console.error('Realtime username update error:', error);
    });

    return unsubscribe;
  }, [user?.uid, username]);

  // Helper function to create user profile
  const createUserProfile = async (firebaseUser, username) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userData = {
        id: firebaseUser.uid,
        username: username,
        email: firebaseUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(userDocRef, userData);
      console.log('User profile created:', username);
      return userData;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Helper function to check username availability
  const checkUsernameAvailability = async (username) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username availability:', error);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email, password, username) => {
    try {
      // Check username availability first
      const isUsernameAvailable = await checkUsernameAvailability(username);
      if (!isUsernameAvailable) {
        throw new Error('Username is already taken');
      }

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile
      await createUserProfile(firebaseUser, username);

      // Initialize all game data collections
      await databaseService.initializeNewUser(firebaseUser.uid, username);

      // Update display name (optional)
      await updateProfile(firebaseUser, { displayName: username });

      return { user: firebaseUser, username };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Google sign-in function
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Use redirect instead of popup to avoid Cross-Origin-Opener-Policy issues
      await signInWithRedirect(auth, provider);
      
      // The result will be handled by the redirect result check below
      return { success: true, message: 'Redirecting to Google sign-in...' };
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  // Check for redirect result on component mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        console.log('Checking for redirect result...');
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          console.log('Google redirect sign-in successful:', user.uid);
          console.log('Google user email:', user.email);
          console.log('Google user displayName:', user.displayName);

          // Check if user profile exists, create if not
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            console.log('Creating user profile for Google user...');
            // Create user profile for Google user
            const userData = {
              id: user.uid,
              username: user.displayName || `GoogleUser${user.uid.slice(-6)}`,
              email: user.email,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            await setDoc(userDocRef, userData);

            // Create leaderboard entry
            const leaderboardData = {
              userId: user.uid,
              username: userData.username,
              totalCoins: 0,
              prestigeLevel: 0,
              achievementsEarned: 0,
              updatedAt: new Date().toISOString()
            };

            await setDoc(doc(db, 'leaderboard', user.uid), leaderboardData);

            // Initialize game data
            await databaseService.initializeNewUser(user.uid, userData.username);
          } else {
            console.log('Google user profile already exists');
          }
        } else {
          console.log('No redirect result found');
        }
      } catch (error) {
        // No redirect result, which is normal
        console.log('No redirect result or redirect error:', error.message);
      }
    };

    checkRedirectResult();
  }, []);

  // Helper function to set username for Google users
  const setGoogleUsername = async (newUsername) => {
    try {
      if (!user?.uid || !newUsername.trim()) {
        throw new Error('Invalid user or username');
      }

      // Check if username is available
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', newUsername.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error('Username is already taken');
      }

      // Create/update user profile
      const userData = {
        id: user.uid,
        username: newUsername.trim(),
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Create leaderboard entry
      const leaderboardData = {
        userId: user.uid,
        username: newUsername.trim(),
        totalCoins: 0,
        prestigeLevel: 0,
        achievementsEarned: 0,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'leaderboard', user.uid), leaderboardData);

      // Initialize game data
      await databaseService.initializeNewUser(user.uid, newUsername.trim());

      // Update local state
      setUsername(newUsername.trim());
      setNeedsUsername(false);

      return { success: true };
    } catch (error) {
      console.error('Error setting Google username:', error);
      throw error;
    }
  };

  // Sign out function
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUsername(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    username: username || 'Anonymous',
    setUsername,
    loading,
    needsUsername,
    signUp,
    signIn,
    signInWithGoogle,
    signOut: signOutUser,
    createUserProfile,
    checkUsernameAvailability,
    setGoogleUsername
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
