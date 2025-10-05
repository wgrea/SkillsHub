// src/data/mock-generators.ts

import { Skill, Project } from '@/types';
import { SubscriptionTier } from '@/hooks/use-subscription';

// Tier limits configuration - updated to match your actual tier names
export const TIER_LIMITS: Record<SubscriptionTier, { skills: number; projects: number }> = {
  explorer: {
    skills: 3,
    projects: 5 // Matches your hook's limits
  },
  builder: {
    skills: 10,
    projects: 15 // Matches your hook's limits
  },
  architect: {
    skills: Infinity,
    projects: Infinity
  }
};

export const getTierLimit = (tier: SubscriptionTier, resource: 'skills' | 'projects'): number => {
  return TIER_LIMITS[tier][resource];
};

export const canAddResource = (
  tier: SubscriptionTier, 
  resource: 'skills' | 'projects', 
  currentCount: number
): boolean => {
  const limit = getTierLimit(tier, resource);
  return currentCount < limit;
};

export const getRemainingResources = (
  tier: SubscriptionTier,
  resource: 'skills' | 'projects', 
  currentCount: number
): number => {
  const limit = getTierLimit(tier, resource);
  return Math.max(0, limit - currentCount);
};

// Your existing generators remain unchanged
export const generateSkill = (overrides: Partial<Skill> = {}): Skill => ({
  id: `skill-${crypto.randomUUID()}`,
  name: 'New Skill',
  description: '',
  category: 'frontend',
  popularityScore: 50,
  growthRate: 0,
  icon: '✨',
  color: '#000000',
  level: 'beginner',
  relatedSkills: [],
  source: {
    name: '',
    url: '',
    description: '',
    lastUpdated: new Date().toISOString()
  },
  demandScore: 50,
  salaryRange: { min: 50000, max: 100000, currency: 'USD' },
  jobPostings: 0,
  linkedInEndorsements: 0,
  certifications: [],
  ...overrides
});

export const generateProject = (overrides: Partial<Project> = {}): Project => ({
  id: `project-${crypto.randomUUID()}`,
  title: 'New Project',
  description: '',
  difficulty: 'medium',
  estimatedHours: 10,
  requiredSkills: [],
  imageUrl: '',
  resourceLinks: [],
  learningPath: { steps: [] },
  academicConnections: { subjects: [], concepts: [] },
  ...overrides
});