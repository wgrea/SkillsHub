// src/types/skills.ts
export type SkillCategory = 
  | 'programming' 
  | 'design' 
  | 'data' 
  | 'marketing' 
  | 'business'
  | 'ai'
  | 'gamedev';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProjectDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type SortOption = 'popularity' | 'growth' | 'salary' | 'demand' | 'alphabetical';

// ✅ ADD ProjectIdea interface
export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  resources?: {
    name: string;
    url: string;
  }[];
}

export interface SkillSource {
  name: string;
  url: string;
  description: string;
  lastUpdated: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  popularityScore: number;
  growthRate: number;
  icon: string;
  color: string;
  level: SkillLevel;
  relatedSkills: string[];
  source: SkillSource;
  demandScore: number;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  jobPostings: number;
  linkedInEndorsements: number;
  certifications: {
    name: string;
    provider: string;
    url: string;
  }[];
  // ✅ ADD projectIdeas property here
  projectIdeas?: ProjectIdea[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  estimatedHours: number;
  requiredSkills: Skill[];
  imageUrl: string;
  resourceLinks: {
    title: string;
    url: string;
  }[];
  learningPath?: {
    steps: {
      title: string;
      description: string;
      resources: {
        type: 'video' | 'article' | 'tutorial';
        title: string;
        url: string;
      }[];
    }[];
  };
  academicConnections?: {
    subjects: string[];
    concepts: string[];
  };
}

export interface UserProgress {
  userId: string;
  skillId: string;
  progress: number;
  lastUpdated: string;
  linkedInVerified: boolean;
  completedProjects: string[];
}

export interface BookmarkState {
  skills: Set<string>;
  projects: Set<string>;
}

export interface FilterState {
  categories: SkillCategory[];
  levels: SkillLevel[];
  difficulties: ProjectDifficulty[];
  salaryRange: {
    min: number;
    max: number;
  };
  sortBy: SortOption;
}