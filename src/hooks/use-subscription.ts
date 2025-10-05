// src/hooks/use-subscription.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { getProductByPriceId } from '@/stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export type SubscriptionTier = 'explorer' | 'builder' | 'architect';

export function useSubscription() {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching subscription:', fetchError);
          setError('Failed to fetch subscription data');
          return;
        }

        setSubscription(data);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user, isAuthenticated]);

  const getSubscriptionProduct = () => {
    if (!subscription?.price_id) return null;
    return getProductByPriceId(subscription.price_id);
  };

  const isActiveSubscription = () => {
    return subscription?.subscription_status === 'active';
  };

  const isTrialing = () => {
    return subscription?.subscription_status === 'trialing';
  };

  const isCanceled = () => {
    return subscription?.subscription_status === 'canceled';
  };

  const isPastDue = () => {
    return subscription?.subscription_status === 'past_due';
  };

  // ✅ COPILOT ENHANCEMENTS - Emotional tier logic
  const product = getSubscriptionProduct();
  const tier: SubscriptionTier = (product?.tier as SubscriptionTier) || 'explorer';

  const isBuilder = tier === 'builder' || tier === 'architect';
  const isArchitect = tier === 'architect';

  const canAccess = (featureTag: string): boolean => {
    const accessMap: Record<string, boolean> = {
      tag_builder: isBuilder,
      tag_architect: isArchitect,
      // Add more feature tags as needed
      ai_roadmap: isArchitect,
      priority_matrix: isArchitect,
      expert_hours: isArchitect,
      unlimited_projects: isBuilder,
      unlimited_skills: isBuilder,
    };
    return accessMap[featureTag] ?? false;
  };

  // Emotional UX subtitles
  const tierSubtitle: Record<SubscriptionTier, string> = {
    explorer: "See What's Possible",
    builder: "You're Ready to Create", 
    architect: "Built for Mastery",
  };

  // Feature limits based on tier
  const limits = {
    maxSkills: isArchitect ? Infinity : isBuilder ? 10 : 3,
    maxProjects: isArchitect ? Infinity : isBuilder ? 15 : 5,
    hasAITools: isBuilder,
    hasExpertHours: isArchitect,
    hasPriorityMatrix: isArchitect,
    hasLearningJournal: isBuilder,
  };

  return {
    subscription,
    loading,
    error,
    getSubscriptionProduct,
    isActiveSubscription,
    isTrialing,
    isCanceled,
    isPastDue,
    hasActiveSubscription: isActiveSubscription() || isTrialing(),
    
    // ✅ Enhanced tier-based access
    tier,
    isBuilder,
    isArchitect,
    canAccess,
    subtitle: tierSubtitle[tier],
    limits,
    
    // Helper for feature gating components
    hasAccess: (requiredTier: SubscriptionTier) => {
      const tierLevel = { explorer: 0, builder: 1, architect: 2 };
      return tierLevel[tier] >= tierLevel[requiredTier];
    }
  };
}