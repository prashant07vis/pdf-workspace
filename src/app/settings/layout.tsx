import Link from "next/link";
import { cn } from "@/lib/utils";

const SETTINGS_TABS = [
  { label: "Profile", href: "/settings" },
  { label: "Account", href: "/settings/account" },
  { label: "Billing", href: "/settings/billing" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Security", href: "/settings/security" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center h-16">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mr-8"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display font-bold text-lg">Settings</h1>
          </div>

          {/* Tab nav */}
          <nav className="flex items-center gap-0 -mb-[1px]">
            {SETTINGS_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
