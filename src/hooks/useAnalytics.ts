// src/hooks/useAnalytics.ts
import { useContext } from 'react';
import { AnalyticsContext } from '@/components/analytics/AnalyticsProvider';

type UpgradeNudgeContext = 'skill_limit' | 'project_limit' | 'feature_gated' | 'skill_viewed';

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  
  const track = (event: string, properties?: Record<string, unknown>) => {
    if (!context) {
      console.warn('AnalyticsProvider missing, event not tracked:', event, properties);
      return;
    }
    return context.track(event, properties);
  };

  // ✅ FIXED: Properly typed upgrade triggers
  const trackUpgradeNudge = (context: UpgradeNudgeContext) => {
    track('upgrade_nudge_shown', { 
      context, 
      timestamp: Date.now(),
      message: getNudgeMessage(context)
    });
  };

  const trackLimitReached = (resource: string, current: number, limit: number, tier: string) => {
    track('resource_limit_reached', { 
      resource, 
      current, 
      limit, 
      tier,
      timestamp: Date.now() 
    });
  };

  const trackUpgradeIntent = (source: string, currentTier: string, targetTier: string) => {
    track('upgrade_intent_started', {
      source,
      currentTier,
      targetTier,
      timestamp: Date.now()
    });
  };

  // ✅ FIXED: Proper typing for message lookup
  const getNudgeMessage = (context: UpgradeNudgeContext): string => {
    const messages: Record<UpgradeNudgeContext, string> = {
      skill_limit: "You've reached your skill limit—unlock more",
      project_limit: "You've reached your project limit—unlock more", 
      feature_gated: "Premium feature unlocked with upgrade",
      skill_viewed: "You've viewed 3 skills—unlock more"
    };
    return messages[context];
  };

  return { 
    track, 
    trackUpgradeNudge, 
    trackLimitReached, 
    trackUpgradeIntent 
  };
};