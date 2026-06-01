"use client";

import { FileText, Info, Calendar, User, Hash, HardDrive } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PdfMetadata } from "@/hooks/usePdfLoader";
import { formatBytes } from "@/lib/utils";

interface PdfMetadataPanelProps {
  metadata: PdfMetadata | null;
  currentPage: number;
  zoom: number;
}

function MetaRow({ label, value, icon: Icon }: {
  label: string;
  value?: string | null;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  if (!value) return null;
  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-1.5 mb-0.5">
        {Icon && <Icon className="h-3 w-3 text-muted-foreground/60" />}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          {label}
        </p>
      </div>
      <p className="text-xs text-foreground break-words leading-relaxed">{value}</p>
    </div>
  );
}

function formatPdfDate(raw?: string): string | undefined {
  if (!raw) return undefined;
  // PDF dates: D:20231015120000+05'30'
  try {
    const clean = raw.replace(/^D:/, "").slice(0, 14);
    const year = clean.slice(0, 4);
    const month = clean.slice(4, 6);
    const day = clean.slice(6, 8);
    if (year && month && day) {
      return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch {
    // ignore
  }
  return raw;
}

export function PdfMetadataPanel({ metadata, currentPage, zoom }: PdfMetadataPanelProps) {
  return (
    <aside className="w-[220px] border-l border-border bg-background flex flex-col h-full overflow-y-auto shrink-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-border shrink-0">
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold">Document Info</span>
      </div>

      {!metadata ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
            <FileText className="h-4 w-4 text-muted-foreground/40" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Upload a PDF to see document metadata
          </p>
        </div>
      ) : (
        <>
          {/* Viewer state */}
          <div className="px-4 py-3 space-y-2 border-b border-border bg-muted/20">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Current page</span>
              <span className="font-medium tabular-nums">
                {currentPage} / {metadata.pageCount}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Zoom</span>
              <span className="font-medium tabular-nums">{zoom}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Pages</span>
              <span className="font-medium tabular-nums">{metadata.pageCount}</span>
            </div>
          </div>

          {/* File info */}
          <div className="py-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-4 py-2">
              File
            </p>

            <MetaRow
              label="File name"
              value={metadata.fileName}
              icon={FileText}
            />
            <MetaRow
              label="File size"
              value={formatBytes(metadata.fileSize)}
              icon={HardDrive}
            />
            <MetaRow
              label="PDF version"
              value={metadata.pdfVersion ? `PDF ${metadata.pdfVersion}` : undefined}
              icon={Hash}
            />
          </div>

          {(metadata.title || metadata.author || metadata.subject || metadata.creator || metadata.producer) && (
            <>
              <Separator />
              <div className="py-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-4 py-2">
                  Document
                </p>
                <MetaRow label="Title" value={metadata.title} icon={FileText} />
                <MetaRow label="Author" value={metadata.author} icon={User} />
                <MetaRow label="Subject" value={metadata.subject} />
                <MetaRow label="Creator" value={metadata.creator} />
                <MetaRow label="Producer" value={metadata.producer} />
              </div>
            </>
          )}

          {(metadata.creationDate || metadata.modifiedDate) && (
            <>
              <Separator />
              <div className="py-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-4 py-2">
                  Dates
                </p>
                <MetaRow
                  label="Created"
                  value={formatPdfDate(metadata.creationDate)}
                  icon={Calendar}
                />
                <MetaRow
                  label="Modified"
                  value={formatPdfDate(metadata.modifiedDate)}
                  icon={Calendar}
                />
              </div>
            </>
          )}
        </>
      )}
    </aside>
  );
}
