"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FolderOpen,
  FileText,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { ProjectCard } from "@/components/dashboard/project-card";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { UploadDropzone } from "@/components/dashboard/upload-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { projectsService } from "@/services/projects.service";

const STATS = [
  { label: "Total Projects", value: "—", icon: FolderOpen, color: "text-ink-600" },
  { label: "Edited This Week", value: "—", icon: Clock, color: "text-amber-600" },
  { label: "Pages Annotated", value: "—", icon: FileText, color: "text-emerald-600" },
  { label: "Exports This Month", value: "—", icon: TrendingUp, color: "text-purple-600" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects, loading, createProject, deleteProject, searchProjects } = useProjects(user?.id);
  const [uploadOpen, setUploadOpen] = useState(false);
  const router = useRouter();

  const statsWithData = STATS.map((s, i) =>
    i === 0 ? { ...s, value: String(projects.length) } : s
  );

  const handleCreateProject = async (name: string, description?: string) => {
    const result = await createProject(name, description);
    if (result?.data) {
      router.push(`/editor?project=${result.data.id}`);
    }
  };

  const handleUpload = async (file: File) => {
    if (!user) return;
    const { url } = await projectsService.uploadPdf(user.id, file);
    if (url) {
      const result = await createProject(
        file.name.replace(".pdf", ""),
        undefined
      );
      if (result?.data) {
        setUploadOpen(false);
        router.push(`/editor?project=${result.data.id}`);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <DashboardHeader onSearch={searchProjects} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tight">
                {user?.user_metadata?.full_name
                  ? `Welcome back, ${user.user_metadata.full_name.split(" ")[0]} 👋`
                  : "Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your PDF projects and documents.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Upload PDF */}
              <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload a PDF</DialogTitle>
                  </DialogHeader>
                  <UploadDropzone onUpload={handleUpload} className="mt-2" />
                </DialogContent>
              </Dialog>

              {/* New project */}
              <CreateProjectDialog onSubmit={handleCreateProject} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsWithData.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-5 flex items-center gap-4"
              >
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base">Recent Projects</h2>
              {projects.length > 0 && (
                <Button variant="ghost" size="sm" className="text-ink-600 hover:text-ink-700">
                  View all
                </Button>
              )}
            </div>

            {loading ? (
              /* Skeleton loading */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-xl border border-border overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-2xl text-center">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-base mb-1">No projects yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Create a new project or upload a PDF to get started with editing.
                </p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => setUploadOpen(true)} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </Button>
                  <CreateProjectDialog onSubmit={handleCreateProject} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
