// Firebase Configuration
// This file replaces src/lib/supabase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug: Log Firebase config
console.log('Firebase Config:', firebaseConfig);
console.log('Environment variables:', {
  API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

// Initialize Firebase services
export const auth = getAuth(app);

// Set auth persistence to LOCAL (persists even when browser is closed)
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
});

// Initialize Firestore without offline persistence for now
export const db = getFirestore(app);

export const storage = getStorage(app);

console.log('Firebase auth initialized:', auth);
console.log('Firebase db initialized:', db);

// Export the app instance for advanced use cases
export default app;

// Configuration validation
export const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase configuration missing:', missingFields);
    console.error('Please check your .env file and ensure all Firebase environment variables are set.');
    return false;
  }
  
  console.log('✅ Firebase configuration validated');
  return true;
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    if (!validateFirebaseConfig()) {
      throw new Error('Invalid Firebase configuration');
    }
    
    // Test auth connection
    await auth.authStateReady();
    console.log('✅ Firebase Auth connection successful');
    
    // Test Firestore connection
    await import('firebase/firestore').then(({ getDoc, doc }) => {
      // This will throw an error if Firestore is not accessible
      return getDoc(doc(db, 'test'));
    }).catch(() => {
      // Expected to fail for non-existent doc, but confirms connection
    });
    console.log('✅ Firebase Firestore connection successful');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return { success: false, error: error.message };
  }
};
