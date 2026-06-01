"use client";

import { Check, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PRICING_PLANS } from "@/lib/constants";

const INVOICES = [
  { id: "INV-001", date: "May 1, 2026", amount: "$0.00", status: "Free" },
];

export default function BillingPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">Billing</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">Starter Plan</h3>
              <Badge variant="secondary">Free</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              $0/month · Renews automatically
            </p>
          </div>
          <Button variant="ink" className="gap-2 shrink-0">
            <Zap className="h-4 w-4" />
            Upgrade
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Projects</p>
            <p className="font-medium">5 / 5</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Storage</p>
            <p className="font-medium">0 MB / 100 MB</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Team members</p>
            <p className="font-medium">1 / 1</p>
          </div>
        </div>
      </div>

      {/* Plans comparison */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Available Plans</h3>
        <div className="space-y-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-5 flex items-center justify-between gap-4 ${
                plan.highlighted
                  ? "border-ink-400 bg-ink-50 dark:bg-ink-950/20"
                  : "border-border"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm">{plan.name}</p>
                  {plan.highlighted && (
                    <Badge variant="ink" className="text-[10px]">
                      Popular
                    </Badge>
                  )}
                  {plan.id === "free" && (
                    <Badge variant="success" className="text-[10px]">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {plan.features.slice(0, 3).join(" · ")}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-bold text-sm">
                    ${plan.price_monthly}
                    <span className="font-normal text-xs text-muted-foreground">
                      /mo
                    </span>
                  </p>
                </div>
                {plan.id !== "free" && (
                  <Button
                    variant={plan.highlighted ? "ink" : "outline"}
                    size="sm"
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Payment method */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Payment Method</h3>
        <div className="rounded-xl border border-dashed border-border p-6 flex flex-col items-center justify-center gap-3 text-center">
          <CreditCard className="h-8 w-8 text-muted-foreground/40" />
          <div>
            <p className="text-sm font-medium">No payment method on file</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add a payment method to upgrade your plan.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <CreditCard className="h-3.5 w-3.5" />
            Add payment method
          </Button>
        </div>
      </div>

      <Separator />

      {/* Invoices */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Billing History</h3>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Invoice
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{inv.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <Badge variant="success" className="gap-1">
                      <Check className="h-3 w-3" />
                      {inv.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
