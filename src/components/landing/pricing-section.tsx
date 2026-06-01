"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950/50 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-300 mb-4">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            No hidden fees. Cancel anytime. All plans include a 14-day trial.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
            {(["monthly", "yearly"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBilling(period)}
                className={cn(
                  "rounded-full px-5 py-1.5 text-sm font-medium transition-all capitalize",
                  billing === period
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {period}
                {period === "yearly" && (
                  <span className="ml-1.5 text-xs text-emerald-600 font-semibold">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col",
                plan.highlighted
                  ? "border-ink-500 bg-ink-600 text-white shadow-xl shadow-ink-600/20 scale-[1.02]"
                  : "border-border bg-card"
              )}
            >
              {plan.highlighted && (
                <Badge
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 border-0 text-xs font-semibold"
                >
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "font-bold text-xl mb-1",
                    plan.highlighted ? "text-white" : "text-foreground"
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.highlighted ? "text-ink-200" : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span
                    className={cn(
                      "text-4xl font-display font-bold",
                      plan.highlighted ? "text-white" : "text-foreground"
                    )}
                  >
                    $
                    {billing === "monthly"
                      ? plan.price_monthly
                      : plan.price_yearly}
                  </span>
                  {plan.price_monthly > 0 && (
                    <span
                      className={cn(
                        "text-sm mb-1.5",
                        plan.highlighted ? "text-ink-200" : "text-muted-foreground"
                      )}
                    >
                      / mo
                    </span>
                  )}
                </div>
                {plan.price_monthly === 0 && (
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-ink-200" : "text-muted-foreground"
                    )}
                  >
                    Free forever
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        plan.highlighted ? "text-ink-200" : "text-ink-600"
                      )}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-ink-100" : "text-muted-foreground"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                variant={plan.highlighted ? "outline" : "ink"}
                className={cn(
                  plan.highlighted &&
                    "border-white text-white hover:bg-white hover:text-ink-700 bg-transparent"
                )}
              >
                <Link href="/register">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
