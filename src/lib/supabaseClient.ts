// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    supabase: SupabaseClient;
  }
}

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'];
const supabaseKey = import.meta.env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables! \n' +
    `VITE_SUPABASE_URL: ${supabaseUrl ? '✅' : '❌'}\n` +
    `VITE_SUPABASE_ANON_KEY: ${supabaseKey ? '✅' : '❌'}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: {
      getItem: (key) => {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          console.error('LocalStorage access denied:', e);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value);
        } catch (e) {
          console.error('LocalStorage write failed:', e);
        }
      },
      removeItem: (key) => {
        try {
          // First remove the specific key that was requested
          localStorage.removeItem(key);
          
          // Then clean up all other auth-related items
          ['sb-auth-token', 'sb-user'].forEach(k => {
            if (k !== key) {  // Avoid duplicate removal
              localStorage.removeItem(k);
            }
          });
        } catch (e) {
          console.error('LocalStorage removal failed:', e);
        }
      }
    },
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// Cross-tab synchronization
if (typeof window !== 'undefined') {
  window.supabase = supabase;
  
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('sb-')) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          window.dispatchEvent(new CustomEvent('supabase:sessionUpdate', { 
            detail: session 
          }));
        }
      });
    }
  });
}

if (import.meta.env.DEV) {
  console.debug('[Supabase] Initialized with config:', {
    url: supabaseUrl,
    key: supabaseKey?.slice(0, 5) + '...' + supabaseKey?.slice(-5),
    persistence: 'localStorage'
  });
}

export default supabase;