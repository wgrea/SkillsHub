// src/components/data-sourcing.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card,
} from '@/components/ui/card';
import { useAnalytics } from '../hooks/useAnalytics';
import { ExternalLink, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types for our data
type DataPartner = {
  id: string;
  name: string;
  logo: string;
  description: string;
  coverage: string[];
  dataQuality: number; // 1-5 scale
  lastUpdated: string;
  link: string;
};

const DataSourcing: React.FC = () => {
  const { track } = useAnalytics();
  const [isLoading, setIsLoading] = React.useState(true);
  const [partners, setPartners] = React.useState<DataPartner[]>([]);
  const [lastUpdated, setLastUpdated] = React.useState<string>('');

  // Simulate loading real data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockPartners: DataPartner[] = [
          {
            id: 'tech-alliance',
            name: 'Tech Alliance',
            logo: '/logos/tech-alliance.png',
            description: 'Leading organization for emerging tech standards and skill validation.',
            coverage: ['Web Development', 'Cloud Computing', 'AI/ML'],
            dataQuality: 5,
            lastUpdated: new Date().toISOString(),
            link: 'https://techalliance.org/data'
          },
          {
            id: 'skillnet',
            name: 'SkillNet Global',
            logo: '/logos/skillnet.png',
            description: 'Real-time job market data from 20+ countries.',
            coverage: ['Job Postings', 'Salary Data', 'Skill Demand'],
            dataQuality: 4,
            lastUpdated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            link: 'https://skillnet.global/api'
          },
          {
            id: 'oecd',
            name: 'OECD Skills',
            logo: '/logos/oecd.png',
            description: 'International skills data and policy analysis.',
            coverage: ['Global Trends', 'Education', 'Workforce'],
            dataQuality: 5,
            lastUpdated: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
            link: 'https://data.oecd.org/skills'
          }
        ];

        setPartners(mockPartners);
        setLastUpdated(new Date().toLocaleDateString());
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load partner data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePartnerClick = (partnerId: string) => {
    track('partner_link_click', { partner_id: partnerId });
  };

  const refreshData = () => {
    setIsLoading(true);
    // In a real app, this would trigger a data refresh
    setTimeout(() => setIsLoading(false), 1000);
  };

  const navigate = useNavigate();

  const renderQualityStars = (quality: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < quality ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-500">({quality}/5)</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Header Row with Back and Refresh */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Sourcing & Methodology</h1>
            <p className="text-gray-600 mt-2">
              Transparent, reliable skill data updated regularly from trusted sources
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={refreshData} disabled={isLoading}>
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          <span className="ml-2">Refresh Data</span>
        </Button>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Our Data Standards</h3>
              <div className="mt-2 text-sm text-gray-700">
                <p className="mb-3">
                  We combine multiple data sources to ensure accuracy and relevance. All data goes through:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cross-verification across sources</li>
                  <li>Statistical normalization</li>
                  <li>Expert review by our team</li>
                  <li>Automated quality checks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 flex items-center">
            <span>Last updated: {isLoading ? 'Loading...' : lastUpdated}</span>
            <Badge variant="outline" className="ml-2">
              {isLoading ? '...' : 'Live Updates'}
            </Badge>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <Card key={i}>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </Card>
            ))
          : partners.map(partner => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start space-x-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{partner.name}</h3>
                      {renderQualityStars(partner.dataQuality)}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 flex-grow">{partner.description}</p>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {partner.coverage.map(c => (
                        <Badge key={c} variant="secondary">
                          {c}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handlePartnerClick(partner.id)}
                      asChild
                    >
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Data Source
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
      </div>

      <Card className="mt-8">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Contribute to Our Data</h3>
          <p className="mt-2 text-sm text-gray-700">
            Are you a data provider or researcher? Help us improve our platform's accuracy.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button variant="default">Become a Data Partner</Button>
            <Button variant="outline">Submit Data Correction</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DataSourcing;