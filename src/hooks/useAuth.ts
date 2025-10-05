// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Session, User, AuthError } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email?: string;
  // Add other user properties as needed
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getSession: () => Promise<Session | null>;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Transform Supabase User to our AuthUser type
  const transformUser = (user: User): AuthUser => ({
    id: user.id,
    email: user.email,
    // Add other properties as needed
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          setUser(transformUser(session.user));
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? transformUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Error handler
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AuthError) {
      switch (error.message) {
        case 'Invalid login credentials':
          return 'Invalid email or password';
        case 'Email not confirmed':
          return 'Please verify your email first';
        default:
          return error.message;
      }
    }
    return error instanceof Error ? error.message : 'Unknown error occurred';
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      if (data.user) {
        setUser(transformUser(data.user));
        navigate('/');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      if (data.user) {
        setUser(transformUser(data.user));
        navigate('/');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate('/auth');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getSession = async (): Promise<Session | null> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    logout,
    getSession
  };
};