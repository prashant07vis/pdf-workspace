"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePdfLoader } from "@/hooks/usePdfLoader";
import { cn } from "@/lib/utils";

interface PdfViewerProps {
  pdfLoader: ReturnType<typeof usePdfLoader>;
  zoom: number;
  onUploadClick: () => void;
}

export function PdfViewer({ pdfLoader, zoom, onUploadClick }: PdfViewerProps) {
  const { state, renderPage, goToPage, nextPage, prevPage } = pdfLoader;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageInput, setPageInput] = useState("1");
  const [isPageRendering, setIsPageRendering] = useState(false);

  // Sync page input with state
  useEffect(() => {
    setPageInput(String(state.currentPage));
  }, [state.currentPage]);

  // Re-render canvas when page or zoom changes
  const doRender = useCallback(async () => {
    if (!canvasRef.current || state.pageCount === 0) return;
    setIsPageRendering(true);
    const scale = zoom / 100;
    await renderPage(canvasRef.current, state.currentPage, scale);
    setIsPageRendering(false);
  }, [state.currentPage, state.pageCount, zoom, renderPage]);

  useEffect(() => {
    doRender();
  }, [doRender]);

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const num = parseInt(pageInput, 10);
      if (!isNaN(num)) goToPage(num);
    }
  };

  const handlePageInputBlur = () => {
    const num = parseInt(pageInput, 10);
    if (!isNaN(num)) goToPage(num);
    else setPageInput(String(state.currentPage));
  };

  const scale = zoom / 100;
  // Use first page dimensions or A4 default
  const pageInfo = state.pages[state.currentPage - 1];
  const pageWidth = pageInfo ? pageInfo.width * scale : 794 * scale;
  const pageHeight = pageInfo ? pageInfo.height * scale : 1123 * scale;

  return (
    <main className="flex-1 overflow-auto bg-[#f0f0f0] dark:bg-[#1a1a1a] relative flex flex-col">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Error state */}
      {state.error && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4 p-8">
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-xl px-5 py-4 max-w-sm text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {state.error}
          </div>
          <Button variant="outline" onClick={onUploadClick}>
            Try another file
          </Button>
        </div>
      )}

      {/* Loading state */}
      {state.isLoading && !state.error && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-ink-600" />
            <p className="text-sm text-muted-foreground">Loading PDF…</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!state.isLoading && !state.error && state.pageCount === 0 && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-6 p-8">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="h-20 w-16 rounded-xl bg-background border-2 border-dashed border-border flex items-center justify-center shadow-sm">
              <FileText className="h-8 w-8 text-muted-foreground/30" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">No document loaded</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload a PDF to view and edit it. Drag & drop or click to browse.
              </p>
            </div>
            <Button variant="ink" className="gap-2" onClick={onUploadClick}>
              <Upload className="h-4 w-4" />
              Upload PDF
            </Button>
          </div>
        </div>
      )}

      {/* PDF canvas */}
      {!state.isLoading && !state.error && state.pageCount > 0 && (
        <div className="relative z-10 flex flex-col items-center py-8 px-4 flex-1">
          {/* Page container */}
          <div
            className="relative bg-white shadow-2xl"
            style={{ width: pageWidth, minHeight: pageHeight }}
          >
            {/* PDF.js canvas */}
            <canvas
              ref={canvasRef}
              className="block"
              style={{ width: pageWidth, height: pageHeight }}
            />

            {/* Page rendering overlay */}
            {isPageRendering && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <Loader2 className="h-6 w-6 animate-spin text-ink-600" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      {state.pageCount > 0 && (
        <div className="sticky bottom-0 z-20 flex items-center justify-center py-3 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-background/95 backdrop-blur border border-border shadow-lg px-3 py-2">
            {/* Prev */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={prevPage}
              disabled={state.currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page input */}
            <div className="flex items-center gap-1.5 text-xs">
              <Input
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={handlePageInputSubmit}
                onBlur={handlePageInputBlur}
                className="h-7 w-12 text-center text-xs px-1 tabular-nums"
              />
              <span className="text-muted-foreground">
                / {state.pageCount}
              </span>
            </div>

            {/* Next */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={nextPage}
              disabled={state.currentPage >= state.pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Zoom badge */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="rounded-lg bg-background/90 backdrop-blur border border-border shadow-sm px-3 py-1.5 text-xs font-medium tabular-nums text-muted-foreground">
          {zoom}%
        </div>
      </div>
    </main>
  );
}
