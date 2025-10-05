// src/data/skills-data.ts
import { Skill, SkillCategory, SkillLevel, CompleteSkill } from '@/types';
import { validateSkill } from '@/lib/data-validation';

/* Best order
Marketing 📢 – Growth strategies and user engagement

Business 💼 – Entrepreneurial and organizational concepts

*/

// Mock data for skills
const skills: Skill[] = [
  {
    id: '1',
    name: 'React',
    description: 'A JavaScript library for building user interfaces with a component-based architecture and efficient DOM updates.',
    category: 'frontend',
    popularityScore: 95,
    growthRate: 12,
    icon: '⚛️',
    color: '#61DAFB',
    level: 'intermediate',
    relatedSkills: ['JavaScript', 'Redux', 'TypeScript', 'Next.js'],
    source: {
      name: 'React Documentation',
      url: 'https://reactjs.org',
      description: 'Official React documentation and resources',
      lastUpdated: '2024-01-15'
    },
    demandScore: 92, // Ensure this property is present
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    },
    jobPostings: 15000,
    linkedInEndorsements: 500000, // Ensure this property is present
    certifications: [
      {
        name: 'Meta React Developer Certificate',
        provider: 'Meta',
        url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer'
      }
    ],
    metadata: {
      industryDemand: {
        score: 92,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 95,
        endorsements: 500000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 93,
      trendTag: 'trending'
    },
    // ✅ SIMPLE FIX: Add empty project ideas array
    projectIdeas: []
  },
  // Remaining ids sort of repeat but different texts
  {
    id: '2',
    name: 'TypeScript',
    description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    category: 'frontend',
    popularityScore: 92,
    growthRate: 18,
    icon: '🔷',
    color: '#3178C6',
    level: 'intermediate',
    relatedSkills: ['JavaScript', 'React', 'Node.js', 'Angular'],
    source: {
      name: 'TypeScript Documentation',
      url: 'https://www.typescriptlang.org',
      description: 'Official TypeScript documentation and guides',
      lastUpdated: '2024-01-10'
    },
    demandScore: 88,
    salaryRange: {
      min: 85000,
      max: 160000,
      currency: 'USD'
    },
    jobPostings: 12000,
    linkedInEndorsements: 400000,
    certifications: [
      {
        name: 'TypeScript Certification',
        provider: 'Microsoft',
        url: 'https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-typescript/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 88,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 92,
        endorsements: 400000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 90,
      trendTag: 'trending'
    }
  },
  {
    id: '3',
    name: 'GraphQL',
    description: 'A query language and runtime for APIs that enables flexible, efficient data fetching as an alternative to REST.',
    category: 'backend',
    popularityScore: 92,
    growthRate: 16,
    icon: '🔗',
    color: '#E10098',
    level: 'advanced',
    relatedSkills: ['Apollo Client', 'Relay', 'Subscriptions', 'Schema Stitching', 'Data Federation', 'GraphQL Security', 'Resolver Optimization', 'Caching Strategies'],
    source: {
      name: 'GraphQL Foundation',
      url: 'https://graphql.org/',
      description: 'Official documentation and resources for GraphQL development.',
      lastUpdated: '2025-06-01'
    },
    demandScore: 91,
    salaryRange: {
      min: 90000,
      max: 175000,
      currency: 'USD'
    },
    jobPostings: 14500,
    linkedInEndorsements: 380000,
    certifications: [
      {
        name: 'GraphQL Developer Certification',
        provider: 'Apollo GraphQL',
        url: 'https://www.apollographql.com/tutorials/'
      },
      {
        name: 'Full-Stack GraphQL Training',
        provider: 'Udacity',
        url: 'https://www.udacity.com/course/graphql-fullstack-nanodegree--nd9990'
      }
    ],
    metadata: {
      industryDemand: {
        score: 91,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-06-05'
      },
      userPopularity: {
        score: 91,
        endorsements: 380000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-07'
      },
      relevanceScore: 93,
      trendTag: 'rising'
    }
  },
    {
    id: '4',
    name: 'Node.js',
    description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for building scalable network applications.',
    category: 'backend',
    popularityScore: 89,
    growthRate: 11,
    icon: '🟢',
    color: '#339933',
    level: 'intermediate',
    relatedSkills: ['JavaScript', 'Express.js', 'MongoDB', 'API Development'],
    source: {
      name: 'Node.js Documentation',
      url: 'https://nodejs.org',
      description: 'Official Node.js documentation and resources',
      lastUpdated: '2024-01-11'
    },
    demandScore: 87,
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    },
    jobPostings: 11000,
    linkedInEndorsements: 450000,
    certifications: [
      {
        name: 'Node.js Application Developer',
        provider: 'OpenJS Foundation',
        url: 'https://training.linuxfoundation.org/certification/jsnad/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 87,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 89,
        endorsements: 450000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 88,
      trendTag: 'stable'
    }
  },
  {
    id: '5',
    name: 'API Design',
    description: 'The practice of structuring efficient and scalable API interactions, ensuring clarity, reliability, and ease of integration.',
    category: 'backend',
    popularityScore: 92,
    growthRate: 18,
    icon: '🔗',
    color: '#10B981',
    level: 'advanced',
    relatedSkills: ['RESTful APIs', 'GraphQL', 'Microservices Architecture', 'Authentication & Authorization', 'Rate Limiting', 'Schema Design', 'Error Handling', 'Caching Strategies'],
    source: {
        name: 'API Development Handbook',
        url: 'https://www.api-handbook.com/',
        description: 'Comprehensive guide on designing robust and scalable APIs.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 94,
    salaryRange: {
        min: 95000,
        max: 180000,
        currency: 'USD'
    },
    jobPostings: 18500,
    linkedInEndorsements: 520000,
    certifications: [
        {
            name: 'Certified API Designer',
            provider: 'Postman',
            url: 'https://www.postman.com/certifications/api-design'
        },
        {
            name: 'Advanced API Development Certification',
            provider: 'Google Cloud',
            url: 'https://cloud.google.com/api-development/certification'
        }
    ],
    metadata: {
        industryDemand: {
            score: 94,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 94,
            endorsements: 520000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 95,
        trendTag: 'high-demand'
    }
  },
  {
    id: '6',
    name: 'Software Architecture',
    description: 'The discipline of designing scalable, modular, and maintainable software systems, ensuring robustness and efficiency in complex applications.',
    category: 'backend',
    popularityScore: 94,
    growthRate: 21,
    icon: '🏗️',
    color: '#6D28D9',
    level: 'advanced',
    relatedSkills: ['Microservices Architecture', 'Domain-Driven Design (DDD)', 'Event-Driven Systems', 'Scalability Patterns', 'Software Design Principles (SOLID, DRY, KISS)', 'Enterprise Architecture', 'Containerization Strategies', 'Fault Tolerance & Resilience'],
    source: {
        name: 'Software Architecture Patterns Handbook',
        url: 'https://www.softwarearchitecturehandbook.com/',
        description: 'In-depth resource on designing robust and scalable software systems.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 97,
    salaryRange: {
        min: 110000,
        max: 200000,
        currency: 'USD'
    },
    jobPostings: 22500,
    linkedInEndorsements: 530000,
    certifications: [
        {
            name: 'Certified Software Architect',
            provider: 'The Open Group',
            url: 'https://www.opengroup.org/certifications/software-architecture'
        },
        {
            name: 'AWS Certified Solutions Architect',
            provider: 'Amazon AWS',
            url: 'https://aws.amazon.com/certification/certified-solutions-architect'
        }
    ],
    metadata: {
        industryDemand: {
            score: 97,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 97,
            endorsements: 530000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 98,
        trendTag: 'high-demand'
    }
  },
  {
    id: '7',
    name: 'System Optimization',
    description: 'The practice of enhancing system performance through efficient resource management, caching strategies, and storage optimization for scalable applications.',
    category: 'backend',
    popularityScore: 89,
    growthRate: 17,
    icon: '⚡',
    color: '#F97316',
    level: 'advanced',
    relatedSkills: ['Memory Management', 'Asset Caching', 'Performance Profiling', 'Database Index Optimization', 'Concurrency Handling', 'Compression Techniques', 'Load Balancing', 'Latency Reduction'],
    source: {
        name: 'Performance Optimization Handbook',
        url: 'https://www.performanceoptimizationguide.com/',
        description: 'Comprehensive guide on system efficiency and performance tuning.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 92,
    salaryRange: {
        min: 95000,
        max: 175000,
        currency: 'USD'
    },
    jobPostings: 17000,
    linkedInEndorsements: 450000,
    certifications: [
        {
            name: 'Performance Optimization Specialist',
            provider: 'Google Cloud',
            url: 'https://cloud.google.com/performance-optimization/certification'
        },
        {
            name: 'Certified System Performance Engineer',
            provider: 'The Linux Foundation',
            url: 'https://training.linuxfoundation.org/certification/system-performance-engineer'
        }
    ],
    metadata: {
        industryDemand: {
            score: 92,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 92,
            endorsements: 450000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 93,
        trendTag: 'high-demand'
    }
  },
{
    id: '8',
    name: 'API Integration',
    description: 'The process of seamlessly connecting multiple APIs to enable efficient communication between services, ensuring reliability and scalability.',
    category: 'backend',
    popularityScore: 91,
    growthRate: 18,
    icon: '🔗',
    color: '#2563EB',
    level: 'advanced',
    relatedSkills: [
        'RESTful API Implementation',
        'GraphQL Integration',
        'OAuth & Authentication Strategies',
        'Webhook Processing',
        'Data Transformation & Parsing',
        'Error Handling & Retry Mechanisms',
        'Rate Limiting & API Security',
        'Third-Party API Connections'
    ],
    source: {
        name: 'API Integration Best Practices Guide',
        url: 'https://www.apiintegrationguide.com/',
        description: 'Comprehensive guide on implementing seamless API connections.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 94,
    salaryRange: {
        min: 95000,
        max: 180000,
        currency: 'USD'
    },
    jobPostings: 19500,
    linkedInEndorsements: 480000,
    certifications: [
        {
            name: 'Certified API Specialist',
            provider: 'API Academy',
            url: 'https://www.apiacademy.com/certifications/api-specialist'
        },
        {
            name: 'Google Cloud API Engineer',
            provider: 'Google Cloud',
            url: 'https://cloud.google.com/certification/api-engineer'
        }
    ],
    metadata: {
        industryDemand: {
            score: 94,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 94,
            endorsements: 480000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 96,
        trendTag: 'high-growth'
    }
  },
  {
    id: '9',
    name: 'Zod Validation',
    description: 'A schema-based approach to validating and parsing structured data, ensuring type safety and consistency.',
    category: 'backend',
    popularityScore: 78,
    growthRate: 8,
    icon: '📝',
    color: '#8E44AD',
    level: 'advanced',
    relatedSkills: ['TypeScript', 'Validation', 'Data Integrity', 'Schema Design'],
    source: {
      name: 'Zod Documentation',
      url: 'https://zod.dev',
      description: 'Official documentation for Zod schema validation',
      lastUpdated: '2025-06-01'
    },
    demandScore: 76,
    salaryRange: {
      min: 85000,
      max: 160000,
      currency: 'USD'
    },
    jobPostings: 3500,
    linkedInEndorsements: 250000,
    certifications: [
      {
        name: 'Advanced TypeScript and Zod',
        provider: 'Udemy',
        url: 'https://www.udemy.com/course/advanced-typescript-zod/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 76,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 78,
        endorsements: 250000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 79,
      trendTag: 'rising'
    }
  },
  {
    id: '10',
    name: 'Cloud Computing',
    description: 'The delivery of computing services over the internet, providing faster innovation and flexible resources.',
    category: 'cloud',
    popularityScore: 94,
    growthRate: 15,
    icon: '☁️',
    color: '#0288D1',
    level: 'intermediate',
    relatedSkills: ['AWS', 'Azure', 'Google Cloud', 'DevOps'],
    source: {
      name: 'AWS Training',
      url: 'https://aws.amazon.com/training/',
      description: 'Cloud computing training and certification',
      lastUpdated: '2024-01-13'
    },
    demandScore: 93,
    salaryRange: {
      min: 85000,
      max: 170000,
      currency: 'USD'
    },
    jobPostings: 14000,
    linkedInEndorsements: 350000,
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        provider: 'Amazon Web Services',
        url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 93,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 94,
        endorsements: 350000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 93,
      trendTag: 'trending'
    }
  },
  {
    id: '11',
    name: 'DevOps & CI/CD',
    description: 'The practice of combining software development and IT operations to enhance efficiency, accelerate deployments, and improve software reliability through automation.',
    category: 'devops',
    popularityScore: 94,
    growthRate: 17,
    icon: '⚙️',
    color: '#FF9800',
    level: 'advanced',
    relatedSkills: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'Azure DevOps', 'CI/CD Pipelines', 'Cloud Infrastructure'],
    source: {
      name: 'Google Cloud DevOps Research & Assessment',
      url: 'https://cloud.google.com/devops/',
      description: 'Industry-leading research on DevOps practices, automation, and productivity.',
      lastUpdated: '2025-05-15'
    },
    demandScore: 94,
    salaryRange: {
      min: 95000,
      max: 185000,
      currency: 'USD'
    },
    jobPostings: 17000,
    linkedInEndorsements: 450000,
    certifications: [
      {
        name: 'AWS Certified DevOps Engineer',
        provider: 'Amazon Web Services',
        url: 'https://aws.amazon.com/certification/certified-devops-engineer-professional/'
      },
      {
        name: 'Microsoft Certified: DevOps Engineer Expert',
        provider: 'Microsoft',
        url: 'https://learn.microsoft.com/en-us/certifications/devops-engineer/'
      },
      {
        name: 'Certified Kubernetes Administrator (CKA)',
        provider: 'Cloud Native Computing Foundation',
        url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 94,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-06-01'
      },
      userPopularity: {
        score: 94,
        endorsements: 450000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-05'
      },
      relevanceScore: 95,
      trendTag: 'critical'
    }
  },
  {
    id: '12',
    name: 'Testing & Validation',
    description: 'The practice of verifying software functionality, reliability, and performance through structured debugging, automated workflows, and validation techniques.',
    category: 'devops',
    popularityScore: 91,
    growthRate: 20,
    icon: '✅',
    color: '#22C55E',
    level: 'advanced',
    relatedSkills: ['Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Schema Validation', 'Jest', 'Cypress', 'Playwright', 'CI/CD Testing Automation'],
    source: {
        name: 'Software Testing Handbook',
        url: 'https://www.softwaretestinghandbook.com/',
        description: 'Comprehensive guide on testing strategies and validation techniques.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 94,
    salaryRange: {
        min: 97000,
        max: 175000,
        currency: 'USD'
    },
    jobPostings: 19200,
    linkedInEndorsements: 490000,
    certifications: [
        {
            name: 'ISTQB Certified Tester',
            provider: 'International Software Testing Qualifications Board',
            url: 'https://www.istqb.org/certifications'
        },
        {
            name: 'Certified Cypress Automation Tester',
            provider: 'Cypress.io',
            url: 'https://www.cypress.io/certifications'
        }
    ],
    metadata: {
        industryDemand: {
            score: 94,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 94,
            endorsements: 490000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 96,
        trendTag: 'high-demand'
    }
  },
  {
    id: '13',
    name: "Web Performance & Scalability Optimization",
    description: "**Optimizing frontend and backend performance** through techniques like **code splitting, CDN caching, and load balancing**, with **DevOps integration** (CI/CD pipelines, monitoring) for scalable dashboards and API-first applications.",
    category: "devops",
    popularityScore: 90,
    growthRate: 15,
    icon: "⚡",
    color: "#FFC107",
    level: "intermediate",
    relatedSkills: [
      "**Load Balancing** (NGINX, Kubernetes)", 
      "**Caching Strategies** (Redis, Varnish)", 
      "**Lighthouse Metrics**", 
      "**CI/CD Pipelines**"
    ],
    source: {
      name: "Google Web Fundamentals",
      url: "https://web.dev/performance",
      description: "Modern performance optimization guides",
      lastUpdated: "2025-04-10"
    },
    demandScore: 94,
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: "USD"
    },
    jobPostings: 12000,
    linkedInEndorsements: 320000,
    certifications: [
      {
        name: "**Performance Optimization Professional**",
        provider: "Google Developers",
        url: "https://web.dev/certification/"
      },
      {
        name: "**AWS Certified Advanced Networking**",
        provider: "Amazon Web Services",
        url: "https://aws.amazon.com/certification/"
      }
    ],
    metadata: {
      industryDemand: {
        score: 96,
        source: "LinkedIn Job Analytics",
        url: "https://www.linkedin.com/jobs/",
        lastUpdated: "2025-05-20"
      },
      userPopularity: {
        score: 92,
        endorsements: 380000,
        surveySource: "State of DevOps Report",
        lastUpdated: "2025-06-01"
      },
      relevanceScore: 95,
      trendTag: "surging"
    }
  },
  {
      id: '14',
      name: 'Cybersecurity',
      description: 'The practice of protecting systems, networks, and data from cyber threats through security principles, ethical hacking, and defensive strategies.',
      category: 'security',
      popularityScore: 96,
      growthRate: 19,
      icon: '🔐',
      color: '#00796B',
      level: 'advanced',
      relatedSkills: ['OWASP Security Principles', 'Ethical Hacking', 'Network Security', 'Penetration Testing', 'Zero Trust Architecture', 'Threat Intelligence', 'Encryption Standards', 'Incident Response'],
      source: {
        name: 'OWASP Security Guidelines',
        url: 'https://owasp.org/www-project-top-ten/',
        description: 'A globally recognized standard for web application security risks and best practices.',
        lastUpdated: '2025-05-20'
      },
      demandScore: 97,
      salaryRange: {
        min: 105000,
        max: 195000,
        currency: 'USD'
      },
      jobPostings: 18500,
      linkedInEndorsements: 500000,
      certifications: [
        {
          name: 'Certified Ethical Hacker (CEH)',
          provider: 'EC-Council',
          url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/'
        },
        {
          name: 'CompTIA Security+',
          provider: 'CompTIA',
          url: 'https://www.comptia.org/certifications/security'
        },
        {
          name: 'Certified Information Systems Security Professional (CISSP)',
          provider: '(ISC)²',
          url: 'https://www.isc2.org/certifications/cissp'
        }
      ],
      metadata: {
        industryDemand: {
          score: 97,
          source: 'LinkedIn Job Analytics',
          url: 'https://www.linkedin.com/jobs/',
          lastUpdated: '2025-06-01'
        },
        userPopularity: {
          score: 97,
          endorsements: 500000,
          surveySource: 'Developer Community Polls',
          lastUpdated: '2025-06-05'
        },
        relevanceScore: 96,
        trendTag: 'critical'
      }
  },
  {
    id: '15',
    name: "API Security & Authentication",
    description: "Implementing robust security for APIs and applications via OAuth2, JWT, and mutual TLS (mTLS), with a focus on **zero-trust architecture** for IoT, microservices, and scalable dashboards.",
    category: 'security',
    popularityScore: 91,
    growthRate: 18,
    icon: "🔐",
    color: "#9C27B0",
    level: "intermediate",
    relatedSkills: [
      "OAuth2/OpenID Connect", 
      "JWT Validation", 
      "Rate Limiting", 
      "**IoT Security** (MQTT+SSL)", 
      "**API Gateway Policies**"
    ],
    source: {
      name: "OWASP API Security Top 10",
      url: "https://owasp.org/www-project-api-security/",
      description: "Industry-standard API security guidelines",
      lastUpdated: "2025-02-28"
    },
    demandScore: 95,
    salaryRange: {
      min: 90000,
      max: 160000,
      currency: "USD"
    },
    jobPostings: 11000,
    linkedInEndorsements: 210000,
    certifications: [
      {
        name: "Certified API Security Professional (CASP)",
        provider: "OWASP",
        url: "https://owasp.org/www-training/"
      },
      {
        name: "AWS Certified Security – Specialty",
        provider: "Amazon Web Services",
        url: "https://aws.amazon.com/certification/"
      }
    ],
    metadata: {
      industryDemand: {
        score: 97,
        source: "Gartner Cybersecurity Report",
        url: "https://www.gartner.com/en",
        lastUpdated: "2025-05-20"
      },
      userPopularity: {
        score: 88,
        endorsements: 190000,
        surveySource: "Stack Overflow Developer Survey",
        lastUpdated: "2025-06-01"
      },
      relevanceScore: 96,
      trendTag: "surging"
    }
  },
  {
    id: '16',
    name: 'Data Analysis',
    description: 'The process of inspecting, cleaning, transforming, and modeling data to discover useful information and support decision-making.',
    category: 'data',
    popularityScore: 90,
    growthRate: 14,
    icon: '📊',
    color: '#4CAF50',
    level: 'intermediate',
    relatedSkills: ['SQL', 'Python', 'R', 'Tableau', 'Excel'],
    source: {
      name: 'Kaggle',
      url: 'https://www.kaggle.com',
      description: 'Data science and machine learning community',
      lastUpdated: '2024-01-08'
    },
    demandScore: 89,
    salaryRange: {
      min: 70000,
      max: 130000,
      currency: 'USD'
    },
    jobPostings: 10000,
    linkedInEndorsements: 350000,
    certifications: [
      {
        name: 'Google Data Analytics Certificate',
        provider: 'Google',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics'
      }
    ],
    metadata: {
      industryDemand: {
        score: 89,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 90,
        endorsements: 350000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 89,
      trendTag: 'stable'
    }
  },
  {
    id: '17',
    name: 'SQL',
    description: 'A domain-specific language for managing and querying relational databases.',
    category: 'data',
    popularityScore: 87,
    growthRate: 7,
    icon: '🗃️',
    color: '#E65100',
    level: 'intermediate',
    relatedSkills: ['Database Design', 'PostgreSQL', 'MySQL', 'Data Analysis'],
    source: {
      name: 'W3Schools SQL',
      url: 'https://www.w3schools.com/sql/',
      description: 'Comprehensive SQL tutorials and references',
      lastUpdated: '2024-01-07'
    },
    demandScore: 85,
    salaryRange: {
      min: 70000,
      max: 140000,
      currency: 'USD'
    },
    jobPostings: 13000,
    linkedInEndorsements: 500000,
    certifications: [
      {
        name: 'Oracle Database SQL Certified Associate',
        provider: 'Oracle',
        url: 'https://education.oracle.com/oracle-database-sql-certified-associate'
      }
    ],
    metadata: {
      industryDemand: {
        score: 85,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 87,
        endorsements: 500000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 86,
      trendTag: 'stable'
    }
  },
  {
    id: '18',
    name: 'Data Engineering',
    description: 'The discipline of designing and optimizing data pipelines, ensuring efficient preprocessing, transformation, and large-scale dataset handling for analytics and machine learning applications.',
    category: 'data',
    popularityScore: 90,
    growthRate: 22,
    icon: '📊',
    color: '#3B82F6',
    level: 'advanced',
    relatedSkills: ['ETL Processes', 'Data Warehousing', 'Apache Spark', 'Data Pipeline Optimization', 'SQL Performance Tuning', 'Streaming Data Processing', 'Schema Design', 'Cloud Data Storage'],
    source: {
        name: 'Data Engineering Handbook',
        url: 'https://www.dataengineeringhandbook.com/',
        description: 'Comprehensive guide on scalable and efficient data pipeline development.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 96,
    salaryRange: {
        min: 105000,
        max: 190000,
        currency: 'USD'
    },
    jobPostings: 21000,
    linkedInEndorsements: 470000,
    certifications: [
        {
            name: 'Google Cloud Data Engineer Certification',
            provider: 'Google Cloud',
            url: 'https://cloud.google.com/data-engineering/certification'
        },
        {
            name: 'Microsoft Certified: Azure Data Engineer Associate',
            provider: 'Microsoft',
            url: 'https://learn.microsoft.com/en-us/certifications/azure-data-engineer'
        }
    ],
    metadata: {
        industryDemand: {
            score: 96,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 96,
            endorsements: 470000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 97,
        trendTag: 'high-demand'
    }
  },
  {
    id: '19',
    name: 'Database Management',
    description: 'The practice of organizing, optimizing, and maintaining structured data storage, ensuring efficiency, integrity, and scalability in database systems.',
    category: 'data',
    popularityScore: 93,
    growthRate: 19,
    icon: '🗄️',
    color: '#FACC15',
    level: 'advanced',
    relatedSkills: ['SQL Performance Optimization', 'Indexing Strategies', 'Replication & Sharding', 'Backup & Recovery', 'ACID Compliance', 'NoSQL & SQL Hybrid Approaches', 'Schema Normalization', 'Query Caching'],
    source: {
        name: 'Database Management Essentials',
        url: 'https://www.databasemanagementguide.com/',
        description: 'Comprehensive resource on database optimization and maintenance.',
        lastUpdated: '2025-06-10'
    },
    demandScore: 95,
    salaryRange: {
        min: 98000,
        max: 185000,
        currency: 'USD'
    },
    jobPostings: 19500,
    linkedInEndorsements: 500000,
    certifications: [
        {
            name: 'Oracle Database Administrator Certification',
            provider: 'Oracle',
            url: 'https://www.oracle.com/database/training-and-certification'
        },
        {
            name: 'Microsoft Certified: Azure Database Administrator Associate',
            provider: 'Microsoft',
            url: 'https://learn.microsoft.com/en-us/certifications/azure-database-administrator'
        }
    ],
    metadata: {
        industryDemand: {
            score: 95,
            source: 'LinkedIn Job Analytics',
            url: 'https://www.linkedin.com/jobs/',
            lastUpdated: '2025-06-11'
        },
        userPopularity: {
            score: 95,
            endorsements: 500000,
            surveySource: 'Developer Community Polls',
            lastUpdated: '2025-06-12'
        },
        relevanceScore: 96,
        trendTag: 'high-demand'
    }
  },
  {
    id: '20',
    name: 'Data Visualization',
    description: 'The practice of representing data graphically to enhance comprehension, analysis, and decision-making.',
    category: 'data',
    popularityScore: 83,
    growthRate: 7,
    icon: '📊',
    color: '#4CAF50',
    level: 'advanced',
    relatedSkills: ['D3.js', 'Recharts', 'Tableau', 'Data Storytelling'],
    source: {
      name: 'Data Visualization Society',
      url: 'https://www.datavisualizationsociety.org',
      description: 'Community for data visualization professionals and enthusiasts',
      lastUpdated: '2025-06-01'
    },
    demandScore: 81,
    salaryRange: {
      min: 80000,
      max: 150000,
      currency: 'USD'
    },
    jobPostings: 5000,
    linkedInEndorsements: 350000,
    certifications: [
      {
        name: 'Data Visualization with D3.js',
        provider: 'Udacity',
        url: 'https://www.udacity.com/course/data-visualization-d3js'
      }
    ],
    metadata: {
      industryDemand: {
        score: 81,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 83,
        endorsements: 350000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 82,
      trendTag: 'steady'
    }
  },
  {
    id: '21',
    name: 'Python',
    description: 'A high-level, interpreted programming language known for its readability and versatility across many domains.',
    category: 'scripting',
    popularityScore: 96,
    growthRate: 10,
    icon: '🐍',
    color: '#3776AB',
    level: 'beginner',
    relatedSkills: ['Django', 'Flask', 'Data Science', 'Machine Learning'],
    source: {
      name: 'Python Documentation',
      url: 'https://www.python.org',
      description: 'Official Python documentation and resources',
      lastUpdated: '2024-01-12'
    },
    demandScore: 94,
    salaryRange: {
      min: 75000,
      max: 145000,
      currency: 'USD'
    },
    jobPostings: 20000,
    linkedInEndorsements: 600000,
    certifications: [
      {
        name: 'Python Institute PCEP',
        provider: 'Python Institute',
        url: 'https://pythoninstitute.org/pcep'
      }
    ],
    metadata: {
      industryDemand: {
        score: 94,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 96,
        endorsements: 600000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 95,
      trendTag: 'trending'
    }
  },
  {
    id: '22',
    name: 'Embedded Systems Programming',
    description: 'Programming for dedicated hardware systems with constrained resources, focusing on efficiency, real-time execution, and direct hardware interaction.',
    category: 'embedded',
    popularityScore: 88,
    growthRate: 14,
    icon: '🔧',
    color: '#1565C0',
    level: 'advanced',
    relatedSkills: ['C/C++', 'Assembly Language', 'RTOS', 'Microcontroller Programming', 'Firmware Development', 'Hardware Abstraction Layer', 'Embedded Linux', 'Memory Optimization'],
    source: {
      name: 'Embedded Systems Handbook',
      url: 'https://www.embedded.com/',
      description: 'Industry insights, best practices, and advanced techniques for embedded development.',
      lastUpdated: '2025-06-08'
    },
    demandScore: 86,
    salaryRange: {
      min: 95000,
      max: 170000,
      currency: 'USD'
    },
    jobPostings: 11000,
    linkedInEndorsements: 290000,
    certifications: [
      {
        name: 'Certified Embedded Systems Engineer',
        provider: 'IEEE',
        url: 'https://www.ieee.org/certifications/embedded-systems.html'
      },
      {
        name: 'ARM Embedded Systems Certification',
        provider: 'ARM',
        url: 'https://www.arm.com/resources/training/embedded-systems'
      }
    ],
    metadata: {
      industryDemand: {
        score: 86,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-06-09'
      },
      userPopularity: {
        score: 86,
        endorsements: 290000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-10'
      },
      relevanceScore: 89,
      trendTag: 'steady'
    }
  },
  {
    id: '23',
    name: 'Machine Learning',
    description: 'A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
    category: 'ai',
    popularityScore: 93,
    growthRate: 20,
    icon: '🤖',
    color: '#9C27B0',
    level: 'advanced',
    relatedSkills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
    source: {
      name: 'Machine Learning Mastery',
      url: 'https://machinelearningmastery.com',
      description: 'Comprehensive machine learning resources',
      lastUpdated: '2024-01-14'
    },
    demandScore: 91,
    salaryRange: {
      min: 90000,
      max: 180000,
      currency: 'USD'
    },
    jobPostings: 9000,
    linkedInEndorsements: 200000,
    certifications: [
      {
        name: 'TensorFlow Developer Certificate',
        provider: 'Google',
        url: 'https://www.tensorflow.org/certificate'
      }
    ],
    metadata: {
      industryDemand: {
        score: 91,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 93,
        endorsements: 200000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 92,
      trendTag: 'trending'
    }
  },
  {
    id: '24',
    name: 'Prompt Engineering',
    description: 'The art of designing effective prompts to optimize AI model responses, enhancing clarity, precision, and contextual relevance.',
    category: 'ai',
    popularityScore: 95,
    growthRate: 22,
    icon: '📝',
    color: '#8B5CF6',
    level: 'advanced',
    relatedSkills: ['Natural Language Processing', 'Context Optimization', 'Token Efficiency', 'Fine-Tuning Models', 'Chain-of-Thought Prompting', 'Zero-Shot & Few-Shot Learning', 'Conversational Design'],
    source: {
      name: 'AI Prompt Engineering Guide',
      url: 'https://www.promptingguide.ai/',
      description: 'Comprehensive best practices for crafting prompts that maximize AI effectiveness.',
      lastUpdated: '2025-06-10'
    },
    demandScore: 96,
    salaryRange: {
      min: 100000,
      max: 190000,
      currency: 'USD'
    },
    jobPostings: 21000,
    linkedInEndorsements: 550000,
    certifications: [
      {
        name: 'Certified Prompt Engineer',
        provider: 'OpenAI',
        url: 'https://openai.com/certifications/prompt-engineering'
      },
      {
        name: 'AI Conversational Design Certification',
        provider: 'Google',
        url: 'https://developers.google.com/assistant/certifications'
      }
    ],
    metadata: {
      industryDemand: {
        score: 96,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-06-11'
      },
      userPopularity: {
        score: 96,
        endorsements: 550000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-12'
      },
      relevanceScore: 97,
      trendTag: 'critical'
    }
  },
  {
    id: '25',
    name: 'Natural Language Processing (NLP)',
    description: 'The field of AI focused on enabling computers to understand, interpret, and generate human language.',
    category: 'ai',
    popularityScore: 85,
    growthRate: 9,
    icon: '🗣️',
    color: '#FF5722',
    level: 'advanced',
    relatedSkills: ['Machine Learning', 'Text Analysis', 'Sentiment Analysis', 'Tokenization'],
    source: {
      name: 'Stanford NLP Group',
      url: 'https://nlp.stanford.edu',
      description: 'Research and resources on NLP advancements',
      lastUpdated: '2025-06-01'
    },
    demandScore: 84,
    salaryRange: {
      min: 90000,
      max: 180000,
      currency: 'USD'
    },
    jobPostings: 7500,
    linkedInEndorsements: 500000,
    certifications: [
      {
        name: 'Deep Learning Specialization (NLP)',
        provider: 'Coursera',
        url: 'https://www.coursera.org/specializations/deep-learning'
      }
    ],
    metadata: {
      industryDemand: {
        score: 84,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 85,
        endorsements: 500000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 86,
      trendTag: 'high-demand'
    }
  },
  {
    id: '26',
    name: 'UI/UX Design',
    description: 'The process of creating user interfaces and experiences that are intuitive, accessible, and enjoyable to use.',
    category: 'design',
    popularityScore: 88,
    growthRate: 15,
    icon: '🎨',
    color: '#FF7262',
    level: 'intermediate',
    relatedSkills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'],
    source: {
      name: 'Nielsen Norman Group',
      url: 'https://www.nngroup.com',
      description: 'Leading UX research and consulting firm',
      lastUpdated: '2024-01-05'
    },
    demandScore: 85,
    salaryRange: {
      min: 70000,
      max: 140000,
      currency: 'USD'
    },
    jobPostings: 8000,
    linkedInEndorsements: 300000,
    certifications: [
      {
        name: 'Google UX Design Certificate',
        provider: 'Google',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design'
      }
    ],
    metadata: {
      industryDemand: {
        score: 85,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 88,
        endorsements: 300000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 87,
      trendTag: 'stable'
    }
  },
  {
    id: '27',
    name: 'Figma',
    description: 'A collaborative interface design tool that makes design accessible to everyone in the product development process.',
    category: 'design',
    popularityScore: 91,
    growthRate: 16,
    icon: '🖌️',
    color: '#F24E1E',
    level: 'beginner',
    relatedSkills: ['UI Design', 'Prototyping', 'Design Systems', 'Collaboration'],
    source: {
      name: 'Figma Help Center',
      url: 'https://help.figma.com',
      description: 'Official Figma documentation and tutorials',
      lastUpdated: '2024-01-09'
    },
    demandScore: 86,
    salaryRange: {
      min: 65000,
      max: 130000,
      currency: 'USD'
    },
    jobPostings: 5000,
    linkedInEndorsements: 200000,
    certifications: [
      {
        name: 'Figma Professional Design Certificate',
        provider: 'Figma',
        url: 'https://www.figma.com/resources/learn-design/'
      }
    ],
    metadata: {
      industryDemand: {
        score: 86,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 91,
        endorsements: 200000,
        surveySource: 'Designer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 88,
      trendTag: 'trending'
    }
  },
  {
    id: '28',
    name: 'Project Management',
    description: 'The practice of leading teams and projects to achieve specific goals within defined constraints.',
    category: 'business',
    popularityScore: 82,
    growthRate: 6,
    icon: '📋',
    color: '#2196F3',
    level: 'intermediate',
    relatedSkills: ['Agile', 'Scrum', 'Kanban', 'Leadership'],
    source: {
      name: 'Project Management Institute',
      url: 'https://www.pmi.org',
      description: 'Global project management organization',
      lastUpdated: '2024-01-02'
    },
    demandScore: 80,
    salaryRange: {
      min: 65000,
      max: 140000,
      currency: 'USD'
    },
    jobPostings: 6000,
    linkedInEndorsements: 400000,
    certifications: [
      {
        name: 'Project Management Professional (PMP)',
        provider: 'PMI',
        url: 'https://www.pmi.org/certifications/project-management-pmp'
      }
    ],
    metadata: {
      industryDemand: {
        score: 80,
        source: 'LinkedIn Job Analytics',
        url: 'https://www.linkedin.com/jobs/',
        lastUpdated: '2025-05-20'
      },
      userPopularity: {
        score: 82,
        endorsements: 400000,
        surveySource: 'Developer Community Polls',
        lastUpdated: '2025-06-01'
      },
      relevanceScore: 81,
      trendTag: 'stable'
    }
  },
   // Game Development Skills
  {
    id: '29',
    name: 'Unity',
    description: 'A cross-platform game engine used to create video games for PC, consoles, mobile devices, and websites.',
    category: 'gamedev',
    popularityScore: 89,
    growthRate: 13,
    icon: '🎮',
    color: '#000000',
    level: 'intermediate',
    relatedSkills: ['C#', 'Game Design', '3D Modeling', 'Animation'],
    source: {
      name: 'Unity Learn',
      url: 'https://learn.unity.com',
      description: 'Official Unity learning platform',
      lastUpdated: '2024-01-16'
    },
    demandScore: 84,
    salaryRange: {
      min: 70000,
      max: 140000,
      currency: 'USD'
    },
    jobPostings: 4500,
    linkedInEndorsements: 180000,
    certifications: [
      {
        name: 'Unity Certified Developer',
        provider: 'Unity Technologies',
        url: 'https://unity.com/products/unity-certifications'
      }
    ]
  },
  {
    id: '30',
    name: 'Unreal Engine',
    description: 'A powerful game engine developed by Epic Games, known for creating high-quality 3D games and experiences.',
    category: 'gamedev',
    popularityScore: 86,
    growthRate: 17,
    icon: '🚀',
    color: '#0E1128',
    level: 'advanced',
    relatedSkills: ['C++', 'Blueprint', '3D Graphics', 'VR/AR'],
    source: {
      name: 'Unreal Engine Documentation',
      url: 'https://docs.unrealengine.com',
      description: 'Official Unreal Engine documentation',
      lastUpdated: '2024-01-14'
    },
    demandScore: 82,
    salaryRange: {
      min: 75000,
      max: 160000,
      currency: 'USD'
    },
    jobPostings: 3200,
    linkedInEndorsements: 120000,
    certifications: [
      {
        name: 'Unreal Engine Certified Developer',
        provider: 'Epic Games',
        url: 'https://www.unrealengine.com/en-US/onlinelearning-courses'
      }
    ]
  },
  {
    id: '31',
    name: 'Game Design',
    description: 'The art of applying design and aesthetics to create a game for entertainment or educational purposes.',
    category: 'gamedev',
    popularityScore: 78,
    growthRate: 11,
    icon: '🎯',
    color: '#FF6B35',
    level: 'intermediate',
    relatedSkills: ['Level Design', 'Storytelling', 'User Experience', 'Psychology'],
    source: {
      name: 'Game Design Workshop',
      url: 'https://www.gamedesignworkshop.com',
      description: 'Comprehensive game design resources',
      lastUpdated: '2024-01-12'
    },
    demandScore: 76,
    salaryRange: {
      min: 60000,
      max: 130000,
      currency: 'USD'
    },
    jobPostings: 2800,
    linkedInEndorsements: 95000,
    certifications: [
      {
        name: 'Game Design Certificate',
        provider: 'CGMA',
        url: 'https://www.cgmasteracademy.com/courses/game-design'
      }
    ]
  },
  {
    id: '32',
    name: 'C# for Games',
    description: 'A versatile programming language widely used in game development, especially with Unity engine.',
    category: 'gamedev',
    popularityScore: 85,
    growthRate: 9,
    icon: '🔷',
    color: '#239120',
    level: 'intermediate',
    relatedSkills: ['Unity', '.NET', 'Object-Oriented Programming', 'Debugging'],
    source: {
      name: 'Microsoft C# Documentation',
      url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
      description: 'Official C# documentation from Microsoft',
      lastUpdated: '2024-01-15'
    },
    demandScore: 83,
    salaryRange: {
      min: 72000,
      max: 145000,
      currency: 'USD'
    },
    jobPostings: 5200,
    linkedInEndorsements: 220000,
    certifications: [
      {
        name: 'Microsoft Certified: C# Developer',
        provider: 'Microsoft',
        url: 'https://docs.microsoft.com/en-us/learn/certifications/'
      }
    ]
  }
];
export { skills }

export function getSkillById(id: string): Skill | undefined {
  return skills.find(skill => skill.id === id);
}

// Utility to fill defaults for SkillMetadata
function completeSkillMetadata(metadata?: Partial<Skill['metadata']>): Required<Skill['metadata']> {
  return {
    industryDemand: metadata?.industryDemand ?? {
      score: 0,
      source: 'Unknown',
      url: '',
      lastUpdated: new Date().toISOString()
    },
    userPopularity: metadata?.userPopularity ?? {
      score: 0,
      endorsements: 0,
      surveySource: 'Unknown',
      lastUpdated: new Date().toISOString()
    },
    relevanceScore: metadata?.relevanceScore ?? 0,
    trendTag: metadata?.trendTag ?? 'stable'
  };
}


// Add the missing completeSkill function
function completeSkill(skill: Partial<Skill> & { id: string; name: string }): CompleteSkill {
  return {
    ...skill,
    description: skill.description ?? '',
    category: skill.category ?? 'programming',
    // ... all other required fields with defaults
    metadata: completeSkillMetadata(skill.metadata)
  } as CompleteSkill;
}

export function getValidatedSkillById(id: string): CompleteSkill | null {
  const skill = getSkillById(id);
  if (!skill || !validateSkill(skill)) return null;
  return completeSkill(skill);
}

export function getTopSkills(limit: number = 5, category?: SkillCategory): Skill[] {
  const filtered = category 
    ? skills.filter(s => s.category === category)
    : [...skills];
    
  return filtered
    .sort((a, b) => (b.metadata?.industryDemand?.score || 0) - (a.metadata?.industryDemand?.score || 0))
    .slice(0, limit);
}

export function getTrendingSkills(): Skill[] {
  return skills.filter(s => 
    s.metadata?.trendTag === 'trending' || s.metadata?.trendTag === 'high-demand'
  );
}

export function getSkillsByLevel(level: SkillLevel): Skill[] {
  return skills.filter(s => s.level === level);
}

export function sortSkills(skills: Skill[], sortType: string): Skill[] {
  return [...skills].sort((a, b) => {
    if (sortType === "industry") {
      return (b.metadata?.industryDemand?.score ?? 0) - (a.metadata?.industryDemand?.score ?? 0);
    } else if (sortType === "community") {
      return (b.metadata?.userPopularity?.score ?? 0) - (a.metadata?.userPopularity?.score ?? 0);
    }
    return 0;
  });
}

export function getAllSkills(): Skill[] {
  return [...skills];
}

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter(skill => skill.category === category);
}

export function getAllCategories(): SkillCategory[] {
  const categories = new Set<SkillCategory>();
  skills.forEach(skill => categories.add(skill.category));
  return Array.from(categories);
}

export function searchSkills(query: string): Skill[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return skills.filter(skill => 
    skill.name.toLowerCase().includes(lowercaseQuery) ||
    skill.description.toLowerCase().includes(lowercaseQuery) ||
    skill.relatedSkills.some(related => related.toLowerCase().includes(lowercaseQuery))
  );
}

export function getSkillSuggestions(query: string, limit: number = 5): string[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  const suggestions = new Set<string>();
  
  skills.forEach(skill => {
    if (skill.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(skill.name);
    }
    skill.relatedSkills.forEach(related => {
      if (related.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(related);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, limit);
}