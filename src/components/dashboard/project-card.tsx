"use client";

import Link from "next/link";
import {
  MoreHorizontal,
  Trash2,
  ExternalLink,
  FileText,
  Clock,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/types";
import { formatRelativeTime, formatBytes } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

const STATUS_BADGE: Record<
  Project["status"],
  { variant: "success" | "warning" | "secondary"; label: string }
> = {
  active: { variant: "success", label: "Active" },
  draft: { variant: "warning", label: "Draft" },
  archived: { variant: "secondary", label: "Archived" },
};

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const status = STATUS_BADGE[project.status];

  return (
    <div className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-ink-300 dark:hover:border-ink-700 hover:shadow-md transition-all duration-200">
      {/* Thumbnail */}
      <Link href={`/editor?project=${project.id}`}>
        <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center relative overflow-hidden">
          {project.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <div className="h-12 w-10 rounded border-2 border-muted-foreground/20 bg-background flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground/40" />
              </div>
              {project.page_count && (
                <span className="text-xs text-muted-foreground/60">
                  {project.page_count}{" "}
                  {project.page_count === 1 ? "page" : "pages"}
                </span>
              )}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-ink-600/0 group-hover:bg-ink-600/5 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-ink-600 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ExternalLink className="h-3 w-3" />
              Open editor
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            href={`/editor?project=${project.id}`}
            className="font-medium text-sm truncate hover:text-ink-600 transition-colors flex-1"
          >
            {project.name}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100 shrink-0"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/editor?project=${project.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Editor
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(project.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={status.variant} className="text-xs">
            {status.label}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(project.updated_at)}
          </span>
          {project.file_size && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <File className="h-3 w-3" />
              {formatBytes(project.file_size)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
