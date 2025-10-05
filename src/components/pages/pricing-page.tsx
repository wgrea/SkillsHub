// src/components/pages/pricing-page.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, Loader2, Star, Zap, Target, Brain, Sparkles, Users, TrendingUp, ArrowRight, Lock, Eye, Compass, Rocket, Map, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { createCheckoutSession } from '@/lib/stripe';
import { STRIPE_PRODUCTS, getDisplayPrice } from '@/stripe-config';

export function PricingPage() {
  const { user } = useAuth();
  const { tier: currentTier } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // In your pricing-page.tsx - Update the handleSubscribe function
  const handleSubscribe = async (productId: string, priceId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    // Don't allow subscribing to current tier
    const productTier = STRIPE_PRODUCTS.find(p => p.id === productId)?.tier;
    if (productTier === currentTier) {
      setError('You are already on this plan');
      return;
    }

    setLoading(productId);
    setError(null);

    try {
      const product = STRIPE_PRODUCTS.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');

      const { url } = await createCheckoutSession({
        priceId: priceId,
        mode: product.mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout process. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  // Group products by tier for display
  const productsByTier = {
    explorer: STRIPE_PRODUCTS.filter(p => p.tier === 'explorer'),
    builder: STRIPE_PRODUCTS.filter(p => p.tier === 'builder'),
    architect: STRIPE_PRODUCTS.filter(p => p.tier === 'architect')
  };

  const tiers = [
    {
      id: 'explorer',
      name: 'Explorer',
      tagline: 'See What\'s Possible',
      description: 'Start your journey—discover what you could build',
      products: productsByTier.explorer,
      icon: <Compass className="h-6 w-6" />,
      features: [
        { text: 'Skill previews with level badges', icon: <Eye className="h-4 w-4" />, emotion: 'Curiosity sparks here', bold: false },
        { text: '3 full projects + 200+ teased', icon: <Lock className="h-4 w-4" />, emotion: 'See what you\'ll unlock', bold: false },
        { text: '5 session bookmarks (cleared on logout)', icon: <Check className="h-4 w-4" />, emotion: 'Temporary progress tracking', bold: false },
        { text: 'Basic browse and filtering', icon: <Check className="h-4 w-4" />, emotion: 'Explore freely', bold: false }
      ],
      limitation: 'Limited to 3 skill views per day',
      limitationCta: 'Upgrade to unlock unlimited learning',
      cta: 'Start Exploring',
      current: currentTier === 'explorer'
    },
    {
      id: 'builder',
      name: 'Builder',
      tagline: 'You\'re Ready to Create',
      description: 'Unlock momentum—build what resonates with you',
      products: productsByTier.builder,
      popular: true,
      icon: <Zap className="h-6 w-6" />,
      features: [
        { text: 'Everything in Explorer, plus:', icon: <Check className="h-4 w-4" />, bold: true, emotion: '' },
        { text: 'Full skill library with descriptions', icon: <Target className="h-4 w-4" />, emotion: 'Know exactly what you\'re learning', bold: false },
        { text: '200+ projects, unlimited access', icon: <Check className="h-4 w-4" />, emotion: 'Build project after project', bold: false },
        { text: 'Unlimited bookmarks & collections', icon: <Check className="h-4 w-4" />, emotion: 'Your learning path takes shape', bold: false },
        { text: 'Smart recommendations', icon: <Brain className="h-4 w-4" />, emotion: 'We suggest what to learn next', bold: false },
        { text: 'Progress dashboard with streaks', icon: <BarChart3 className="h-4 w-4" />, emotion: 'See measurable growth', bold: false },
        { text: 'Difficulty matching', icon: <Target className="h-4 w-4" />, emotion: 'Challenges calibrated to your level', bold: false }
      ],
      testimonial: {
        quote: 'I went from tutorial hell to shipping 3 real projects in my first month. The progress tracking kept me motivated.',
        author: 'Sarah M., Frontend Developer'
      },
      valueProps: [
        'Save 60+ hours of aimless wandering',
        'Ship your first project 3× faster'
      ],
      cta: 'Start Building Today',
      current: currentTier === 'builder'
    },
    {
      id: 'architect',
      name: 'Architect',
      tagline: 'Built for Mastery',
      description: 'Strategic clarity—accelerate your career trajectory',
      products: productsByTier.architect,
      icon: <Rocket className="h-6 w-6" />,
      comingSoon: productsByTier.architect.length === 0, // Show coming soon if no products
      features: [
        { text: 'Everything in Builder, plus:', icon: <Check className="h-4 w-4" />, bold: true, emotion: '' },
        { text: 'AI-powered learning paths', icon: <Map className="h-4 w-4" />, emotion: 'Personalized roadmap to your goals', bold: false },
        { text: 'Priority matrix (urgent/important)', icon: <Target className="h-4 w-4" />, emotion: 'Focus on what moves you forward', bold: false },
        { text: 'Gap analysis for your target role', icon: <TrendingUp className="h-4 w-4" />, emotion: 'See the finish line clearly', bold: false },
        { text: 'Curated prompt packs from Will', icon: <Sparkles className="h-4 w-4" />, emotion: 'Mental models for breakthroughs', bold: false },
        { text: 'Reflection journal with "Aha!" tracker', icon: <Brain className="h-4 w-4" />, emotion: 'Capture your growth story', bold: false },
        { text: 'Market intelligence & trends', icon: <TrendingUp className="h-4 w-4" />, emotion: 'Learn what\'s actually hiring', bold: false },
        { text: 'Monthly expert office hours', icon: <Users className="h-4 w-4" />, emotion: 'Get answers tutorials never cover', bold: false }
      ],
      valueProps: [
        'Worth $299 in 1-on-1 coaching',
        'Get to senior-level 2× faster'
      ],
      cta: 'Join Waitlist',
      current: currentTier === 'architect'
    }
  ];

  const isCurrentTier = (tierId: string) => {
    return currentTier === tierId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Join 12,000+ developers building their future</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-5 duration-700">
          Choose Your Path Forward
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-900">
          Stop wandering through random tutorials. Start building with a clear path to your goals.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8 max-w-5xl mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {tiers.map((tier, idx) => (
          <Card 
            key={tier.id}
            className={`relative transition-all duration-300 ${
              tier.popular 
                ? 'border-primary shadow-xl lg:scale-105' 
                : 'border-muted'
            } ${hoveredPlan === tier.id ? 'shadow-2xl -translate-y-1' : ''} ${
              tier.comingSoon ? 'opacity-90' : ''
            }`}
            onMouseEnter={() => setHoveredPlan(tier.id)}
            onMouseLeave={() => setHoveredPlan(null)}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground shadow-lg flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}

            {tier.comingSoon && (
              <div className="absolute -top-3 right-4 z-10">
                <Badge variant="secondary" className="shadow-md">
                  Coming Soon
                </Badge>
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`rounded-lg p-2 ${
                  tier.popular ? 'bg-primary/10 text-primary' : 'bg-muted'
                }`}>
                  {tier.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{tier.tagline}</p>
                </div>
              </div>
              <CardDescription className="text-base">
                {tier.description}
              </CardDescription>
              
              {/* Dynamic Pricing Display */}
              <div className="space-y-2 mt-4">
                {tier.products.map((product) => (
                  <div key={product.id} className="text-center">
                    <div className="text-3xl font-bold">
                      {getDisplayPrice(product)}
                    </div>
                    {product.billing === 'annual' && (
                      <p className="text-sm text-green-600 font-medium">
                        Save ${(16 * 12 - 120)} per year
                      </p>
                    )}
                  </div>
                ))}
                {tier.products.length === 0 && (
                  <div className="text-3xl font-bold text-muted-foreground">
                    Coming Soon
                  </div>
                )}
              </div>

              {tier.valueProps && (
                <div className="space-y-1 mt-3">
                  {tier.valueProps.map((prop, i) => (
                    <p key={i} className="text-xs text-primary flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {prop}
                    </p>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="group/feature">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-1 mt-0.5 ${
                        tier.popular ? 'bg-primary/10 text-primary' : 'bg-muted'
                      }`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${feature.bold ? 'font-semibold' : ''}`}>
                          {feature.text}
                        </span>
                        {feature.emotion && (
                          <p className="text-xs text-muted-foreground mt-0.5 opacity-0 group-hover/feature:opacity-100 transition-opacity">
                            → {feature.emotion}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {tier.limitation && (
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-1">{tier.limitation}</p>
                  {tier.limitationCta && (
                    <p className="text-xs text-primary font-medium">{tier.limitationCta}</p>
                  )}
                </div>
              )}

              {tier.testimonial && (
                <div className="pt-6 border-t bg-muted/30 rounded-lg p-4">
                  <p className="text-sm italic text-muted-foreground mb-2">
                    "{tier.testimonial.quote}"
                  </p>
                  <p className="text-xs font-medium">— {tier.testimonial.author}</p>
                </div>
              )}
            </CardContent>

            // In your CardFooter section - Update the button logic
            <CardFooter className="flex flex-col gap-3">
              {isCurrentTier(tier.id) ? (
                <Button variant="outline" className="w-full" disabled size="lg">
                  ✓ Current Plan
                </Button>
              ) : tier.comingSoon ? (
                <Button variant="secondary" className="w-full" size="lg" disabled>
                  Coming Soon
                </Button>
              ) : tier.products.length === 0 ? (
                <Button variant="secondary" className="w-full" size="lg" disabled>
                  Coming Soon
                </Button>
              ) : (
                <>
                  {tier.products.map((product) => (
                    <Button 
                      key={product.id}
                      onClick={() => handleSubscribe(product.id, product.priceId)}
                      disabled={loading === product.id || !product.priceId}
                      className="w-full group"
                      size="lg"
                      variant={tier.popular ? 'default' : 'outline'}
                    >
                      {loading === product.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {tier.cta} {product.billing === 'annual' && '(Save 20%)'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  ))}
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Rest of your component remains the same */}
      {/* Trust Signals & Risk Reversal sections... */}
    </div>
  );
}