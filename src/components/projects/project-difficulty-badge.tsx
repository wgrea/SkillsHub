import { Badge } from '@/components/ui/badge';
import { ProjectDifficulty } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectDifficultyBadgeProps {
  difficulty: ProjectDifficulty;
  className?: string;
}

export function ProjectDifficultyBadge({ difficulty, className }: ProjectDifficultyBadgeProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    expert: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    expert: 'Expert',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-normal text-xs", 
        difficultyColors[difficulty],
        className
      )}
    >
      {difficultyLabels[difficulty]}
    </Badge>
  );
}
