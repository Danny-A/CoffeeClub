'use client';

import { AuthError, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User as GraphQLUser } from '@/lib/graphql/types';
import { createClient } from '@/lib/supabase/client';
import { transformUser } from '@/utils/transformUser';

export function useAuth() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<AuthError | null>(null);
  const [user, setUser] = useState<GraphQLUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        setSession(session);
        setUser(transformUser(session?.user ?? null));
        setIsSignedIn(!!session?.user);
      } else if (event === 'SIGNED_IN') {
        setSession(session);
        setUser(transformUser(session?.user ?? null));
        setIsSignedIn(true);
        // Store any OAuth provider tokens if present
        if (session?.provider_token) {
          localStorage.setItem('oauth_provider_token', session.provider_token);
        }
        if (session?.provider_refresh_token) {
          localStorage.setItem(
            'oauth_provider_refresh_token',
            session.provider_refresh_token
          );
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setIsSignedIn(false);
        // Clean up local storage
        localStorage.removeItem('oauth_provider_token');
        localStorage.removeItem('oauth_provider_refresh_token');
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session);
      } else if (event === 'USER_UPDATED') {
        setUser(transformUser(session?.user ?? null));
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(transformUser(session?.user ?? null));
      setIsSignedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    setIsSigningIn(true);
    setSignInError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      setSignInError(authError);
      return { error: authError };
    } finally {
      setIsSigningIn(false);
    }
  };

  const signUp = async (email: string, password: string, userName: string) => {
    setIsSigningIn(true);
    setSignInError(null);

    try {
      // First check if username is available
      const { data: usernameCheck, error: checkError } = await supabase.rpc(
        'is_username_available',
        { desired_username: userName }
      );

      if (checkError) throw checkError;

      if (!usernameCheck) {
        throw new Error('Username is already taken');
      }

      // If username is available, proceed with signup
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: userName.toLowerCase(), // Store username in lowercase
          },
        },
      });

      if (signUpError) throw signUpError;

      return { error: null };
    } catch (error) {
      const authError = error as AuthError;
      setSignInError(authError);
      return { error: authError };
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    session,
    isSignedIn,
    signIn,
    signUp,
    signOut,
    isSigningIn,
    signInError,
  };
}
