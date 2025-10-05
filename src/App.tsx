// src/App.tsx

import { useState } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { SkillsGrid } from "@/components/skills/skills-grid";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { CategoryFilter } from "@/components/filters/category-filter";
import { SearchBar } from "@/components/filters/search-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileFilters } from "@/components/filters/mobile-filters";
import { useMobileView } from "@/hooks/use-mobile-view";
import { getAllCategories, getAllSkills } from "@/data/skills-data";
import { getAllProjects } from "@/data/projects-data";
import { SkillCategory } from "@/types";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import { AuthProvider } from "@/components/auth/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DataSourcing from "@/components/data-sourcing";
import BookmarksPage from '@/components/pages/bookmarks-page';
import TermsPage from "@/components/routes/TermsPage";

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobileView = useMobileView();

  const allCategories = getAllCategories();
  const allSkills = getAllSkills();
  const allProjects = getAllProjects();

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredProjects = allProjects.filter((project) => {
    const hasSkillInCategory = selectedCategory === "all" || 
      project.requiredSkills.some((skill) => skill.category === selectedCategory);
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return hasSkillInCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Trending Skills Hub</h1>
          <p className="text-muted-foreground">
            Discover in-demand skills and project ideas to enhance your portfolio
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            {isMobileView ? (
              <MobileFilters
                categories={allCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            ) : (
              <CategoryFilter
                categories={allCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            )}
          </div>

          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Project Ideas</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-4">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="projects" className="space-y-4">
              <ProjectsGrid projects={filteredProjects} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/signup" element={<Navigate to="/auth" replace />} />
          <Route path="/data-sourcing" element={
            <ProtectedRoute>
              <DataSourcing />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <AppContent />
            </ProtectedRoute>
          } />
          <Route path="/bookmarks" element={
            <ProtectedRoute>
              <BookmarksPage />
            </ProtectedRoute>
          } />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;