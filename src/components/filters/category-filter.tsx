// src/components/skills/filters/category-filter.ts

import { SkillCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: SkillCategory[];
  selectedCategory: SkillCategory | 'all';
  onSelectCategory: (category: SkillCategory | 'all') => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  const categoryIcons: Record<SkillCategory, string> = {
    security: '🔐',
    frontend: '⚛️', 
    backend: '🔗', 
    cloud: '☁️',
    devops: '⚙️',
    scripting: '🐍',
    embedded: '🔧',
    design: '🎨',
    data: '📊',
    marketing: '📢',
    business: '💼',
    ai: '🤖',
    gamedev: '🎮' 
};

  
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectCategory('all')}
        className={cn(
          "transition-all",
          selectedCategory === 'all' 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-primary/10"
        )}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            "transition-all",
            selectedCategory === category 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-primary/10"
          )}
        >
          <span className="mr-1.5">{categoryIcons[category]}</span>
          <span className="capitalize">{category}</span>
        </Button>
      ))}
    </div>
  );
}
