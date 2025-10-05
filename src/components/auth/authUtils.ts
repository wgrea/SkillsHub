// src/components/auth/authUtils.ts
import { createClient, User, Session } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'];
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'];

export const supabase = createClient(supabaseUrl, supabaseAnonKey); // ✅ EXPORT this!

export const signUp = async (email: string, password: string): Promise<{ user: User | null; session: Session | null }> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return { user: data.user, session: data.session }; // ✅ Explicit return type
};

export const login = async (email: string, password: string): Promise<{ user: User | null; session: Session | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return { user: data.user, session: data.session }; // ✅ Ensure proper return
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const getSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session; // ✅ Only return session
};