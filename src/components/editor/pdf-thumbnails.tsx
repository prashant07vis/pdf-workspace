"use client";

import { FileText, Loader2 } from "lucide-react";
import { PdfPageInfo } from "@/hooks/usePdfLoader";
import { cn } from "@/lib/utils";

interface PdfThumbnailsProps {
  pages: PdfPageInfo[];
  currentPage: number;
  isRendering: boolean;
  pageCount: number;
  onPageSelect: (page: number) => void;
}

export function PdfThumbnails({
  pages,
  currentPage,
  isRendering,
  pageCount,
  onPageSelect,
}: PdfThumbnailsProps) {
  return (
    <aside className="w-[100px] border-r border-border bg-muted/20 flex flex-col h-full overflow-hidden shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pages
        </span>
        {isRendering && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Thumbnails list */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-2">
        {pages.length === 0 && pageCount === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-center">
            <FileText className="h-5 w-5 text-muted-foreground/30" />
            <span className="text-[10px] text-muted-foreground/60 leading-tight">
              Upload a PDF to see pages
            </span>
          </div>
        ) : (
          <>
            {/* Rendered thumbnails */}
            {pages.map((page) => (
              <button
                key={page.pageNumber}
                onClick={() => onPageSelect(page.pageNumber)}
                className={cn(
                  "w-full flex flex-col items-center gap-1 rounded-lg p-1 transition-all group",
                  currentPage === page.pageNumber
                    ? "ring-2 ring-ink-500 bg-ink-50 dark:bg-ink-950/40"
                    : "ring-1 ring-border hover:ring-ink-300 dark:hover:ring-ink-700 hover:bg-accent"
                )}
              >
                {/* Thumbnail image */}
                <div className="w-full rounded overflow-hidden bg-white border border-border/50 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.thumbnailUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-auto block"
                    draggable={false}
                  />
                </div>
                {/* Page number */}
                <span
                  className={cn(
                    "text-[10px] font-medium tabular-nums",
                    currentPage === page.pageNumber
                      ? "text-ink-600 dark:text-ink-400"
                      : "text-muted-foreground"
                  )}
                >
                  {page.pageNumber}
                </span>
              </button>
            ))}

            {/* Skeleton placeholders for pages still rendering */}
            {isRendering &&
              Array.from({ length: pageCount - pages.length }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="w-full flex flex-col items-center gap-1 rounded-lg p-1 ring-1 ring-border"
                >
                  <div className="w-full aspect-[3/4] rounded bg-muted animate-pulse" />
                  <div className="h-3 w-4 rounded bg-muted animate-pulse" />
                </div>
              ))}
          </>
        )}
      </div>
    </aside>
  );
}
