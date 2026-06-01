import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950/50 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-300 mb-4">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            From upload to export in minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No learning curve. Just open, edit, and export.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-[2px] bg-gradient-to-r from-ink-200 via-ink-400 to-ink-200 dark:from-ink-800 dark:via-ink-600 dark:to-ink-800 hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-600 text-white font-display font-bold text-xl mb-5 shadow-lg shadow-ink-600/25">
                  {step.step}
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink-400 hidden lg:block translate-x-full" />
                  )}
                </div>

                <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
