"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, validatePdfFile } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onUpload: (file: File) => Promise<void>;
  className?: string;
}

export function UploadDropzone({ onUpload, className }: UploadDropzoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted: File[], rejected: File[]) => {
    setError(null);
    if (rejected.length > 0) {
      setError("Only PDF files are accepted.");
      return;
    }
    const f = accepted[0];
    const validationError = validatePdfFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
      setFile(null);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200",
            isDragActive
              ? "border-ink-500 bg-ink-50 dark:bg-ink-950/20"
              : "border-border hover:border-ink-300 dark:hover:border-ink-700 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                isDragActive
                  ? "bg-ink-100 dark:bg-ink-900"
                  : "bg-muted"
              )}
            >
              <Upload
                className={cn(
                  "h-5 w-5 transition-colors",
                  isDragActive ? "text-ink-600" : "text-muted-foreground"
                )}
              />
            </div>
            <div>
              <p className="text-sm font-medium">
                {isDragActive ? "Drop your PDF here" : "Drag & drop a PDF"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or{" "}
                <span className="text-ink-600 font-medium underline-offset-2 hover:underline">
                  browse files
                </span>{" "}
                · Max 50MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 dark:bg-ink-950/50">
            <FileText className="h-5 w-5 text-ink-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setFile(null)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm rounded-lg bg-destructive/10 p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          loading={uploading}
          variant="ink"
          className="w-full"
        >
          Upload PDF
        </Button>
      )}
    </div>
  );
}
