// src/components/skills/skill-grid.tsx
import { useState, useEffect, useCallback } from 'react';
import { Skill } from '@/types';
import { SkillCard } from '@/components/skills/skill-card';
import { EmptyState } from '@/components/ui/empty-state';
import { useDebounce } from '@/hooks/use-debounce';
import { useSubscription } from '@/hooks/use-subscription';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsGridProps {
  skills: Skill[];
  selectedSkills?: string[];
  onSkillSelect?: (skillId: string) => void;
  variant?: 'default' | 'compact';
}

export function SkillsGrid({ 
  skills, 
  selectedSkills = [], 
  onSkillSelect, 
  variant = 'default' 
}: SkillsGridProps) {
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { hasAccess } = useSubscription();
const isBuilderTier = hasAccess?.('builder') || false; // Simple fix for now

  const calculateColumns = useCallback(() => {
    const width = window.innerWidth;
    let count = 1;
    
    if (variant === 'compact') {
      count = width >= 1024 ? 5 : width >= 768 ? 4 : width >= 640 ? 3 : 2;
    } else {
      count = width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    }
    
    setColumnCount(count);
  }, [variant]);

  const debouncedCalculateColumns = useDebounce(calculateColumns, 100);

  useEffect(() => {
    setIsLoading(true);
    calculateColumns();
    setIsLoading(false);

    window.addEventListener('resize', debouncedCalculateColumns);
    return () => {
      window.removeEventListener('resize', debouncedCalculateColumns);
    };
  }, [calculateColumns, debouncedCalculateColumns]);

  const handleSkillClick = (skillId: string) => {
    if (onSkillSelect) {
      onSkillSelect(skillId);
    } else {
      setExpandedSkillId(skillId === expandedSkillId ? null : skillId);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (skills.length === 0) {
    return (
      <EmptyState 
        title="No skills found" 
        description="Try adjusting your filters or search query." 
      />
    );
  }

  return (
    <div className="overflow-y-auto max-h-[80vh] px-1.5">
      <AnimatePresence>
        <motion.div
          className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isExpanded={skill.id === expandedSkillId}
              isSelected={selectedSkills.includes(skill.id)}
              onToggleExpand={() => handleSkillClick(skill.id)}
              showFullDescription={isBuilderTier}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}