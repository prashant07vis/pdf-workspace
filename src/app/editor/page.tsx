"use client";

import { useState, Suspense } from "react";
import { Upload } from "lucide-react";
import { EditorToolbar } from "@/components/editor/toolbar";
import { PdfThumbnails } from "@/components/editor/pdf-thumbnails";
import { PdfViewer } from "@/components/editor/pdf-viewer";
import { PdfMetadataPanel } from "@/components/editor/pdf-metadata-panel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditor } from "@/hooks/useEditor";
import { usePdfLoader } from "@/hooks/usePdfLoader";
import { UploadDropzone } from "@/components/dashboard/upload-dropzone";

function EditorContent() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const {
    state,
    setActiveTool,
    zoomIn,
    zoomOut,
    setZoom,
    undo,
    redo,
  } = useEditor();

  const pdfLoader = usePdfLoader();
  const { state: pdfState, goToPage } = pdfLoader;

  const handleUpload = async (file: File) => {
    setUploadOpen(false);
    await pdfLoader.loadPdf(file);
  };

  const projectName = pdfState.metadata?.fileName
    ? pdfState.metadata.fileName.replace(/\.pdf$/i, "")
    : "PDF Workspace";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Toolbar */}
      <EditorToolbar
        state={state}
        projectName={projectName}
        onToolSelect={setActiveTool}
        onUndo={undo}
        onRedo={redo}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onZoomChange={setZoom}
        onSave={() => {}}
        onExport={() => {}}
      />

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Page Thumbnails */}
        <PdfThumbnails
          pages={pdfState.pages}
          currentPage={pdfState.currentPage}
          isRendering={pdfState.isRendering}
          pageCount={pdfState.pageCount}
          onPageSelect={goToPage}
        />

        {/* Center — PDF Viewer */}
        <PdfViewer
          pdfLoader={pdfLoader}
          zoom={state.zoom}
          onUploadClick={() => setUploadOpen(true)}
        />

        {/* Right — Metadata Panel */}
        <PdfMetadataPanel
          metadata={pdfState.metadata}
          currentPage={pdfState.currentPage}
          zoom={state.zoom}
        />
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload PDF
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
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-ink-600 border-t-transparent animate-spin" />
            <span className="text-sm text-muted-foreground">Loading editor…</span>
          </div>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
