import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<Error | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsSignedIn(!!session?.user);
      },
    );

    // Check initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setIsSignedIn(!!user);
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
      setSignInError(error as Error);
      return { error: error as Error };
    } finally {
      setIsSigningIn(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    setIsSigningIn(true);
    setSignInError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (signUpError) throw signUpError;

      return { error: null };
    } catch (error) {
      setSignInError(error as Error);
      return { error: error as Error };
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsSignedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    user,
    isSignedIn,
    signIn,
    signUp,
    signOut,
    isSigningIn,
    signInError,
  };
}
