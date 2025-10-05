// src/components/routes/bookmarks-page.tsx
import { useBookmarks } from '../../hooks/use-bookmarks'
import { projects } from '../../data/projects-data'
import { skills } from '../../data/skills-data'
import { ProjectsGrid } from '../projects/projects-grid'
import { SkillsGrid } from '../skills/skills-grid'
import { EmptyState } from '../ui/empty-state'
import { useNavigate } from 'react-router-dom';

const BookmarksPage = () => {
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();

  const bookmarkedProjects = projects.filter(project =>
    bookmarks.projects.has(project.id)
  );

  const bookmarkedSkills = skills.filter(skill =>
    bookmarks.skills.has(skill.id)
  ); 

  const hasProjects = bookmarkedProjects.length > 0;
  const hasSkills = bookmarkedSkills.length > 0;


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Previous Page
      </button>
      
      <h1 className="text-3xl font-bold mb-6">📑 My Bookmarks</h1>

      {hasProjects ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Saved Projects</h2>
          <ProjectsGrid projects={bookmarkedProjects} />
        </>
      ) : (
        <EmptyState 
          title="No projects bookmarked yet." 
          description="You haven’t saved any projects to your list yet." 
        />
      )}

      {hasProjects && hasSkills && <div className="my-8" />}

      {hasSkills ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Saved Skills</h2>
          <SkillsGrid skills={bookmarkedSkills} />
        </>
      ) : (
        <EmptyState 
          title="No skills bookmarked yet." 
          description="Try bookmarking skills that align with your learning goals." 
        />
      )}
    </div>
  )
}

export default BookmarksPage
