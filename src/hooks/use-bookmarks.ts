// src/hooks/use-bookmarks.ts
// From 1.3v - Bolt now added to 1.5v (may become renamed to MSP 1.0v)

import { useState, useEffect } from 'react';
import { BookmarkState } from '@/types';

const BOOKMARKS_STORAGE_KEY = 'skillshub-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkState>({
    skills: new Set<string>(),
    projects: new Set<string>(),
  });

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarks({
          skills: new Set(parsed.skills || []),
          projects: new Set(parsed.projects || []),
        });
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  const saveBookmarks = (newBookmarks: BookmarkState) => {
    try {
      const toSave = {
        skills: Array.from(newBookmarks.skills),
        projects: Array.from(newBookmarks.projects),
      };
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(toSave));
      setBookmarks(newBookmarks);
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  };

  const toggleSkillBookmark = (skillId: string) => {
    const newSkills = new Set(bookmarks.skills);
    if (newSkills.has(skillId)) {
      newSkills.delete(skillId);
    } else {
      newSkills.add(skillId);
    }
    saveBookmarks({ ...bookmarks, skills: newSkills });
  };

  const toggleProjectBookmark = (projectId: string) => {
    const newProjects = new Set(bookmarks.projects);
    if (newProjects.has(projectId)) {
      newProjects.delete(projectId);
    } else {
      newProjects.add(projectId);
    }
    saveBookmarks({ ...bookmarks, projects: newProjects });
  };

  const isSkillBookmarked = (skillId: string) => bookmarks.skills.has(skillId);
  const isProjectBookmarked = (projectId: string) => bookmarks.projects.has(projectId);

  const getBookmarkedSkillsCount = () => bookmarks.skills.size;
  const getBookmarkedProjectsCount = () => bookmarks.projects.size;

  return {
    bookmarks,
    toggleSkillBookmark,
    toggleProjectBookmark,
    isSkillBookmarked,
    isProjectBookmarked,
    getBookmarkedSkillsCount,
    getBookmarkedProjectsCount,
  };
}
