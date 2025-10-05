// src/hooks/use-upgrade-toasts.ts
import { useToast } from './use-toast';
import { useAnalytics } from './useAnalytics';

export const useUpgradeToasts = () => {
  const { toast } = useToast();
  const { trackUpgradeNudge } = useAnalytics();

  const showLimitToast = (resource: 'skills' | 'projects', current: number, limit: number) => {
    const resourceName = resource === 'skills' ? 'skills' : 'projects';
    
    const context: 'skill_limit' | 'project_limit' = resource === 'skills' ? 'skill_limit' : 'project_limit';
    trackUpgradeNudge(context);
    
    toast({
      title: "🎯 Unlock More Learning",
      description: `You've used ${current}/${limit} ${resourceName}. Upgrade to continue building your ${resourceName} collection. Visit the pricing page to learn more.`,
      duration: 6000,
    });
  };

  const showFeatureToast = (featureName: string, requiredTier: string) => {
    trackUpgradeNudge('feature_gated');
    
    toast({
      title: "✨ Premium Feature",
      description: `${featureName} is available with ${requiredTier} tier. Upgrade to enhance your learning experience.`,
    });
  };

  const showSkillViewNudge = (viewCount: number) => {
    if (viewCount >= 3) {
      trackUpgradeNudge('skill_viewed');
      
      toast({
        title: "🔍 Discovering Skills?",
        description: `You've viewed ${viewCount} skills. Unlock unlimited skill exploration with Premium.`,
        duration: 5000,
      });
    }
  };

  return { 
    showLimitToast, 
    showFeatureToast, 
    showSkillViewNudge 
  };
};