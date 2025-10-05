// src/types.ts

// ======================
// Base Types (unchanged)
// ======================
export type SkillCategory = 
  | 'security' 
  | 'design' 
  | 'data' 
  | 'marketing' 
  | 'business' 
  | 'ai' 
  | 'frontend' 
  | 'backend' 
  | 'cloud' 
  | 'devops'
  | 'scripting'
  | 'embedded'
  | 'gamedev'; 

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProjectDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';
export type TrendTag = 'critical' | 'high-demand' | 'high-growth' | 'surging' | 'rising' | 'emerging' | 'trending' | 'steady' | 'stable' | 'declining';
export type ResourceType = 'video' | 'article' | 'tutorial' | 'documentation' | 'course';

// ======================
// ✅ ADD ProjectIdea Interface
// ======================
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

// ======================
// Interface Definitions
// ======================
export interface SkillSource {
  name: string;
  url: string;
  description: string;
  lastUpdated: string;
  reliabilityScore?: number;
}

export interface SkillMetadata {
  industryDemand: {
    score: number;
    source: string;
    url: string;
    lastUpdated: string;
    region?: string;
  };
  userPopularity: {
    score: number;
    endorsements: number;
    surveySource: string;
    lastUpdated: string;
  };
  relevanceScore: number;
  trendTag: TrendTag;
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
    currency: Currency;
  };
  jobPostings: number;
  linkedInEndorsements: number;
  certifications: {
    name: string;
    provider: string;
    url: string;
  }[];
  metadata?: SkillMetadata;
  // ✅ ADD projectIdeas property here
  projectIdeas?: ProjectIdea[];
}

export interface LearningStep {
  title: string;
  description: string;
  resources: {
    type: ResourceType;
    title: string;
    url: string;
    durationMinutes?: number;
  }[];
  completed?: boolean;
  order: number;
}

export interface AcademicConnections {
  subjects: string[];
  concepts: string[];
  creditRecommendation?: string;
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
  learningPath?: LearningPath;
  academicConnections?: AcademicConnections;
  promptTemplates?: PromptTemplates;
}

export interface LearningPath {
  steps: LearningStep[];
  estimatedCompletionTime?: number;
  prerequisites?: string[];
}

export interface UserProgress {
  userId: string;
  skillId: string;
  progress: number;
  lastUpdated: string;
  linkedInVerified: boolean;
  completedProjects: string[];
}

// Add BookmarkState from skills.ts
export interface BookmarkState {
  skills: Set<string>;
  projects: Set<string>;
}

export interface PromptTemplates {
  proposal: string;
  code?: string; // Make optional since not all projects need code prompts
  alternative?: string; // Optional alternative approach
  pricing?: { // Structured pricing information
    range: `${number}-${number}`;
    currency: Currency;
    notes?: string;
  };
}

// ======================
// Utility Types
// ======================
export type CompleteSkill = Skill & {
  metadata: SkillMetadata;
};

export type CompleteProject = Project & {
  learningPath: LearningPath;
  academicConnections: AcademicConnections;
};
