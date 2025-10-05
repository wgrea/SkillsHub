// src/components/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./authUtils";
import { login, logout } from "./authUtils";
import { User, Session } from "@supabase/supabase-js";
import { track } from "@/lib/analytics";

// Define subscription types here
type SubscriptionTier = 'explorer' | 'builder' | 'architect';

interface TierLimits {
  maxSkills: number;
  maxProjects: number;
  hasAITools: boolean;
  hasExpertHours: boolean;
  hasPriorityMatrix: boolean;
  hasLearningJournal: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  logout: () => Promise<void>;
  validateSession: () => Promise<boolean>;
  saveUserProgress: (progressData: any) => Promise<void>;
  
  // ✅ Subscription tier info - computed from user data
  tier: SubscriptionTier;
  isBuilder: boolean;
  isArchitect: boolean;
  hasAccess: (requiredTier: SubscriptionTier) => boolean;
  canAccess: (featureTag: string) => boolean;
  limits: TierLimits;
  subtitle: string;
  emotion: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tier configuration
const TIER_CONFIG = {
  explorer: {
    maxSkills: 3,
    maxProjects: 5,
    hasAITools: false,
    hasExpertHours: false,
    hasPriorityMatrix: false,
    hasLearningJournal: false,
  },
  builder: {
    maxSkills: 10,
    maxProjects: 25,
    hasAITools: true,
    hasExpertHours: true,
    hasPriorityMatrix: false,
    hasLearningJournal: true,
  },
  architect: {
    maxSkills: 50,
    maxProjects: 100,
    hasAITools: true,
    hasExpertHours: true,
    hasPriorityMatrix: true,
    hasLearningJournal: true,
  }
};

const TIER_SUBTITLES = {
  explorer: "Curious Beginner",
  builder: "Serious Learner", 
  architect: "Professional Architect"
};

// Utility functions
const hashEmail = (email: string) => {
  return btoa(email).slice(0, 16);
};

const getDeviceFingerprint = () => {
  return navigator?.userAgent || 'unknown';
};

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout>();
  const [userTier, setUserTier] = useState<SubscriptionTier>('explorer');

  // ✅ Fetch user tier from profile
  const fetchUserTier = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', userId)
        .single();
      
      const tier = (profile?.subscription_tier as SubscriptionTier) || 'explorer';
      setUserTier(tier);
      
      track('subscription:tier_loaded', { tier });
    } catch (error) {
      console.error('Failed to fetch user tier:', error);
      setUserTier('explorer');
    }
  };

  // Compute subscription properties
  const tier = userTier;
  const isBuilder = tier === 'builder' || tier === 'architect';
  const isArchitect = tier === 'architect';
  const limits = TIER_CONFIG[tier];
  const subtitle = TIER_SUBTITLES[tier];

  const hasAccess = (requiredTier: SubscriptionTier): boolean => {
    const tierLevels = { explorer: 0, builder: 1, architect: 2 };
    return tierLevels[tier] >= tierLevels[requiredTier];
  };

  const canAccess = (featureTag: string): boolean => {
    const featureAccess: Record<string, boolean> = {
      'ai_tools': limits.hasAITools,
      'expert_hours': limits.hasExpertHours,
      'priority_matrix': limits.hasPriorityMatrix,
      'learning_journal': limits.hasLearningJournal,
      'unlimited_skills': tier === 'architect',
      'premium_projects': isBuilder
    };
    return featureAccess[featureTag] || false;
  };

  const getTierEmotion = (): string => {
    const emotions = {
      explorer: "Perfect for curious beginners dipping their toes into new skills",
      builder: "For serious learners ready to construct meaningful career skills", 
      architect: "Become the architect of your professional destiny with AI-powered guidance"
    };
    return emotions[tier] || emotions.explorer;
  };

  // Update tier when user changes
  useEffect(() => {
    if (user?.id) {
      fetchUserTier(user.id);
    } else {
      setUserTier('explorer');
    }
  }, [user]);

  const trackedLogin = async (email: string, password: string) => {
    const startTime = performance.now();
    
    try {
      track('auth:login_attempt', { 
        email_hash: hashEmail(email),
        device_id: getDeviceFingerprint(),
        current_tier: tier
      });
      
      const result = await login(email, password);
      
      if (result.user) {
        // Fetch the updated tier after login
        await fetchUserTier(result.user.id);
        
        track('auth:login_success', {
          user_id: result.user.id,
          duration_ms: performance.now() - startTime,
          tier: tier
        });
        
        // Start session timer
        setSessionTimer(setInterval(() => {
          track('auth:session_heartbeat', {
            user_id: result.user?.id,
            duration_min: Math.floor((performance.now() - startTime) / 60000),
            tier: tier
          });
        }, 300000)); // 5 min intervals
      }
      
      return result;
    } catch (error: any) {
      track('auth:login_failed', {
        error_code: error.status || 'unknown',
        auth_method: 'email_password',
        duration_ms: performance.now() - startTime,
        tier: tier
      });
      throw error;
    }
  };

  const trackedLogout = async () => {
    if (sessionTimer) clearInterval(sessionTimer);
    
    track('auth:logout_start', { 
      user_id: user?.id,
      tier: tier
    });
    const startTime = performance.now();
    
    await logout();
    setUserTier('explorer'); // Reset tier on logout
    
    track('auth:logout_success', {
      duration_ms: performance.now() - startTime,
      tier: tier
    });
  };

  const validateSession = async (): Promise<boolean> => {
    const startTime = performance.now();
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        track('auth:session_validation_failed', {
          error: error.message,
          duration_ms: performance.now() - startTime,
          tier: tier
        });
        return false;
      }
      
      const isValid = Boolean(session && !isTokenExpired(session.access_token));
      track('auth:session_checked', {
        is_valid: isValid,
        duration_ms: performance.now() - startTime,
        tier: tier
      });
      
      return isValid;
    } catch {
      return false;
    }
  };

  const saveUserProgress = async (progressData: any) => {
    if (!await validateSession()) {
      track('progress:save_attempt_without_session', {
        tier: tier
      });
      throw new Error('Invalid session');
    }

    // ✅ Check tier limits before saving
    if (progressData.skills && progressData.skills.length > limits.maxSkills) {
      track('progress:save_exceeded_limits', {
        tier: tier,
        attempted_skills: progressData.skills.length,
        max_allowed: limits.maxSkills
      });
      throw new Error(`Skill limit exceeded for ${tier} tier`);
    }

    try {
      track('progress:save_start', {
        steps_count: progressData.steps?.length || 0,
        tier: tier
      });
      
      // Your save logic here
      // await supabase.from('user_progress').upsert(...);
      
      track('progress:save_success', {
        tier: tier
      });
    } catch (error: any) {
      track('progress:save_failed', {
        error: error.message,
        tier: tier
      });
      throw error;
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user || null;
      setUser(sessionUser);
      
      if (sessionUser) {
        await fetchUserTier(sessionUser.id);
        track('auth:session_recovered', {
          user_id: sessionUser.id,
          tier: tier
        });
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);
      
      if (sessionUser) {
        await fetchUserTier(sessionUser.id);
      } else {
        setUserTier('explorer');
      }
      
      switch (event) {
        case 'SIGNED_IN':
          track('auth:session_active', { 
            user_id: sessionUser?.id,
            tier: tier
          });
          break;
        case 'SIGNED_OUT':
          if (sessionTimer) clearInterval(sessionTimer);
          track('auth:session_ended', {
            tier: tier
          });
          break;
        case 'PASSWORD_RECOVERY':
          track('auth:recovery_started', {
            tier: tier
          });
          break;
        case 'USER_UPDATED':
          track('auth:user_updated', {
            tier: tier
          });
          break;
      }
    });

    fetchSession();
    return () => {
      authListener?.subscription?.unsubscribe();
      if (sessionTimer) clearInterval(sessionTimer);
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login: trackedLogin, 
        logout: trackedLogout,
        validateSession,
        saveUserProgress,
        
        // ✅ Subscription tier info - now computed internally
        tier,
        isBuilder,
        isArchitect,
        hasAccess,
        canAccess,
        limits,
        subtitle,
        emotion: getTierEmotion()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};