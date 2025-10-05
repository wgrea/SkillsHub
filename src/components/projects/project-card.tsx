// src/components/projects/project-card.tsx
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Bookmark, ExternalLink, Lock } from 'lucide-react';
import { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectDifficultyBadge } from '@/components/projects/project-difficulty-badge';
import { cn } from '@/lib/utils';
import { useSession } from '@/hooks/use-session';
import { AnalyticsEvents } from '@/lib/analytics-events';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useDebounce } from '@/hooks/use-debounce';
import { useSubscription } from '@/hooks/use-subscription';
import { SubscriptionTier } from '@/types/subscription'; // Keep this but fix the path

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
  // Remove showFullCard since we're using the hook directly
}

export function ProjectCard({ project, isExpanded, onToggleExpand }: ProjectCardProps) {
  const { isProjectBookmarked, toggleProjectBookmark } = useBookmarks();
  const isBookmarked = isProjectBookmarked(project.id);
  const { sessionId } = useSession();
  const { hasAccess } = useSubscription();
  // Use the correct SubscriptionTier enum value
  const hasBuilderAccess = hasAccess(SubscriptionTier.BUILDER_PLUS);
  
  // Enhanced base properties with proper typing
  const baseEventProps = useCallback(() => ({
    session_id: sessionId,
    platform: 'web' as const,
    timestamp: Date.now(),
    user_agent: navigator.userAgent,
    project_title: project.title,
    project_difficulty: project.difficulty,
    project_id: project.id
  }), [sessionId, project.title, project.difficulty, project.id]);

  // Replace trackEvent with strongly-typed version
  const trackProjectEvent = useCallback(
    (type: 'view' | 'interaction', payload: {
      interaction_type?: 'click' | 'save' | 'share' | 'hover' | 'unsave',
      element_id: string,
      [key: string]: unknown
    }) => {
      const base = baseEventProps();
      
      try {
        if (type === 'view') {
          AnalyticsEvents.project.view({
            project_id: project.id,
            technology: project.requiredSkills.map(s => s.name),
            ...payload
          }, base);
        } else {
          AnalyticsEvents.project.interaction({
            interaction_type: payload.interaction_type ?? 'click',
            element_id: payload.element_id,
            project_id: project.id
          }, base);
        }
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    }, 
    [baseEventProps, project.requiredSkills, project.id]
  );

  const trackHoverEvent = useDebounce(
    useCallback(() => {
      trackProjectEvent('interaction', {
        interaction_type: 'hover',
        element_id: `project-card-${project.id}`,
        duration_ms: 2000
      });
    }, [trackProjectEvent, project.id]),
    300
  );

  // Bookmark handler with proper typing
  const handleBookmarkToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    toggleProjectBookmark(project.id);

    trackProjectEvent('interaction', {
      interaction_type: isBookmarked ? 'unsave' : 'save',
      element_id: 'project-bookmark',
      bookmark_state: !isBookmarked
    });
  }, [isBookmarked, toggleProjectBookmark, project.id, trackProjectEvent]);

  const handleExpandToggle = useCallback(() => {
    trackProjectEvent('interaction', {
      interaction_type: 'click',
      element_id: 'expand-toggle'
    });

    if (!isExpanded) {
      trackProjectEvent('view', {
        element_id: `project-view-${project.id}`
      });
    }
    
    onToggleExpand();
  }, [isExpanded, onToggleExpand, trackProjectEvent, project.id]);

  const handleResourceClick = useCallback((e: React.MouseEvent, resource: { url: string; title: string }) => {
    e.stopPropagation();
    trackProjectEvent('interaction', {
      interaction_type: 'click',
      element_id: `resource-${resource.title.toLowerCase().replace(/\s+/g, '-')}`,
      resource_type: resource.url.includes('youtube') ? 'video' : 'article'
    });
    
    setTimeout(() => {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }, 150);
  }, [trackProjectEvent]);

  const handleSkillClick = useCallback((e: React.MouseEvent, skill: { id: string; name: string }) => {
    e.stopPropagation();
    trackProjectEvent('interaction', {
      interaction_type: 'click',
      element_id: `skill-${skill.id}`,
      skill_name: skill.name
    });
  }, [trackProjectEvent]);

  // Determine what content to show based on subscription status
  const canShowFullContent = hasBuilderAccess || isExpanded;
  const shouldShowLockIndicator = !hasBuilderAccess;

  return (
    <div className="relative h-full">
      <Card 
        className={cn(
          "transition-shadow hover:shadow-md cursor-pointer overflow-hidden h-full flex flex-col",
          isExpanded ? "shadow-md" : "",
          !hasBuilderAccess && "border-amber-200"
        )}
        onClick={handleExpandToggle}
        onMouseEnter={trackHoverEvent}
      >
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <ProjectDifficultyBadge difficulty={project.difficulty} />
            <div className="flex items-center text-white">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.estimatedHours} hours</span>
            </div>
          </div>
          
          {/* Lock indicator for non-subscribers */}
          {shouldShowLockIndicator && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white p-1.5 rounded-full">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3 flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBookmarkToggle}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {project.description}
          </p>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSkills.slice(0, 3).map((skill) => (
              <Badge 
                key={skill.id} 
                variant="outline" 
                className="text-xs cursor-pointer"
                onClick={(e) => handleSkillClick(e, skill)}
              >
                {skill.name}
              </Badge>
            ))}
            {project.requiredSkills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.requiredSkills.length - 3} more
              </Badge>
            )}
          </div>
          
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isExpanded && (
              <div className="pt-4 space-y-4">
                {/* Required Skills - Always show for expanded view */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.requiredSkills.map((skill) => (
                      <div 
                        key={skill.id} 
                        className="flex items-center p-2 rounded-md bg-muted/50 cursor-pointer"
                        onClick={(e) => handleSkillClick(e, skill)}
                      >
                        <span 
                          className="text-lg mr-2"
                          style={{ color: skill.color }}
                        >
                          {skill.icon}
                        </span>
                        <span className="text-sm">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Helpful Resources - Only show for subscribers or when expanded */}
                {canShowFullContent && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Helpful Resources</h4>
                      <div className="space-y-2">
                        {project.resourceLinks.map((resource, index) => (
                          <a 
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-primary hover:underline"
                            onClick={(e) => handleResourceClick(e, resource)}
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Prompt Templates - Premium content */}
                    {project.promptTemplates && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Prompt Templates</h4>
                        <div className="space-y-2">
                          <pre className="text-xs bg-muted p-2 rounded whitespace-pre-wrap">
                            {project.promptTemplates.proposal}
                          </pre>
                          <pre className="text-xs bg-muted p-2 rounded whitespace-pre-wrap">
                            {project.promptTemplates.code}
                          </pre>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Upgrade prompt for non-subscribers */}
                {!hasBuilderAccess && isExpanded && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <Lock className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                    <h4 className="text-sm font-medium text-amber-800 mb-1">
                      Unlock Full Project Details
                    </h4>
                    <p className="text-xs text-amber-600">
                      Upgrade to Builder+ for resources, prompt templates, and implementation guides
                    </p>
                    <Button 
                      className="mt-2 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add upgrade navigation here
                        console.log('Navigate to upgrade');
                      }}
                    >
                      Upgrade to Builder+
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </CardContent>
        
        <CardFooter className="pt-2 mt-auto">
          <div className="flex items-center justify-between w-full">
            {shouldShowLockIndicator && !isExpanded && (
              <div className="flex items-center text-amber-600 text-xs font-medium">
                <Lock className="h-3 w-3 mr-1" />
                Builder+
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-8 w-8 p-0"
              aria-label={isExpanded ? "Collapse project details" : "Expand project details"}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}