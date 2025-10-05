// src/hooks/use-stripe-checkout.ts
import { useCallback } from 'react';
import { useAuth } from './use-auth';
import { 
  createBuilderCheckout, 
  createArchitectCheckout, 
  redirectToCheckout 
} from '../lib/stripe-checkout';

export function useStripeCheckout() {
  const { user } = useAuth();

  const handleCheckout = useCallback(async (plan: 'builder' | 'architect') => {
    if (!user) {
      throw new Error('You must be logged in to subscribe');
    }

    let session;
    
    if (plan === 'builder') {
      session = await createBuilderCheckout();
    } else {
      session = await createArchitectCheckout();
    }
    
    if (session?.url) {
      redirectToCheckout(session.url);
    } else {
      throw new Error('Failed to create checkout session');
    }
  }, [user]);

  const handleBuilderCheckout = useCallback(() => 
    handleCheckout('builder'), [handleCheckout]);

  const handleArchitectCheckout = useCallback(() => 
    handleCheckout('architect'), [handleCheckout]);

  return {
    handleBuilderCheckout,
    handleArchitectCheckout,
    handleCheckout
  };
}