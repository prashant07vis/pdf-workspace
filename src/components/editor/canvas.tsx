"use client";

import { useRef, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorState } from "@/types";
import { cn } from "@/lib/utils";

interface EditorCanvasProps {
  state: EditorState;
  hasDocument: boolean;
  onUploadClick?: () => void;
}

export function EditorCanvas({ state, hasDocument, onUploadClick }: EditorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Fabric.js canvas will be initialized here
    // Placeholder for future implementation
  }, [canvasRef]);

  const canvasStyle = {
    transform: `scale(${state.zoom / 100})`,
    transformOrigin: "top center",
  };

  return (
    <main className="flex-1 overflow-auto bg-[#f0f0f0] dark:bg-[#1a1a1a] relative flex flex-col items-center">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {!hasDocument ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 relative z-10 p-8">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="h-20 w-16 rounded-xl bg-background border-2 border-dashed border-border flex items-center justify-center shadow-sm">
              <FileText className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1">No document loaded</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload a PDF to start editing. You can annotate, add text,
                shapes, and signatures.
              </p>
            </div>
            <Button variant="ink" className="gap-2" onClick={onUploadClick}>
              <Upload className="h-4 w-4" />
              Upload PDF
            </Button>
          </div>
        </div>
      ) : (
        /* Canvas area */
        <div className="py-8 px-4 relative z-10 flex flex-col items-center gap-4">
          <div style={canvasStyle}>
            {/* Page shadow + canvas */}
            <div
              className={cn(
                "relative bg-white shadow-2xl rounded-sm overflow-hidden",
                state.isLoading && "opacity-50"
              )}
              style={{ width: 794, minHeight: 1123 }} // A4 at 96dpi
            >
              {/* PDF.js rendered content will go here */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Fabric.js overlay canvas will be placed here */}
              <div
                id="fabric-canvas-container"
                className="absolute inset-0"
              />

              {/* Loading overlay */}
              {state.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-ink-600 border-t-transparent animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading document…
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="rounded-lg bg-background/90 backdrop-blur border border-border shadow-sm px-3 py-1.5 text-xs font-medium tabular-nums text-muted-foreground">
          {state.zoom}%
        </div>
      </div>

      {/* Tool cursor indicator */}
      {state.activeTool !== "select" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="rounded-full bg-ink-600 text-white text-xs font-medium px-3 py-1.5 shadow-lg capitalize">
            {state.activeTool} tool active
          </div>
        </div>
      )}
    </main>
  );
}
