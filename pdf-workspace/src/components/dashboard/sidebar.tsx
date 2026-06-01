"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  FileText,
  HelpCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "All Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

const BOTTOM_ITEMS = [
  { label: "Help & Support", href: "/help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-background h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-600 text-white">
          <FileText className="h-3.5 w-3.5" />
        </div>
        <span className="font-display font-bold text-sm tracking-tight">
          PDF Workspace
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-ink-50 dark:bg-ink-950/50 text-ink-700 dark:text-ink-300"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade banner */}
      <div className="px-3 pb-3">
        <div className="rounded-xl bg-gradient-to-br from-ink-600 to-ink-800 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-semibold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-ink-200 mb-3 leading-relaxed">
            Unlock unlimited projects, larger files, and team features.
          </p>
          <Link
            href="/#pricing"
            className="block w-full text-center text-xs font-semibold py-1.5 bg-white text-ink-700 rounded-lg hover:bg-ink-50 transition-colors"
          >
            View Plans
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-border px-3 py-3 space-y-0.5">
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
