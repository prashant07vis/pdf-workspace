import {
  FileEdit,
  Type,
  Shapes,
  PenLine,
  Users,
  Download,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileEdit,
  Type,
  Shapes,
  PenLine,
  Users,
  Download,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950/50 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-300 mb-4">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="text-ink-600">master PDFs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for viewing, annotating, editing, signing, and
            exporting PDFs — built for speed and precision.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-ink-300 dark:hover:border-ink-700 transition-all duration-300 hover:shadow-lg hover:shadow-ink-100/20 dark:hover:shadow-ink-950/20"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 dark:bg-ink-950/50 text-ink-600 dark:text-ink-400 group-hover:bg-ink-100 dark:group-hover:bg-ink-900/50 transition-colors">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>

                <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-ink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
