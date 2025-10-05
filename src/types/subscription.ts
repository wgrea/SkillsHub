// src/types/subscription.ts

export enum SubscriptionTier {
  EXPLORER = 'explorer',
  BUILDER_PLUS = 'builder', // Changed to match your hook expectation
  ARCHITECT = 'architect'
}

export interface SubscriptionData {
  id: string;
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  prices: StripePrice[];
}

export interface StripePrice {
  id: string;
  productId: string;
  currency: string;
  unitAmount: number;
  interval?: 'month' | 'year';
  intervalCount?: number;
}