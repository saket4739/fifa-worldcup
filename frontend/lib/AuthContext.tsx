"use client";

import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase, Role } from "./supabaseClient";
import { api, UserProfile } from "./api";

interface AuthState {
  session: Session | null;
  role: Role | null;
  loading: boolean;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  session: null,
  role: null,
  loading: true,
  profile: null,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const refreshProfile = useCallback(async () => {
    try {
      const data = await api.getMe();
      setProfile(data);
    } catch {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setRole((data.session?.user.user_metadata?.role as Role) || null);
      setLoading(false);
      if (data.session) refreshProfile();
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setRole((newSession?.user.user_metadata?.role as Role) || null);
      if (newSession) refreshProfile();
      else setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
  }, [refreshProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, role, loading, profile, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
