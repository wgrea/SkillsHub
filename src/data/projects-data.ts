// src/data/projects-data.ts
import {
  Project,
  CompleteProject,
  LearningPath,
  LearningStep,
  AcademicConnections,
} from "@/types";
import { Skill } from "@/types"; // Add this import
import { getSkillById } from "./skills-data";
import { validateProject } from "@/lib/data-validation";

// id: 1, React
// id: 2, TypeScript
// id: 3, GraphQL
// id: 4, Node.js
// id: 5, API Design
// id: 6, Software Architecture
// id: 7, System Optimization
// id: 8, API Integration
// id: 9, Zod Validation
// id: 10, Cloud Computing
// id: 11, DevOps & CI/CD
// id: 12, Testing & Validation
// id: 13, Web Performance & Scalability Optimization
// id: 14, Cybersecurity
// id: 15, API Security & Authentication
// id: 16, Data Analysis
// id: 17, SQL
// id: 18, Data Engineering
// id: 19, Database Management
// id: 20, Data Visualization
// id: 21, Python
// id: 22, Embedded Systems Programming
// id: 23, Machine Learning
// id: 24, Prompt Engineering
// id: 25, Natural Language Processing (NLP)
// id: 26, UI/UX Design
// id: 27, Figma
// id: 28, Project Management
// id: 29, Unity
// id: 30, Unreal Engine
// id: 31, Game Design
// id: 32, C# for Games

// Mock data for projects
// Keep the comments for the required skills
const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio Website",
    description:
      "Create a modern, responsive portfolio website to showcase your skills and projects to potential employers.",
    difficulty: "easy",
    estimatedHours: 10,
    requiredSkills: [
      getSkillById("1")!, // (React) – Frontend framework
      getSkillById("26")!, // (UI/UX Design) – Design principles for portfolios
      getSkillById("20")!, // (Data Visualization) – Showcasing projects visually
      getSkillById("27")!, // (Figma) – Optional for mockups
    ],
    imageUrl:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "React Portfolio Templates",
        url: "https://github.com/topics/portfolio-template",
      },
      {
        title: "Portfolio Design Inspiration",
        url: "https://www.behance.net/search/projects?tracking_source=typeahead_search_direct&search=portfolio%20website",
      },
    ],
    promptTemplates: {
      proposal: `I'll create a stunning portfolio website showcasing your work professionally. Includes:
                - Responsive design (mobile/desktop)
                - Project showcase section
                - Contact form integration
                - Performance optimized (90+ Lighthouse score)
                Delivery: 5 business days | Price: $350`,
      code: `Generate a React portfolio website using Next.js with:
                1. Three main sections: Hero, Projects, Contact
                2. Using Tailwind CSS for styling
                3. Responsive design with mobile menu
                4. Project cards with hover effects
                5. Contact form with Formik/Yup validation`,
    },
  },
  // Remaining ids sort of repeat but different texts
  {
    id: "2",
    title: "E-commerce Dashboard",
    description:
      "Build an interactive dashboard for e-commerce analytics with real-time data visualization and reporting features.",
    difficulty: "hard",
    estimatedHours: 35,
    requiredSkills: [
      getSkillById("1")!, // React
      getSkillById("2")!, // TypeScript
      getSkillById("4")!, // Node.js
      getSkillById("15")!, // API Security
      getSkillById("17")!, // SQL
      getSkillById("20")!, // Data Visualization
    ],
    imageUrl:
      "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Dashboard Design Patterns",
        url: "https://uxplanet.org/dashboard-design-patterns-2c58e8f8de6a",
      },
      {
        title: "Recharts - React Charts Library",
        url: "https://recharts.org/en-US/",
      },
    ],
    promptTemplates: {
      proposal: `I'll build an interactive e-commerce analytics dashboard with real-time data visualizations. Includes:
- React + TypeScript frontend
- Secure Node.js backend with SQL support
- Realtime charting (sales, revenue, customer retention)
Delivery: 10 business days | Price: $950`,
      code: `Generate a React + TypeScript dashboard with:
1. Real-time data via WebSockets
2. Charting using Recharts (bar, pie, line)
3. Node.js backend with authentication and SQL queries
4. Admin route with product/filter analytics`,
    },
  },
  {
    id: "3",
    title: "Machine Learning Image Classifier",
    description:
      "Develop an image classification system using machine learning to identify and categorize objects in photos.",
    difficulty: "expert",
    estimatedHours: 45,
    requiredSkills: [
      getSkillById("21")!, // Python
      getSkillById("23")!, // Machine Learning
      getSkillById("18")!, // Data Engineering
      getSkillById("25")!, // (NLP) – Optional for text-based classification
    ],
    imageUrl:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "TensorFlow Image Classification Tutorial",
        url: "https://www.tensorflow.org/tutorials/images/classification",
      },
      {
        title: "Dataset Resources for Image Classification",
        url: "https://paperswithcode.com/datasets?task=image-classification",
      },
    ],
    promptTemplates: {
      proposal: `I'll create a machine learning classifier for image recognition with up to 90% accuracy. Features:
- TensorFlow/Keras model training pipeline
- Dataset integration and preprocessing
- Exportable model + basic web interface
Delivery: 2 weeks | Price: $1,400`,
      code: `Write Python code using TensorFlow to:
1. Load image dataset (with augmentation)
2. Train a CNN with Keras (ResNet or custom)
3. Evaluate and save the model
4. Provide a Flask API for predictions (base64 image input)`,
    },
  },
  {
    id: "4",
    title: "Social Media Content Calendar",
    description:
      "Create a content planning and scheduling tool for social media managers to organize and automate posts.",
    difficulty: "medium",
    estimatedHours: 25,
    requiredSkills: [
      getSkillById("1")!, // React
      getSkillById("4")!, // Node.js
      getSkillById("8")!, // API Integration
      getSkillById("19")!, // Database Management
    ],
    imageUrl:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Content Calendar Templates",
        url: "https://buffer.com/library/content-calendar-template/",
      },
      {
        title: "Social Media API Documentation",
        url: "https://developers.facebook.com/docs/",
      },
    ],
    promptTemplates: {
      proposal: `I'll build a content calendar tool for social media teams. Includes:
- Weekly/monthly scheduling views
- Post previews with image/media support
- Automated publishing via API (e.g., Meta/Facebook)
Delivery: 7 business days | Price: $750`,
      code: `Create a React-based content calendar with:
1. Drag-and-drop post scheduling (via react-beautiful-dnd)
2. Node.js backend + MongoDB
3. Facebook Graph API integration
4. Calendar interface (FullCalendar or similar)`,
    },
  },
  {
    id: "5",
    title: "Project Management Tool",
    description:
      "Build a collaborative project management application with task tracking, team communication, and progress visualization.",
    difficulty: "hard",
    estimatedHours: 40,
    requiredSkills: [
      getSkillById("1")!, // React
      getSkillById("2")!, // TypeScript
      getSkillById("4")!, // Node.js
      getSkillById("28")!, // Project Management
      getSkillById("6")!, // Software Architecture
    ],
    imageUrl:
      "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Project Management Methodologies",
        url: "https://www.wrike.com/project-management-guide/methodologies/",
      },
      {
        title: "React DnD for Drag-and-Drop Interfaces",
        url: "https://react-dnd.github.io/react-dnd/about",
      },
    ],
    promptTemplates: {
      proposal: `I'll develop a team project management tool with task tracking and collaboration features. Includes:
- Kanban-style boards
- Team chat & notifications
- Progress visualization
Delivery: 10–12 business days | Price: $1,250`,
      code: `Build a project tracker with:
1. React + TypeScript frontend
2. Node.js backend with REST API
3. Task boards using React DnD
4. WebSocket-based team messaging
5. Timeline view with project stats`,
    },
  },
  {
    id: "6",
    title: "Database Design for Inventory System",
    description:
      "Design and implement a relational database system for tracking inventory, orders, and customer information.",
    difficulty: "medium",
    estimatedHours: 20,
    requiredSkills: [
      getSkillById("17")!, // SQL
      getSkillById("19")!, // Database Management
      getSkillById("10")!, // Cloud Computing
    ],
    imageUrl:
      "https://images.pexels.com/photos/4968633/pexels-photo-4968633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Database Schema Design Best Practices",
        url: "https://www.sqlshack.com/database-design-best-practices/",
      },
      {
        title: "Entity-Relationship Diagram Tutorial",
        url: "https://www.lucidchart.com/pages/er-diagrams",
      },
    ],
    promptTemplates: {
      proposal: `I'll design a scalable inventory database system with customer and order tracking. Includes:
- Relational schema planning
- SQL setup + cloud deployment
- Admin dashboard-ready structure
Delivery: 5 business days | Price: $600`,
      code: `Design a PostgreSQL schema for inventory with:
1. Tables: Products, Orders, Customers
2. Foreign key relationships + indexing
3. ERD diagram via Lucidchart
4. Optional: Prisma or Sequelize setup`,
    },
  },
  {
    id: "7",
    title: "AI-Powered Resume Reviewer",
    description:
      "Build a tool that analyzes resumes using AI, providing feedback and suggestions for improvements.",
    difficulty: "medium",
    estimatedHours: 25,
    requiredSkills: [
      getSkillById("2")!, // TypeScript
      getSkillById("9")!, // Zod Validation
      getSkillById("23")!, // (Machine Learning) – Optional for scoring
      getSkillById("25")!, // NLP
    ],
    imageUrl:
      "https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Building Resume Scoring Models with AI",
        url: "https://towardsdatascience.com/building-ai-models-to-score-resumes-123456",
      },
      {
        title: "Natural Language Processing for Resume Analysis",
        url: "https://www.analyticsvidhya.com/blog/2021/07/nlp-techniques-for-resume-screening/",
      },
    ],
    promptTemplates: {
      proposal: `I'll build an AI tool that reviews resumes and provides smart feedback. Features:
- NLP analysis (grammar, tone, clarity)
- Scoring rubric based on job alignment
- Feedback highlights + improvement tips
Delivery: 7–9 business days | Price: $800`,
      code: `Write TypeScript + Node.js code to:
1. Parse resume content (PDF or text)
2. Apply NLP scoring using spaCy or HuggingFace
3. Return actionable feedback with Zod-validated schema
4. Add UI-ready JSON structure for frontend display`,
    },
  },
  {
    id: "8",
    title: "Game Inventory System",
    description:
      "Develop a specialized inventory tracker for game development, optimizing file handling and storage management.",
    difficulty: "medium",
    estimatedHours: 30,
    requiredSkills: [
      getSkillById("16")!, // Data Analysis
      getSkillById("10")!, // Cloud Computing
      getSkillById("20")!, // Data Visualization
      getSkillById("22")!, // (Embedded Systems) – Optional for performance
    ],
    imageUrl:
      "https://images.pexels.com/photos/159407/gaming-console-video-game-gamer-159407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Optimizing Inventory Systems in Game Development",
        url: "https://www.gamasutra.com/blogs/Inventory-Systems-Best-Practices",
      },
      {
        title: "File Handling Techniques for Game Development",
        url: "https://www.redblobgames.com/articles/data-storage/",
      },
    ],
    promptTemplates: {
      proposal: `I'll develop a game inventory tracker optimized for performance and modularity. Features include:
- Real-time item tracking and storage grouping
- Cloud-based data sync
- Optimized file structure for large asset libraries
Delivery: 7–9 business days | Price: $750`,
      code: `Build a game inventory system with:
1. Node.js backend + PostgreSQL for asset tracking
2. File handling with structured naming conventions
3. React UI with filters and drag-drop slot system
4. Optional: analytics dashboard for item usage frequency`,
    },
  },
  {
    id: "9",
    title: "API-First Application",
    description:
      "Develop a backend-focused application with an API-first approach, ensuring scalable, high-performance service design.",
    difficulty: "medium",
    estimatedHours: 35,
    requiredSkills: [
      getSkillById("5")!, // API Design (core)
      getSkillById("4")!, // Node.js (backend)
      getSkillById("6")!, // Software Architecture
      getSkillById("15")!, // API Security
    ],
    imageUrl:
      "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "API-First Development: Why It Matters",
        url: "https://blog.postman.com/api-first-development/",
      },
      {
        title: "Building Scalable Backend Systems",
        url: "https://www.infoq.com/articles/scalable-backend-architecture/",
      },
    ],
    promptTemplates: {
      proposal: `I'll build a scalable, API-first backend service designed for future frontend integrations. Includes:
- RESTful API design (OpenAPI spec)
- Auth + rate limiting
- Modular architecture for scale
Delivery: 8 business days | Price: $800`,
      code: `Write a Node.js + TypeScript backend with:
1. Express API endpoints (CRUD + pagination)
2. JWT-based authentication
3. Swagger docs + API key validation
4. Scalable controller-service-model structure`,
    },
  },
  {
    id: "10",
    title: "Data-Driven Investment Dashboard",
    description:
      "Develop a financial dashboard integrating real-time stock data APIs for investment analysis and trend forecasting.",
    difficulty: "medium",
    estimatedHours: 40,
    requiredSkills: [
      getSkillById("16")!, // Data Analysis
      getSkillById("17")!, // SQL
      getSkillById("20")!, // Data Visualization
      getSkillById("10")!, // Cloud Computing
    ],
    imageUrl:
      "https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Best Financial Data APIs in 2025",
        url: "https://www.10xsheets.com/blog/financial-data-apis/",
      },
      { title: "Stock Market API by Polygon.io", url: "https://polygon.io/" },
    ],
    promptTemplates: {
      proposal: `I'll create a financial dashboard for investors using real-time stock data and trend analytics. Includes:
- Secure data visualization
- Custom filters by ticker/date range
- Insights via rolling average + candle graphs
Delivery: 10 business days | Price: $950`,
      code: `Create a React dashboard with:
1. Financial charts via Chart.js or D3
2. API integration for live stock prices (e.g. Polygon.io)
3. SQL queries for historical data
4. Hosted deployment on Vercel/AWS`,
    },
  },
  {
    id: "11",
    title: "IoT Smart Home Dashboard",
    description:
      "Develop a React-based dashboard that connects to IoT sensors and smart home controls for real-time monitoring and automation.",
    difficulty: "medium",
    estimatedHours: 45,
    requiredSkills: [
      getSkillById("1")!, // React (dashboard UI)
      getSkillById("22")!, // Embedded Systems (IoT)
      getSkillById("8")!, // API Integration (device APIs)
      getSkillById("14")!, // Cybersecurity (critical for IoT)
    ],
    imageUrl:
      "https://images.pexels.com/photos/4792718/pexels-photo-4792718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Building IoT Dashboards with React",
        url: "https://codesandbox.io/s/react-smart-home-dashboard-z9tih",
      },
      {
        title: "Smart Home Automation with IoT",
        url: "https://github.com/jbittcodes/smart-home-automation-dashboard",
      },
    ],
    promptTemplates: {
      proposal: `I'll build a smart home dashboard that connects to IoT sensors for real-time control and analytics. Features:
- Live device status monitoring
- API integrations (e.g. Zigbee, MQTT)
- Role-based access for admin/viewer
Delivery: 2 weeks | Price: $1,200`,
      code: `Develop a React dashboard with:
1. API integration for IoT device streams
2. Real-time updates with WebSockets/MQTT
3. Alert triggers for anomalies (e.g. motion/temp)
4. Secure login + permissions (JWT-based)`,
    },
  },
  {
    id: "12",
    title: "GraphQL-powered API Gateway",
    description:
      "Develop a high-performance API gateway using GraphQL and TypeScript to streamline data access across multiple microservices.",
    difficulty: "medium",
    estimatedHours: 20,
    requiredSkills: [
      getSkillById("3")!, // GraphQL
      getSkillById("2")!, // TypeScript
      getSkillById("6")!, // Software Architecture
      getSkillById("15")!, // API Security
    ],
    imageUrl:
      "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    resourceLinks: [
      { title: "GraphQL API Design Guide", url: "https://graphql.org/learn/" },
      {
        title: "Microservices Architecture",
        url: "https://martinfowler.com/articles/microservices.html",
      },
    ],
    promptTemplates: {
      proposal: `I'll create a GraphQL-based API gateway to unify and streamline access across services. Includes:
- Federated schema structure
- Security guardrails (auth/rate-limiting)
- Query optimization for performance
Delivery: 5 business days | Price: $650`,
      code: `Write a GraphQL server using Apollo Gateway with:
1. Subgraph stitching for Users, Orders, Products
2. Context-based JWT auth
3. Type-safe schema with TypeScript
4. N+1 query prevention strategies`,
    },
  },
  {
    id: "13",
    title: "Cloud-based CI/CD Pipeline",
    description:
      "Implement a scalable CI/CD pipeline using AWS, Kubernetes, and GitHub Actions to automate deployment workflows.",
    difficulty: "hard",
    estimatedHours: 30,
    requiredSkills: [
      getSkillById("10")!, // Cloud Computing
      getSkillById("11")!, // DevOps & CI/CD
      getSkillById("12")!, // Testing & Validation
    ],
    imageUrl:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    resourceLinks: [
      {
        title: "Kubernetes CI/CD Best Practices",
        url: "https://kubernetes.io/docs/concepts/cluster-administration/cicd/",
      },
      { title: "AWS DevOps Automation", url: "https://aws.amazon.com/devops/" },
    ],
    promptTemplates: {
      proposal: `I'll implement a cloud-native CI/CD pipeline with GitHub Actions, AWS, and Kubernetes to automate your deployment flow. Includes:
- Push-to-deploy setup
- Lint/test/stage/prod environments
- Rollback & alert hooks
Delivery: 6 business days | Price: $900`,
      code: `Build a CI/CD pipeline using:
1. GitHub Actions for automated builds/tests
2. Dockerfile for Node.js app + K8s manifest
3. AWS EKS deployment with rollout strategy
4. Slack alerts on failed steps`,
    },
  },
  {
    id: "14",
    title: "AI-powered Code Review Assistant",
    description:
      "Develop a code review assistant using machine learning to automatically detect common bugs and security vulnerabilities.",
    difficulty: "hard",
    estimatedHours: 35,
    requiredSkills: [
      getSkillById("21")!, // Python
      getSkillById("23")!, // Machine Learning
      getSkillById("14")!, // Cybersecurity
      getSkillById("12")!, // Testing & Validation
    ],
    imageUrl:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    resourceLinks: [
      {
        title: "ML-Based Code Analysis",
        url: "https://towardsdatascience.com/ai-code-analysis-101-a1a8bb9e781b",
      },
      {
        title: "Secure Code Review Techniques",
        url: "https://owasp.org/www-community/activities/secure-code-review",
      },
    ],
    promptTemplates: {
      proposal: `I'll build an AI code reviewer that scans for bugs, security flaws, and quality issues. Features:
- ML model trained on coding patterns
- Vulnerability detection (OWASP aligned)
- Integration-ready for GitHub/GitLab CI
Delivery: 10 business days | Price: $1,200`,
      code: `Create a Python-based code analysis system that:
1. Uses AST parsing to extract functions/methods
2. Applies ML models to detect bad practices
3. Flags security risks (XSS, SQLi, etc.)
4. Returns structured results with severity scores`,
    },
  },
  {
    id: "15",
    title: "High-Performance SQL Query Optimizer",
    description:
      "Design a SQL query optimization tool to improve database efficiency and response times.",
    difficulty: "medium",
    estimatedHours: 25,
    requiredSkills: [
      getSkillById("17")!, // SQL
      getSkillById("7")!, // System Optimization
      getSkillById("19")!, // Database Management
    ],
    imageUrl:
      "https://images.pexels.com/photos/1591066/pexels-photo-1591066.jpeg",
    resourceLinks: [
      {
        title: "SQL Query Optimization Guide",
        url: "https://use-the-index-luke.com/",
      },
      {
        title: "Database Performance Tuning",
        url: "https://www.oracle.com/database/technologies/performance-tuning.html",
      },
    ],
    promptTemplates: {
      proposal: `I'll develop a SQL optimization tool that boosts database performance and reduces query lag. Includes:
- Index analysis + execution plan review
- Query linting and rewrite suggestions
- Dashboard of slow query trends
Delivery: 5 business days | Price: $600`,
      code: `Build a SQL performance tool that:
1. Parses and scores SQL queries based on cost
2. Suggests indexed columns + query rewrites
3. Stores history of top 10 slowest queries
4. Exposes API with optimization results (GET /analyze)`,
    },
  },
  {
    id: "16",
    title: "2D Platformer Game",
    description:
      "Create a classic 2D platformer game with character movement, enemies, collectibles, and multiple levels.",
    difficulty: "medium",
    estimatedHours: 30,
    requiredSkills: [
      getSkillById("29")!, // Unity
      getSkillById("32")!, // C# for Games
      getSkillById("31")!, // Game Design
    ],
    imageUrl:
      "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Unity 2D Platformer Tutorial",
        url: "https://learn.unity.com/project/2d-platformer-tutorial",
      },
      { title: "2D Game Art Resources", url: "https://opengameart.org/" },
    ],
    promptTemplates: {
      proposal: `I'll design a complete 2D platformer game in Unity with polished mechanics and level design. Includes:
- Character movement + jump/dash logic
- Enemies, coins, checkpoints
- Game manager + UI menus
Delivery: 10 business days | Price: $950`,
      code: `Develop a Unity 2D platformer with:
1. C# scripts for player/enemy behavior
2. Tile-based level design
3. Health + score tracking system
4. Win/lose condition scenes and restart flow`,
    },
  },
  {
    id: "17",
    title: "VR Experience Demo",
    description:
      "Develop an immersive virtual reality experience showcasing interactive environments and user interfaces.",
    difficulty: "expert",
    estimatedHours: 50,
    requiredSkills: [
      getSkillById("30")!, // Unreal Engine
      getSkillById("31")!, // Game Design
      getSkillById("26")!, // UI/UX Design
    ],
    imageUrl:
      "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Unreal VR Development Guide",
        url: "https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/XRDevelopment/VR/",
      },
      {
        title: "VR Design Best Practices",
        url: "https://developer.oculus.com/design/",
      },
    ],
    promptTemplates: {
      proposal: `I'll create a VR prototype built in Unreal Engine for immersive storytelling or simulation use cases. Features:
- First-person movement + interaction
- UI overlays with motion tracking
- Optimized for Oculus or WebXR
Delivery: 3 weeks | Price: $1,500`,
      code: `Write a VR scene in Unreal Engine 5 that includes:
1. Motion controller support (e.g. Oculus Quest 2)
2. Interactive objects with physics
3. Menu interface (gaze/finger-based selection)
4. Trigger events (e.g., room transitions, sounds)`,
    },
  },
  {
    id: "18",
    title: "Mobile Puzzle Game",
    description:
      "Design and develop an engaging puzzle game for mobile devices with progressive difficulty and social features.",
    difficulty: "hard",
    estimatedHours: 40,
    requiredSkills: [
      getSkillById("29")!, // Unity
      getSkillById("32")!, // C# for Games
      getSkillById("31")!, // Game Design
    ],
    imageUrl:
      "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    resourceLinks: [
      {
        title: "Mobile Game Development with Unity",
        url: "https://learn.unity.com/pathway/mobile-game-development",
      },
      {
        title: "Puzzle Game Design Principles",
        url: "https://www.gamedeveloper.com/design/the-art-of-puzzle-game-design",
      },
    ],
    promptTemplates: {
      proposal: `I'll develop a Unity-based puzzle game with unique mechanics, progressive levels, and mobile polish. Includes:
- Level selection and save states
- Hint system + animations
- Ad-ready monetization hooks
Delivery: 12 business days | Price: $1,200`,
      code: `Create a mobile puzzle game with:
1. Unity + C# logic for grid-based puzzles
2. Progression system with level JSON configs
3. Smooth UI transitions and mobile input support
4. Optional: Unity Ads + Google Play leaderboard`,
    },
  },
];
export { projects }

// Utility functions
function completeLearningPath(path?: Partial<LearningPath>): LearningPath {
  return {
    steps: path?.steps?.map(completeLearningStep) ?? [],
    estimatedCompletionTime: path?.estimatedCompletionTime ?? 0,
    prerequisites: path?.prerequisites ?? [],
  };
}

function completeLearningStep(step: Partial<LearningStep>): LearningStep {
  return {
    title: step.title ?? "",
    description: step.description ?? "",
    resources: step.resources ?? [],
    order: step.order ?? 0,
    completed: step.completed ?? false,
  };
}

function completeAcademicConnections(
  academic?: Partial<AcademicConnections>
): AcademicConnections {
  return {
    subjects: academic?.subjects ?? [],
    concepts: academic?.concepts ?? [],
    creditRecommendation: academic?.creditRecommendation ?? "",
  };
}

// Add the missing completeProject function
function completeProject(
  project: Partial<Project> & { id: string; title: string }
): CompleteProject {
  return {
    ...project,
    description: project.description ?? "",
    difficulty: project.difficulty ?? "medium",
    learningPath: completeLearningPath(project.learningPath),
    academicConnections: completeAcademicConnections(
      project.academicConnections
    ),
    promptTemplates: project.promptTemplates ?? {
      proposal: "",
      code: "",
    },
  } as CompleteProject;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getValidatedProjectById(id: string): CompleteProject | null {
  const project = getProjectById(id);
  if (!project || !validateProject(project)) return null;
  return completeProject(project);
}

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getProjectsByEstimatedTime(maxHours: number): Project[] {
  return projects.filter((p) => p.estimatedHours <= maxHours);
}

export function getProjectsWithLearningPaths(): Project[] {
  return projects.filter((p) => (p.learningPath?.steps?.length ?? 0) > 0);
}

export function getProjectsByAcademicSubject(subject: string): Project[] {
  return projects.filter((p) =>
    p.academicConnections?.subjects?.includes(subject)
  );
}

export function getProjectSkillGap(
  projectId: string,
  knownSkillIds: string[]
): Skill[] {
  const project = getProjectById(projectId);
  if (!project) return [];

  return project.requiredSkills.filter(
    (skill) => !knownSkillIds.includes(skill.id)
  );
}

export function getProjectsByDifficulty(
  difficulty: Project["difficulty"]
): Project[] {
  return projects.filter((project) => project.difficulty === difficulty);
}

export function getProjectsByRequiredSkill(skillId: string): Project[] {
  return projects.filter((project) =>
    project.requiredSkills.some((skill) => skill.id === skillId)
  );
}

export function searchProjects(query: string): Project[] {
  if (!query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.requiredSkills.some((skill) =>
        skill.name.toLowerCase().includes(lowercaseQuery)
      )
  );
}

export function getProjectSuggestions(
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) return [];

  const lowercaseQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  projects.forEach((project) => {
    if (project.title.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(project.title);
    }
    project.requiredSkills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(skill.name);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}
