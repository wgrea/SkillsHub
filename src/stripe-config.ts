// src/stripe-config.ts
export type Tier = 'explorer' | 'builder' | 'architect';

export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number;
  currency?: string;
  tier: Tier;
  billing: 'monthly' | 'annual';
}


// Emotional messaging for each tier
export const TIER_MESSAGING: Record<string, { subtitle: string; emotion: string }> = {
  explorer: {
    subtitle: "See What's Possible",
    emotion: "Perfect for curious beginners dipping their toes into new skills"
  },
  builder: {
    subtitle: "You're Ready to Create", 
    emotion: "For serious learners ready to construct meaningful career skills"
  },
  architect: {
    subtitle: "Built for Mastery",
    emotion: "Become the architect of your professional destiny with AI-powered guidance"
  }
};

// Feature mapping for each tier
export const TIER_FEATURES = {
  explorer: [
    '3 Skills Access',
    '5 Project Previews',
    'Basic Community Access',
    'Limited Progress Tracking'
  ],
  builder: [
    'Unlimited Skills Access',
    '15 Full Projects',
    'AI Learning Tools',
    'Progress Tracking',
    'Priority Support',
    'Learning Journal'
  ],
  architect: [
    'Everything in Builder',
    'Unlimited Projects',
    'AI Roadmap Generator',
    'Priority Matrix Tools',
    'Expert Office Hours',
    'Market Insights',
    'Advanced Analytics'
  ]
};

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_explorer',
    priceId: 'price_explorer_free', // This might need to be empty or handled differently
    name: 'Explorer',
    description: TIER_MESSAGING.explorer.emotion,
    mode: 'subscription',
    tier: 'explorer',
    billing: 'monthly',
    price: 0,
    currency: 'USD'
  },
  {
    id: 'prod_builder_annual',
    priceId: 'price_1Rn3FpECeFkRgoCGvPbNgkki_annual', // Must match Stripe
    name: 'Builder Annual',
    description: TIER_MESSAGING.builder.emotion,
    mode: 'subscription',
    tier: 'builder',
    billing: 'annual',
    price: 120,
    currency: 'USD'
  },
  {
    id: 'prod_builder_monthly',
    priceId: 'price_1Rn3FpECeFkRgoCGvPbNgkki_monthly',
    name: 'Builder Monthly',
    description: TIER_MESSAGING.builder.emotion,
    mode: 'subscription',
    tier: 'builder',
    billing: 'monthly',
    price: 16,
    currency: 'USD'
  },
  {
    id: 'prod_architect_annual',
    priceId: 'price_1Rn3FpECeFkRgoCGvPbNgkki_architect_annual',
    name: 'Architect Annual',
    description: TIER_MESSAGING.architect.emotion,
    mode: 'subscription',
    tier: 'architect',
    billing: 'annual',
    price: 349,
    currency: 'USD'
  },
  {
    id: 'prod_architect_monthly',
    priceId: 'price_1Rn3FpECeFkRgoCGvPbNgkki_architect_monthly',
    name: 'Architect Monthly',
    description: TIER_MESSAGING.architect.emotion,
    mode: 'subscription',
    tier: 'architect',
    billing: 'monthly',
    price: 39,
    currency: 'USD'
  }
];

// Stripe configuration with Gemini-powered premium plans
export const STRIPE_CONFIG = {
  // Premium plans with Gemini AI features
  plans: {
    builder: {
      id: 'price_builder_monthly', // Replace with actual Stripe Price ID
      name: 'Builder',
      description: 'For aspiring developers & career starters',
      price: 29,
      interval: 'month',
      features: [
        'Gemini AI Project Recommendations',
        '5 AI-powered code reviews monthly',
        'Personalized learning paths',
        'Access to 100+ premium projects',
        'Basic career guidance',
        'Community access',
        'Email support'
      ],
      geminiCredits: 5,
      maxProjects: 100,
      aiFeatures: true
    },
    architect: {
      id: 'price_architect_monthly', // Replace with actual Stripe Price ID
      name: 'Architect',
      description: 'For senior developers & tech leaders',
      price: 79,
      interval: 'month',
      features: [
        'Unlimited Gemini AI Project Recommendations',
        '20 AI-powered code reviews monthly',
        'Advanced personalized learning paths',
        'Unlimited premium project access',
        '1:1 career coaching sessions',
        'Priority community access',
        'Priority email & chat support',
        'Expert office hours',
        'Resume review service',
        'Interview preparation'
      ],
      geminiCredits: 20,
      maxProjects: 'unlimited',
      aiFeatures: true,
      prioritySupport: true,
      expertSessions: true
    }
  },
  
  // Free tier limitations
  freeTier: {
    maxProjects: 10,
    geminiCredits: 0,
    aiFeatures: false,
    ads: true
  }
} as const;

export type SubscriptionPlan = keyof typeof STRIPE_CONFIG.plans;
export type PlanFeatures = typeof STRIPE_CONFIG.plans[SubscriptionPlan];

export function getProductByTier(tier: string): StripeProduct[] {
  return STRIPE_PRODUCTS.filter(product => product.tier === tier);
}

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
}

// New helper functions for emotional UX
export function getTierSubtitle(tier: string): string {
  return TIER_MESSAGING[tier]?.subtitle || "Start Your Journey";
}

export function getTierFeatures(tier: Tier): string[] {
  return TIER_FEATURES[tier];
}


export function getTierEmotion(tier: string): string {
  return TIER_MESSAGING[tier]?.emotion || "Begin your learning adventure";
}

// Price formatting helper
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

// Get display price with billing interval
export function getDisplayPrice(product: StripeProduct): string {
  if (product.price === 0) return 'Free';
  
  const formattedPrice = formatPrice(product.price!, product.currency);
  return product.billing === 'annual' 
    ? `${formattedPrice}/year` 
    : `${formattedPrice}/month`;
}