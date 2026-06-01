"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types";
import { projectsService } from "@/services/projects.service";

export function useProjects(userId: string | undefined) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await projectsService.getProjects(userId);
    if (error) setError("Failed to load projects");
    else setProjects(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(
    async (name: string, description?: string) => {
      if (!userId) return null;
      const { data, error } = await projectsService.createProject(userId, {
        name,
        description,
      });
      if (!error && data) {
        setProjects((prev) => [data, ...prev]);
      }
      return { data, error };
    },
    [userId]
  );

  const deleteProject = useCallback(async (projectId: string) => {
    const { error } = await projectsService.deleteProject(projectId);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    }
    return { error };
  }, []);

  const searchProjects = useCallback(
    async (query: string) => {
      if (!userId) return;
      if (!query.trim()) {
        fetchProjects();
        return;
      }
      const { data } = await projectsService.searchProjects(userId, query);
      setProjects(data);
    },
    [userId, fetchProjects]
  );

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    deleteProject,
    searchProjects,
  };
}
