"use client";

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Type,
  Palette,
  Layers,
  Lock,
  RotateCcw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToolType } from "@/types";
import { cn } from "@/lib/utils";

interface PropertiesPanelProps {
  activeTool: ToolType;
  selectedElement?: {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
  } | null;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-2">
      {title}
    </p>
  );
}

function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-1.5">
      <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
      {children}
    </div>
  );
}

function NumberInput({
  value,
  unit,
  disabled,
}: {
  value: number;
  unit?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center h-7 rounded-md border border-border bg-muted/30 px-2 text-xs gap-1">
      <span className={cn("flex-1 tabular-nums", disabled && "text-muted-foreground")}>
        {value}
      </span>
      {unit && <span className="text-muted-foreground">{unit}</span>}
    </div>
  );
}

export function PropertiesPanel({ activeTool, selectedElement }: PropertiesPanelProps) {
  const noSelection = !selectedElement;

  return (
    <aside className="w-[220px] border-l border-border bg-background flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-border shrink-0">
        <span className="text-xs font-semibold">Properties</span>
        {selectedElement && (
          <span className="text-[10px] text-muted-foreground capitalize bg-muted px-2 py-0.5 rounded-full">
            {selectedElement.type}
          </span>
        )}
      </div>

      {noSelection ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
            <Layers className="h-4 w-4 text-muted-foreground/50" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {activeTool === "select"
              ? "Select an element to edit its properties"
              : `Use the ${activeTool} tool to add elements`}
          </p>
        </div>
      ) : (
        <>
          {/* Position & Size */}
          <SectionHeader title="Transform" />
          <div className="grid grid-cols-2 gap-1.5 px-4 pb-2">
            {[
              { label: "X", value: selectedElement.x },
              { label: "Y", value: selectedElement.y },
              { label: "W", value: selectedElement.width },
              { label: "H", value: selectedElement.height },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
                <NumberInput value={Math.round(value)} unit="px" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1.5 px-4 pb-2">
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Rotation</p>
              <NumberInput value={selectedElement.rotation} unit="°" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Opacity</p>
              <NumberInput value={selectedElement.opacity} unit="%" />
            </div>
          </div>

          <Separator />

          {/* Text properties (shown for text elements) */}
          {selectedElement.type === "text" && (
            <>
              <SectionHeader title="Typography" />

              <PropertyRow label="Font family">
                <div className="h-7 rounded-md border border-border bg-muted/30 px-2 text-xs flex items-center justify-between">
                  <span>Geist Sans</span>
                  <span className="text-muted-foreground">▾</span>
                </div>
              </PropertyRow>

              <PropertyRow label="Font size">
                <NumberInput value={14} unit="px" />
              </PropertyRow>

              <div className="px-4 py-1.5">
                <p className="text-[10px] text-muted-foreground mb-1.5">Style</p>
                <div className="flex items-center gap-1">
                  {[Bold, Italic, Underline].map((Icon, i) => (
                    <button
                      key={i}
                      className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Icon className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-1.5">
                <p className="text-[10px] text-muted-foreground mb-1.5">Alignment</p>
                <div className="flex items-center gap-1">
                  {[AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
                    <button
                      key={i}
                      className={cn(
                        "h-7 w-7 rounded border flex items-center justify-center transition-colors",
                        i === 0
                          ? "border-ink-500 bg-ink-50 dark:bg-ink-950/40 text-ink-600"
                          : "border-border hover:bg-accent"
                      )}
                    >
                      <Icon className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Color */}
          <SectionHeader title="Appearance" />

          <PropertyRow label="Fill color">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md border border-border bg-ink-600 shrink-0 cursor-pointer" />
              <div className="flex-1 h-7 rounded-md border border-border bg-muted/30 px-2 text-xs flex items-center">
                #3d42f5
              </div>
            </div>
          </PropertyRow>

          <PropertyRow label="Stroke color">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md border border-border bg-transparent shrink-0 cursor-pointer flex items-center justify-center">
                <div className="h-4 w-4 rounded-sm border-2 border-muted-foreground/30" />
              </div>
              <div className="flex-1 h-7 rounded-md border border-border bg-muted/30 px-2 text-xs flex items-center text-muted-foreground">
                None
              </div>
            </div>
          </PropertyRow>

          <Separator />

          {/* Layer actions */}
          <SectionHeader title="Layer" />
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {[
              { label: "Lock", icon: Lock },
              { label: "Reset", icon: RotateCcw },
              { label: "Style", icon: Palette },
              { label: "Text", icon: Type },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
