"use client";

import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorPage } from "@/types";
import { cn } from "@/lib/utils";

interface EditorPagesSidebarProps {
  pages: EditorPage[];
  activePageIndex: number;
  onPageSelect: (index: number) => void;
  onAddPage?: () => void;
}

export function EditorPagesSidebar({
  pages,
  activePageIndex,
  onPageSelect,
  onAddPage,
}: EditorPagesSidebarProps) {
  return (
    <aside className="w-[88px] border-r border-border bg-muted/20 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2.5 border-b border-border">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
          Pages
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onAddPage}
          className="h-5 w-5"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Pages list */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-2">
        {pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <FileText className="h-6 w-6 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground text-center">
              No pages
            </span>
          </div>
        ) : (
          pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => onPageSelect(index)}
              className={cn(
                "w-full flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-all group",
                activePageIndex === index
                  ? "ring-2 ring-ink-500 bg-ink-50 dark:bg-ink-950/40"
                  : "hover:bg-accent ring-1 ring-border"
              )}
            >
              {/* Page thumbnail */}
              <div
                className={cn(
                  "w-full aspect-[3/4] rounded bg-white border flex items-center justify-center overflow-hidden",
                  activePageIndex === index
                    ? "border-ink-400/30"
                    : "border-border"
                )}
              >
                {page.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={page.thumbnail_url}
                    alt={`Page ${page.page_number}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground/30" />
                )}
              </div>

              {/* Page number */}
              <span
                className={cn(
                  "text-[10px] font-medium tabular-nums",
                  activePageIndex === index
                    ? "text-ink-600 dark:text-ink-400"
                    : "text-muted-foreground"
                )}
              >
                {page.page_number}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
