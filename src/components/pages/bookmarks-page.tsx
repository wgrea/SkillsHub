// src/components/pages/bookmarks-page.tsx
import { useBookmarks } from '../../hooks/use-bookmarks'
import { projects } from '../../data/projects-data'
import { skills } from '../../data/skills-data'
import { ProjectsGrid } from '../projects/projects-grid'
import { SkillsGrid } from '../skills/skills-grid'
import { EmptyState } from '../ui/empty-state'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../../hooks/use-subscription'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { InfoIcon, LockIcon } from 'lucide-react'

const BookmarksPage = () => {
  const { bookmarks } = useBookmarks()
  const { /* subscription */ } = useSubscription()
  const navigate = useNavigate()

  const bookmarkedProjects = projects.filter(project =>
    bookmarks.projects.has(project.id)
  )

  const bookmarkedSkills = skills.filter(skill =>
    bookmarks.skills.has(skill.id)
  )

  // Temporary: Default to explorer until we know the subscription structure
  // This will be updated once we see the SubscriptionData type
  const currentTier = 'explorer' // Default for now
  const isExplorer = currentTier === 'explorer'
  const maxBookmarks = isExplorer ? 5 : Infinity
  const totalBookmarks = bookmarkedProjects.length + bookmarkedSkills.length
  const hasReachedLimit = totalBookmarks >= maxBookmarks
  const remainingSlots = Math.max(0, maxBookmarks - totalBookmarks)

  const hasProjects = bookmarkedProjects.length > 0
  const hasSkills = bookmarkedSkills.length > 0
  const hasAnyBookmarks = hasProjects || hasSkills

  // For Explorer tier, show limited view if over limit
  const displayProjects = isExplorer 
    ? bookmarkedProjects.slice(0, Math.max(0, maxBookmarks - bookmarkedSkills.length))
    : bookmarkedProjects

  const displaySkills = isExplorer
    ? bookmarkedSkills.slice(0, Math.max(0, maxBookmarks - bookmarkedProjects.length))
    : bookmarkedSkills

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Back to Previous Page
      </button>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📑 My Bookmarks</h1>
        {isExplorer && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <InfoIcon className="h-4 w-4" />
            <span>{remainingSlots} of {maxBookmarks} slots remaining</span>
          </div>
        )}
      </div>

      {/* Upgrade Alert for Explorer at limit */}
      {hasReachedLimit && isExplorer && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <LockIcon className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              You've reached the maximum {maxBookmarks} bookmarks on Explorer tier.
            </span>
            <Button 
              size="sm" 
              onClick={() => navigate('/pricing')}
              className="ml-4"
            >
              Upgrade to Save More
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tier Benefits Card for Explorer */}
      {isExplorer && !hasReachedLimit && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              Explorer Tier Limits
            </CardTitle>
            <CardDescription>
              You can save up to {maxBookmarks} bookmarks. {remainingSlots} slots remaining.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/pricing')}
            >
              Upgrade for Unlimited Bookmarks
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Projects Section */}
      {hasProjects ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Saved Projects</h2>
          {isExplorer && bookmarkedProjects.length > displayProjects.length && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertDescription>
                Showing {displayProjects.length} of {bookmarkedProjects.length} projects. 
                Upgrade to view all bookmarked projects.
              </AlertDescription>
            </Alert>
          )}
          <ProjectsGrid projects={displayProjects} />
        </>
      ) : (
        !hasSkills && (
          <EmptyState 
            title="No projects bookmarked yet." 
            description="You haven't saved any projects to your list yet." 
          />
        )
      )}

      {/* Spacer only if both sections exist */}
      {hasProjects && hasSkills && <div className="my-8" />}

      {/* Skills Section */}
      {hasSkills ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Saved Skills</h2>
          {isExplorer && bookmarkedSkills.length > displaySkills.length && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <AlertDescription>
                Showing {displaySkills.length} of {bookmarkedSkills.length} skills. 
                Upgrade to view all bookmarked skills.
              </AlertDescription>
            </Alert>
          )}
          <SkillsGrid skills={displaySkills} />
        </>
      ) : (
        !hasProjects && (
          <EmptyState 
            title="No skills bookmarked yet." 
            description="Try bookmarking skills that align with your learning goals." 
          />
        )
      )}

      {/* Empty state when user has some bookmarks but we're showing limited view */}
      {isExplorer && hasAnyBookmarks && displayProjects.length === 0 && displaySkills.length === 0 && (
        <div className="text-center py-12">
          <LockIcon className="h-12 w-12 mx-auto text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Bookmark Limit Reached</h3>
          <p className="text-muted-foreground mb-4">
            You've reached the maximum {maxBookmarks} bookmarks on Explorer tier. 
            Remove some bookmarks or upgrade to save more.
          </p>
          <Button onClick={() => navigate('/pricing')}>
            Upgrade Plan
          </Button>
        </div>
      )}
    </div>
  )
}

export default BookmarksPage