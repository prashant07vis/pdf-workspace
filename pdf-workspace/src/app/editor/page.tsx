"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Upload } from "lucide-react";
import { EditorToolbar } from "@/components/editor/toolbar";
import { EditorPagesSidebar } from "@/components/editor/pages-sidebar";
import { EditorCanvas } from "@/components/editor/canvas";
import { PropertiesPanel } from "@/components/editor/properties-panel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/components/dashboard/upload-dropzone";
import { useEditor } from "@/hooks/useEditor";
import { EditorPage } from "@/types";

// Placeholder pages for UI preview
const PLACEHOLDER_PAGES: EditorPage[] = [
  { id: "p1", project_id: "", page_number: 1, width: 794, height: 1123 },
  { id: "p2", project_id: "", page_number: 2, width: 794, height: 1123 },
  { id: "p3", project_id: "", page_number: 3, width: 794, height: 1123 },
];

function EditorContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const [pages] = useState<EditorPage[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const {
    state,
    setActiveTool,
    setActivePageIndex,
    zoomIn,
    zoomOut,
    setZoom,
    undo,
    redo,
  } = useEditor();

  const hasDocument = pages.length > 0;
  const displayPages = hasDocument ? pages : [];

  const handleUpload = async (_file: File) => {
    // PDF.js loading will be implemented here
    console.log("PDF upload — to be implemented:", projectId);
    setUploadOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Toolbar */}
      <EditorToolbar
        state={state}
        projectName="Untitled Project"
        onToolSelect={setActiveTool}
        onUndo={undo}
        onRedo={redo}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onZoomChange={setZoom}
        onSave={() => console.log("Save — to be implemented")}
        onExport={() => console.log("Export — to be implemented")}
      />

      {/* Main editor layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Pages sidebar */}
        <EditorPagesSidebar
          pages={displayPages}
          activePageIndex={state.activePageIndex}
          onPageSelect={setActivePageIndex}
          onAddPage={() => console.log("Add page — to be implemented")}
        />

        {/* Canvas */}
        <EditorCanvas
          state={state}
          hasDocument={hasDocument}
          onUploadClick={() => setUploadOpen(true)}
        />

        {/* Properties panel */}
        <PropertiesPanel
          activeTool={state.activeTool}
          selectedElement={null}
        />
      </div>

      {/* Upload dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload PDF to Editor
            </DialogTitle>
          </DialogHeader>
          <UploadDropzone onUpload={handleUpload} className="mt-2" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-ink-600 border-t-transparent animate-spin" />
          <span className="text-sm text-muted-foreground">Loading editor…</span>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
