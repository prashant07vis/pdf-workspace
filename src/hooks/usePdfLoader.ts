"use client";

import { useState, useCallback, useRef } from "react";

export interface PdfPageInfo {
  pageNumber: number;
  width: number;
  height: number;
  thumbnailUrl: string;
}

export interface PdfMetadata {
  fileName: string;
  fileSize: number;
  pageCount: number;
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modifiedDate?: string;
  pdfVersion?: string;
}

export interface PdfLoaderState {
  isLoading: boolean;
  isRendering: boolean;
  error: string | null;
  pageCount: number;
  currentPage: number;
  metadata: PdfMetadata | null;
  pages: PdfPageInfo[];
  pdfDoc: unknown | null;
}

const INITIAL_STATE: PdfLoaderState = {
  isLoading: false,
  isRendering: false,
  error: null,
  pageCount: 0,
  currentPage: 1,
  metadata: null,
  pages: [],
  pdfDoc: null,
};

export function usePdfLoader() {
  const [state, setState] = useState<PdfLoaderState>(INITIAL_STATE);
  const pdfDocRef = useRef<unknown>(null);

  const loadPdf = useCallback(async (file: File) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Dynamically import PDF.js to avoid SSR issues
      const pdfjsLib = await import("pdfjs-dist");

      // Set worker — use CDN worker to avoid bundling issues
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      pdfDocRef.current = pdfDoc;
      const pageCount = pdfDoc.numPages;

      // Extract metadata
      const metaData = await pdfDoc.getMetadata().catch(() => ({ info: {}, metadata: null }));
      const info = (metaData.info as Record<string, unknown>) ?? {};

      const metadata: PdfMetadata = {
        fileName: file.name,
        fileSize: file.size,
        pageCount,
        title: (info.Title as string) || undefined,
        author: (info.Author as string) || undefined,
        subject: (info.Subject as string) || undefined,
        creator: (info.Creator as string) || undefined,
        producer: (info.Producer as string) || undefined,
        pdfVersion: (pdfDoc as { pdfInfo?: { PDFFormatVersion?: string } }).pdfInfo?.PDFFormatVersion || undefined,
        creationDate: (info.CreationDate as string) || undefined,
        modifiedDate: (info.ModDate as string) || undefined,
      };

      // Generate thumbnails for all pages
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRendering: true,
        pageCount,
        metadata,
        pdfDoc,
        currentPage: 1,
      }));

      const pages: PdfPageInfo[] = [];
      for (let i = 1; i <= pageCount; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });

        // Generate thumbnail at small scale
        const thumbCanvas = document.createElement("canvas");
        const thumbScale = 120 / viewport.width;
        const thumbViewport = page.getViewport({ scale: thumbScale });
        thumbCanvas.width = thumbViewport.width;
        thumbCanvas.height = thumbViewport.height;
        const thumbCtx = thumbCanvas.getContext("2d")!;
        await page.render({ canvasContext: thumbCtx, viewport: thumbViewport }).promise;
        const thumbnailUrl = thumbCanvas.toDataURL("image/jpeg", 0.7);

        pages.push({
          pageNumber: i,
          width: viewport.width,
          height: viewport.height,
          thumbnailUrl,
        });

        // Update pages progressively
        setState((prev) => ({ ...prev, pages: [...pages] }));
      }

      setState((prev) => ({ ...prev, isRendering: false, pages }));
    } catch (err) {
      console.error("PDF load error:", err);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRendering: false,
        error: "Failed to load PDF. Please try a different file.",
      }));
    }
  }, []);

  const renderPage = useCallback(
    async (canvas: HTMLCanvasElement, pageNumber: number, scale: number) => {
      if (!pdfDocRef.current) return;
      try {
        const pdfjsLib = await import("pdfjs-dist");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfDoc = pdfDocRef.current as any;
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        void pdfjsLib; // suppress unused import warning
      } catch (err) {
        console.error("Page render error:", err);
      }
    },
    []
  );

  const goToPage = useCallback((page: number) => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.min(Math.max(1, page), prev.pageCount),
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.pageCount),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  }, []);

  const reset = useCallback(() => {
    pdfDocRef.current = null;
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    loadPdf,
    renderPage,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
}
