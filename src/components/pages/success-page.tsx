import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Simulate a brief loading period to allow webhook processing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>
                Please log in to view this page.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">
              Processing your payment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your subscription is now active.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessionId && (
            <Alert>
              <AlertDescription>
                <strong>Session ID:</strong> {sessionId}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <h3 className="font-semibold">What's next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Access to premium DSA patterns and frameworks</li>
              <li>• Role-based preparation materials</li>
              <li>• Advanced debugging simulators</li>
              <li>• Personalized learning paths</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/account')} className="w-full">
              View Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}