// src/components/expert-office-hours.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubscription } from '@/hooks/use-subscription';
import { Video, Users, Clock, Calendar, Lock, MessageCircle, Star, Zap } from 'lucide-react';

export function ExpertOfficeHours() {
  const { /* subscription */ } = useSubscription();
  
  // Temporary - use a variable that can be both explorer and architect for comparison
  const currentTier = 'explorer' as string; // Type as string to allow comparison
  const isArchitect = currentTier === 'architect';

  // Mock data for expert sessions
  const expertSessions = [
    {
      id: '1',
      expertName: 'Dr. Sarah Chen',
      expertise: 'AI & Machine Learning',
      title: 'Building Production ML Systems',
      description: 'Learn how to design and deploy machine learning systems at scale. Q&A on MLOps best practices.',
      date: '2024-01-20',
      time: '14:00 EST',
      duration: '60 min',
      participants: 8,
      maxParticipants: 15,
      isLive: true,
      isUpcoming: true
    },
    {
      id: '2',
      expertName: 'James Rodriguez',
      expertise: 'Cloud Architecture',
      title: 'AWS Cost Optimization Strategies',
      description: 'Deep dive into reducing cloud costs while maintaining performance and scalability.',
      date: '2024-01-22',
      time: '11:00 EST',
      duration: '45 min',
      participants: 12,
      maxParticipants: 20,
      isLive: false,
      isUpcoming: true
    },
    {
      id: '3',
      expertName: 'Priya Patel',
      expertise: 'React & Frontend',
      title: 'Advanced React Patterns 2024',
      description: 'Explore the latest React patterns, performance optimization, and state management strategies.',
      date: '2024-01-25',
      time: '16:00 EST',
      duration: '75 min',
      participants: 5,
      maxParticipants: 25,
      isLive: false,
      isUpcoming: true
    }
  ];

  const handleJoinSession = (sessionId: string) => {
    console.log('Joining session:', sessionId);
    alert('Redirecting to live session...');
  };

  const handleRSVP = (sessionId: string) => {
    console.log('RSVP for session:', sessionId);
    alert('Successfully RSVPed!');
  };

  if (!isArchitect) {
    return (
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Lock className="h-6 w-6" />
            Expert Office Hours
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Architect Exclusive
            </Badge>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Live Q&A sessions with industry experts and mentors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Connect with Industry Experts
            </h3>
            <p className="text-purple-700 mb-6 max-w-md mx-auto">
              Get personalized guidance, career advice, and technical insights from seasoned professionals in live 1:1 and group sessions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Video className="h-4 w-4" />
                <span>Live Video Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <MessageCircle className="h-4 w-4" />
                <span>Direct Q&A</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Star className="h-4 w-4" />
                <span>Industry Leaders</span>
              </div>
            </div>

            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => window.location.href = '/pricing'}
              size="lg"
            >
              Upgrade to Architect for Access
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Users className="h-6 w-6" />
          Expert Office Hours
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        </CardTitle>
        <CardDescription className="text-green-700">
          Live Q&A sessions with industry experts - Your Architect benefit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-green-700">Upcoming Sessions</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-700">Experts Available</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">25</div>
            <div className="text-sm text-green-700">Total Sessions</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-green-700">Satisfaction Rate</div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-green-900 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Available Sessions
          </h3>
          
          {expertSessions.map((session) => (
            <Card key={session.id} className="border border-green-200 hover:border-green-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-green-900">{session.title}</h4>
                          {session.isLive && (
                            <Badge variant="destructive" className="bg-red-100 text-red-800">
                              Live Now
                            </Badge>
                          )}
                          {session.isUpcoming && !session.isLive && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-green-700 mb-2">{session.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-xs text-green-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{session.expertName} • {session.expertise}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{session.time} • {session.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{session.participants}/{session.maxParticipants} spots</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {session.isLive ? (
                      <Button 
                        className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                        onClick={() => handleJoinSession(session.id)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Live
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 whitespace-nowrap"
                        onClick={() => handleRSVP(session.id)}
                        disabled={session.participants >= session.maxParticipants}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {session.participants >= session.maxParticipants ? 'Full' : 'RSVP'}
                      </Button>
                    )}
                    
                    {session.participants < session.maxParticipants && session.isUpcoming && !session.isLive && (
                      <div className="text-xs text-green-600 text-center">
                        {session.maxParticipants - session.participants} spots left
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <Alert className="bg-blue-50 border-blue-200">
          <MessageCircle className="h-4 w-4" />
          <AlertDescription className="text-blue-700">
            <strong>Pro Tip:</strong> Prepare your questions in advance and review the expert's background 
            to make the most of your session time.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}