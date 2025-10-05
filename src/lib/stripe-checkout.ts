// src/lib/stripe-checkout.ts - Client-side utility
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export interface CheckoutSessionParams {
  plan: 'builder' | 'architect';
  success_url?: string;
  cancel_url?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Client-side function to create a Stripe checkout session
 */
export async function createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSessionResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        plan: params.plan,
        success_url: params.success_url || `${window.location.origin}/success`,
        cancel_url: params.cancel_url || `${window.location.origin}/pricing`
      }
    });

    if (error) {
      throw new Error(error.message || 'Failed to create checkout session');
    }

    if (!data || !data.sessionId) {
      throw new Error('Invalid response from checkout service');
    }

    return data;
  } catch (error: any) {
    console.error('Checkout session error:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}

/**
 * Plan-specific checkout functions
 */
export async function createBuilderCheckout(): Promise<CheckoutSessionResponse> {
  return createCheckoutSession({
    plan: 'builder'
  });
}

export async function createArchitectCheckout(): Promise<CheckoutSessionResponse> {
  return createCheckoutSession({
    plan: 'architect'
  });
}

/**
 * Utility to redirect to Stripe Checkout
 */
export function redirectToCheckout(url: string): void {
  if (!url) {
    throw new Error('No checkout URL provided');
  }
  window.location.href = url;
}