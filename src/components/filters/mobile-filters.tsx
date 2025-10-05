// src/components/filters/mobile-filters.tsx

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SkillCategory } from '@/types';

interface MobileFiltersProps {
  categories: SkillCategory[];
  selectedCategory: SkillCategory | 'all';
  onSelectCategory: (category: SkillCategory | 'all') => void;
}

export function MobileFilters({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: MobileFiltersProps) {
  const categoryIcons: Record<SkillCategory, string> = {
    security: '🔒',
    design: '🎨',
    data: '📊',
    marketing: '📢',
    business: '💼',
    ai: '🤖',
    frontend: '💻',
    backend: '⚙️',
    cloud: '☁️',
    devops: '🔄',
    scripting: '📜',
    embedded: '🔌',
    gamedev: '🎮'
  };
  
  const handleChange = (value: string) => {
    onSelectCategory(value as SkillCategory | 'all');
  };
  
  return (
    <Select value={selectedCategory} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            <div className="flex items-center">
              <span className="mr-2">{categoryIcons[category]}</span>
              <span className="capitalize">{category}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
