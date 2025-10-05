// src/components/subscription/subscription-card.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { useAuth } from '@/hooks/use-auth';
import { createCheckoutSession } from '@/lib/stripe';
import { STRIPE_PRODUCTS } from '@/stripe-config';

export function SubscriptionCard() {
  const { user } = useAuth();
  const { subscription, loading, error, getSubscriptionProduct, hasActiveSubscription } = useSubscription();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    if (!user) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const product = STRIPE_PRODUCTS[0]; // DSA Role-Based Prep
      const { url } = await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError('Failed to start checkout process. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const subscriptionProduct = getSubscriptionProduct();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscription Status
        </CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checkoutError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{checkoutError}</AlertDescription>
          </Alert>
        )}

        {hasActiveSubscription && subscriptionProduct ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{subscriptionProduct.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {subscriptionProduct.description}
                </p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            {subscription?.current_period_end && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on{' '}
                  {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </span>
              </div>
            )}

            {subscription?.payment_method_brand && subscription?.payment_method_last4 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>
                  {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
                </span>
              </div>
            )}

            {subscription?.cancel_at_period_end && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your subscription will not renew and will expire on{' '}
                  {new Date(subscription.current_period_end! * 1000).toLocaleDateString()}.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">No Active Subscription</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to access premium features and content.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{STRIPE_PRODUCTS[0].name}</h4>
                <Badge variant="outline">${STRIPE_PRODUCTS[0].price}/month</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {STRIPE_PRODUCTS[0].description}
              </p>
              <Button 
                onClick={handleSubscribe} 
                disabled={checkoutLoading}
                className="w-full"
              >
                {checkoutLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Subscribe Now
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}