import { Badge } from '@/components/ui/badge';
import { SkillLevel } from '@/types';
import { cn } from '@/lib/utils';

interface SkillLevelBadgeProps {
  level: SkillLevel;
  className?: string;
}

export function SkillLevelBadge({ level, className }: SkillLevelBadgeProps) {
  const levelColors = {
    beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-normal text-xs px-2 py-0.5", 
        levelColors[level],
        className
      )}
    >
      {levelLabels[level]}
    </Badge>
  );
}

{/* From 1.6v Bolt.new version 
import { Badge } from '@/components/ui/badge';
import { SkillLevel } from '@/types';
import { cn } from '@/lib/utils';

interface SkillLevelBadgeProps {
  level: SkillLevel;
  className?: string;
}

export function SkillLevelBadge({ level, className }: SkillLevelBadgeProps) {
  const levelColors = {
    beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-normal text-xs px-2 py-0.5", 
        levelColors[level],
        className
      )}
    >
      {levelLabels[level]}
    </Badge>
  );
}  
*/}