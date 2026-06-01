"use client";

import Link from "next/link";
import {
  MousePointer2,
  Type,
  Image,
  Shapes,
  PenLine,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Save,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ToolType, EditorState } from "@/types";
import { cn } from "@/lib/utils";

const TOOLS: {
  id: ToolType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
}[] = [
  { id: "select", label: "Select", icon: MousePointer2, shortcut: "V" },
  { id: "text", label: "Text", icon: Type, shortcut: "T" },
  { id: "image", label: "Image", icon: Image, shortcut: "I" },
  { id: "rectangle", label: "Shapes", icon: Shapes, shortcut: "S" },
  { id: "signature", label: "Signature", icon: PenLine, shortcut: "G" },
];

interface EditorToolbarProps {
  state: EditorState;
  projectName?: string;
  onToolSelect: (tool: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomChange: (zoom: number) => void;
  onSave?: () => void;
  onExport?: () => void;
}

export function EditorToolbar({
  state,
  projectName = "Untitled",
  onToolSelect,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onSave,
  onExport,
}: EditorToolbarProps) {
  return (
    <TooltipProvider delayDuration={400}>
      <header className="flex items-center h-14 border-b border-border bg-background px-3 gap-2 shrink-0">
        {/* Back + logo */}
        <div className="flex items-center gap-2 mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" asChild>
                <Link href="/">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back to Home</TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-ink-600 flex items-center justify-center">
              <FileText className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium max-w-[140px] truncate hidden sm:inline">
              {projectName}
            </span>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Undo / Redo */}
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onUndo}
                disabled={!state.canUndo}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onRedo}
                disabled={!state.canRedo}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Tool buttons */}
        <div className="flex items-center gap-0.5">
          {TOOLS.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onToolSelect(tool.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                    state.activeTool === tool.id
                      ? "bg-ink-100 dark:bg-ink-950/60 text-ink-700 dark:text-ink-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <tool.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {tool.label}
                {tool.shortcut && (
                  <kbd className="ml-1.5 text-[10px] opacity-60">{tool.shortcut}</kbd>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onZoomOut}>
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
          <span className="text-xs text-muted-foreground w-10 text-center tabular-nums">
            {state.zoom}%
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onZoomIn}>
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save (Ctrl+S)</TooltipContent>
          </Tooltip>
          <Button variant="ink" size="sm" className="gap-1.5" onClick={onExport}>
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </header>
    </TooltipProvider>
  );
}
