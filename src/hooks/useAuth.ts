"use client";

import { useEffect, useState, useCallback } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { authService } from "@/services/auth.service";

interface UseAuthReturn {
  user: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: unknown }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: unknown }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: unknown }>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await authService.signIn(email, password);
    return { error };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      const { error } = await authService.signUp(email, password, fullName);
      return { error };
    },
    []
  );

  const signOut = useCallback(async () => {
    await authService.signOut();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await authService.signInWithGoogle();
    return { error };
  }, []);

  return { user, loading, signIn, signUp, signOut, signInWithGoogle };
}
