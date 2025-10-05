// src/hooks/use-tier-limits.ts
import { useSubscription } from './use-subscription';
import { useUpgradeToasts } from './use-upgrade-toasts';
import { useAnalytics } from './useAnalytics';
import { 
  canAddResource, 
  getRemainingResources, 
  getTierLimit 
} from '@/data/mock-generators';

export const useTierLimits = () => {
  const { 
    tier, 
    loading 
  } = useSubscription();
  
  const { showLimitToast } = useUpgradeToasts();
  const { trackLimitReached } = useAnalytics();

  const checkLimit = (resource: 'skills' | 'projects', currentCount: number) => {
    if (loading) {
      return { 
        canAdd: false, 
        remaining: 0, 
        limit: 0, 
        isAtLimit: false, 
        isLoading: true 
      };
    }
    
    const limit = getTierLimit(tier, resource);
    const canAdd = canAddResource(tier, resource, currentCount);
    const remaining = getRemainingResources(tier, resource, currentCount);
    const isAtLimit = !canAdd;
    
    if (isAtLimit) {
      trackLimitReached(resource, currentCount, limit, tier);
    }
    
    return {
      canAdd,
      remaining,
      limit,
      isAtLimit,
      isLoading: false
    };
  };

  const attemptAddResource = (resource: 'skills' | 'projects', currentCount: number) => {
    const { canAdd, limit } = checkLimit(resource, currentCount);
    
    if (!canAdd) {
      showLimitToast(resource, currentCount, limit); // Removed tier parameter
      return false;
    }
    
    return true;
  };

  return {
    tier,
    checkLimit,
    attemptAddResource,
    isLoading: loading
  };
};