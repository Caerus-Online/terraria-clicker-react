import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  // Always fetch username when we have a user ID
  useEffect(() => {
    const getUsername = async () => {
      if (!user?.id) {
        setUsername(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching username:', error);
          return;
        }

        if (data?.username) {
          console.log('Setting username for user:', user.id, data.username);
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error in getUsername:', error);
      }
    };

    getUsername();
  }, [user?.id]); // Run whenever user ID changes

  // Handle auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log('Setting user from session:', session.user.id);
        setUser(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Handle realtime updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel(`user_updates_${user.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'users',
          filter: `id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.new?.username) {
            console.log('Realtime username update:', payload.new.username);
            setUsername(payload.new.username);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  const value = {
    user,
    username: username || 'Anonymous',
    setUsername
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 