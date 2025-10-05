import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // Updated path
import { Session } from "@supabase/supabase-js";

const AuthHandler = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check initial session state
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return session ? (
    <div>Welcome, {session?.user?.email}!</div>
  ) : (
    <div>Please log in to access this content.</div>
  );
};

export default AuthHandler;
