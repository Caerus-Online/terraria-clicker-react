import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { databaseService } from '../services/databaseService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // Get username
        supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.username) {
              setUsername(data.username);
            }
          });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setUsername(null);
        localStorage.clear();
        window.location.reload();
      } 
      else if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        // Get username
        supabase
          .from('users')
          .select('username')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.username) {
              setUsername(data.username);
            }
          });
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      username,
      setUsername 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 