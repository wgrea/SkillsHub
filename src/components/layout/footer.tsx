// src/components/layout/footer.tsx

import { Link } from "react-router-dom";
import { Lightbulb, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const sections = [
    {
      title: 'Platform',
      links: [
        // { label: 'Skills Library', href: '#' }, Already exists prettymuch
        // { label: 'Project Ideas', href: '#' },  Already exists prettymuch
        // { label: 'Learning Paths', href: '#' }, To-be added in the future
        // { label: 'Roadmaps', href: '#' }, To-be added in the future
      ],
    },
    {
      title: 'Resources',
      links: [
        // { label: 'Tutorials', href: '#' }, To-be added in the future
        // { label: 'Documentation', href: '#' }, To-be added in the future
        // { label: 'Community', href: '#' }, To-be added in the future
        // { label: 'Blog', href: '#' }, To-be added in the future
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Terms & Privacy', to: '/terms' },
      ],
    },
  ];

  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">SkillsHub</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Discover trending skills, explore exciting project ideas, and accelerate your learning journey with our comprehensive platform.
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href="https://www.linkedin.com/in/will-greaney-57a7a2276/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <a 
              href="https://github.com/wgrea" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="mailto:wgreaney0405@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{section.title}</h3>
            <nav className="flex flex-col gap-2">
              {section.links.map((link) => (
                <Link key={link.to} to={link.to} className="text-muted hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <a href="/data-sourcing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
      Learn About Our Data
    </a>
      
      <div className="container mt-12 pt-12 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SkillsHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
