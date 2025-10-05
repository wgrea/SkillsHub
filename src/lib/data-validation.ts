//src/lib/data-validation.ts
import { z } from 'zod';
import type { SkillCategory, SkillLevel, ProjectDifficulty, Currency, TrendTag } from '@/types';

// ======================
// ENUM SCHEMAS
// ======================
const skillCategorySchema = z.enum(['programming', 'design', 'data', 'marketing', 'business', 'ai']).transform(val => val as SkillCategory);
const skillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']).transform(val => val as SkillLevel);
const projectDifficultySchema = z.enum(['easy', 'medium', 'hard', 'expert']).transform(val => val as ProjectDifficulty);
const currencySchema = z.enum(['USD', 'EUR', 'GBP', 'JPY', 'CAD']).transform(val => val as Currency);
const trendTagSchema = z.enum(['trending', 'stable', 'declining', 'high-demand', 'emerging']).transform(val => val as TrendTag);

// ======================
// COMMON SUBSCHEMAS
// ======================
const skillSourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  description: z.string(),
  lastUpdated: z.string().datetime(),
  reliabilityScore: z.number().min(0).max(100).optional(),
}).strict();

const salaryRangeSchema = z.object({
  min: z.number().positive(),
  max: z.number().positive(),
  currency: currencySchema,
}).refine(data => data.max >= data.min, {
  message: "Max salary must be greater than or equal to min salary",
});

const certificationSchema = z.object({
  name: z.string(),
  provider: z.string(),
  url: z.string().url(),
}).strict();

const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

// ======================
// MAIN SCHEMAS
// ======================
const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(20),
  category: skillCategorySchema,
  popularityScore: z.number().min(0).max(100),
  growthRate: z.number().min(0).max(100),
  icon: z.string(),
  color: z.string(),
  level: skillLevelSchema,
  relatedSkills: z.array(z.string().min(1)),
  source: skillSourceSchema,
  demandScore: z.number().min(0).max(100),
  salaryRange: salaryRangeSchema,
  jobPostings: z.number().min(0),
  linkedInEndorsements: z.number().min(0),
  certifications: z.array(certificationSchema),
  metadata: z.object({
    industryDemand: z.object({
      score: z.number().min(0).max(100),
      source: z.string(),
      url: z.string().url(),
      lastUpdated: z.string().datetime(),
      region: z.string().optional(),
    }),
    userPopularity: z.object({
      score: z.number().min(0).max(100),
      endorsements: z.number().min(0),
      surveySource: z.string(),
      lastUpdated: z.string().datetime(),
    }),
    relevanceScore: z.number().min(0).max(100),
    trendTag: trendTagSchema,
  }).strict().optional(),
}).strict();

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(20),
  difficulty: projectDifficultySchema,
  estimatedHours: z.number().positive(),
  requiredSkills: z.array(skillSchema.pick({ id: true, name: true })), // Simplified reference
  imageUrl: z.string().url(),
  resourceLinks: z.array(resourceSchema),
  learningPath: z.object({
    steps: z.array(z.object({
      title: z.string(),
      description: z.string(),
      resources: z.array(resourceSchema.extend({
        type: z.enum(['video', 'article', 'tutorial', 'documentation', 'course']),
        durationMinutes: z.number().positive().optional(),
      })),
      completed: z.boolean().optional(),
      order: z.number().positive(),
    })),
    estimatedCompletionTime: z.number().positive().optional(),
    prerequisites: z.array(z.string()).optional(),
  }).optional(),
  academicConnections: z.object({
    subjects: z.array(z.string()),
    concepts: z.array(z.string()),
    creditRecommendation: z.string().optional(),
  }).optional(),
}).strict();

// ======================
// VALIDATION UTILITIES
// ======================
export function validateSkill(skill: unknown): boolean {
  return skillSchema.safeParse(skill).success;
}

export function validateProject(project: unknown): boolean {
  return projectSchema.safeParse(project).success;
}

export function validateAll<T>(items: unknown[], schema: z.ZodType<T>): {
  valid: T[];
  invalid: Array<{ data: unknown; errors: z.ZodIssue[] }>;
} {
  const results = items.map(item => ({
    data: item,
    result: schema.safeParse(item),
  }));

  return {
    valid: results.filter(r => r.result.success).map(r => r.result.data as T),
    invalid: results.filter(r => !r.result.success).map(r => ({
      data: r.data,
      errors: r.result.success ? [] : r.result.error.errors,
    })),
  };
}
