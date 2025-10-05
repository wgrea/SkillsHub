/// <reference types="vite/client" />

// Explicit type declaration for your supabase client
declare module '@/lib/supabaseClient' {
  const supabase: import('@supabase/supabase-js').SupabaseClient;
  export default supabase;
}