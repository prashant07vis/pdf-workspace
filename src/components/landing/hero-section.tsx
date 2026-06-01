import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-50 via-background to-background dark:from-ink-950/20" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, hsl(230 100% 65%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950/50 px-4 py-1.5 text-sm text-ink-700 dark:text-ink-300 mb-8 animate-fade-up">
          <span className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span className="font-medium">Loved by 10,000+ professionals</span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
        >
          Edit PDFs like a{" "}
          <span className="relative">
            <span className="text-ink-600">designer</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5C50 3 100 1 150 3.5C200 6 250 4 298 2"
                stroke="hsl(230 100% 60%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          ,<br />
          not a developer.
        </h1>

        {/* Subheading */}
        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          The visual PDF editor that lets you annotate, sign, and transform any
          PDF with pixel-perfect precision — no desktop software required.
        </p>

        {/* CTAs — Watch Demo removed */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          <Button size="xl" variant="ink" asChild className="gap-2 group">
            <Link href="/editor">
              Open Editor Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <Link href="#features">See Features</Link>
          </Button>
        </div>

        {/* Editor Preview mockup */}
        <div
          className="relative mx-auto max-w-5xl animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="absolute -inset-4 rounded-2xl bg-ink-600/10 blur-2xl" />
          <div className="relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-card">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 bg-background rounded-md max-w-xs mx-auto flex items-center justify-center text-xs text-muted-foreground">
                  app.pdfworkspace.com/editor
                </div>
              </div>
            </div>

            {/* Editor mockup body */}
            <div className="flex h-[420px]">
              {/* Left sidebar */}
              <div className="w-20 bg-muted/30 border-r border-border flex flex-col items-center py-3 gap-2">
                {[1, 2, 3].map((p) => (
                  <div
                    key={p}
                    className={`w-14 rounded border text-center flex flex-col items-center justify-center text-xs gap-1 cursor-pointer transition-all ${
                      p === 1
                        ? "border-ink-500 bg-ink-50 dark:bg-ink-950/50 text-ink-600"
                        : "border-border bg-background text-muted-foreground hover:border-ink-300"
                    }`}
                    style={{ height: "72px" }}
                  >
                    <div className={`w-8 h-10 rounded-sm ${p === 1 ? "bg-ink-100 dark:bg-ink-900" : "bg-muted"}`} />
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              {/* Center canvas */}
              <div className="flex-1 flex flex-col">
                <div className="h-12 border-b border-border bg-background flex items-center px-4 gap-1">
                  {["Select", "Text", "Shape", "Draw", "Sign"].map((tool) => (
                    <div
                      key={tool}
                      className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                        tool === "Text"
                          ? "bg-ink-100 dark:bg-ink-950 text-ink-700 dark:text-ink-300"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {tool}
                    </div>
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">100%</div>
                    <div className="h-5 w-[1px] bg-border" />
                    <div className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Saved
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-muted/20 flex items-center justify-center relative overflow-hidden">
                  <div className="w-64 h-80 bg-white rounded shadow-lg relative border border-border">
                    <div className="absolute top-6 left-6 right-6 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-full" />
                      <div className="h-2 bg-gray-100 rounded w-5/6" />
                      <div className="h-2 bg-gray-100 rounded w-4/6" />
                    </div>
                    <div className="absolute top-28 left-8 bg-ink-50 border-2 border-ink-400 border-dashed rounded px-2 py-1 text-xs text-ink-700 font-medium">
                      Click to edit text
                    </div>
                    <div className="absolute top-44 left-6 right-6 space-y-2">
                      <div className="h-2 bg-amber-200/70 rounded w-full" />
                      <div className="h-2 bg-gray-100 rounded w-4/5" />
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 border-b border-gray-300 flex items-end">
                      <span className="text-xs text-muted-foreground italic font-serif pb-1">Signature here...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="w-52 bg-background border-l border-border p-3 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Properties</p>
                {[
                  { label: "Font", value: "Inter" },
                  { label: "Size", value: "14px" },
                  { label: "Color", value: "#1e1e2e" },
                  { label: "Opacity", value: "100%" },
                ].map((prop) => (
                  <div key={prop.label}>
                    <p className="text-xs text-muted-foreground mb-1">{prop.label}</p>
                    <div className="h-7 rounded border border-border bg-muted/30 px-2 flex items-center text-xs">
                      {prop.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
