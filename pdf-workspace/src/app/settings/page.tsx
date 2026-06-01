"use client";

import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

export default function SettingsProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user?.email?.[0]?.toUpperCase() || "U";

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: fullName } });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your public profile information.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="text-xl font-semibold bg-ink-100 text-ink-700">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-ink-600 text-white flex items-center justify-center hover:bg-ink-700 transition-colors shadow-md">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="font-medium text-sm">{fullName || "Your Name"}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
          <button className="text-xs text-ink-600 hover:underline mt-1">
            Change photo
          </button>
        </div>
      </div>

      <Separator />

      {/* Profile form */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email address</Label>
            <Input
              value={user?.email ?? ""}
              disabled
              className="text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here. Go to Security settings.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Bio</Label>
          <textarea
            className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Tell us a bit about yourself…"
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Plan info */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Current Plan</h3>
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="font-medium text-sm">Starter (Free)</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              5 projects · 10MB file limit
            </p>
          </div>
          <Button variant="ink" size="sm" asChild>
            <a href="/#pricing">Upgrade to Pro</a>
          </Button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <Button variant="ink" onClick={handleSave} loading={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
        {saved && (
          <span className="text-sm text-emerald-600 font-medium animate-fade-in">
            Profile updated successfully
          </span>
        )}
      </div>
    </div>
  );
}
