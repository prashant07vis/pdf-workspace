"use client";

import { useState } from "react";
import { Shield, Key, Smartphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">Security</h2>
        <p className="text-sm text-muted-foreground">
          Manage your password and security settings.
        </p>
      </div>

      {/* Change password */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Change Password</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Current password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1.5">
            <Label>New password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Confirm new password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button variant="ink" size="sm">
            Update Password
          </Button>
        </div>
      </div>

      <Separator />

      {/* 2FA */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Two-Factor Authentication</h3>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border p-4">
          <div>
            <p className="text-sm font-medium">Authenticator app</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Use an app like Authy or Google Authenticator.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="warning">Not enabled</Badge>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Active sessions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Active Sessions</h3>
        </div>
        <div className="space-y-3">
          {[
            { device: "Chrome on macOS", location: "New York, US", current: true, time: "Now" },
            { device: "Safari on iPhone", location: "New York, US", current: false, time: "2 days ago" },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{session.device}</p>
                  {session.current && (
                    <Badge variant="success" className="text-[10px]">Current</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {session.location} · {session.time}
                </p>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive gap-1.5">
                  <LogOut className="h-3.5 w-3.5" />
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Danger zone */}
      <div>
        <h3 className="text-sm font-semibold text-destructive mb-4">Danger Zone</h3>
        <div className="rounded-xl border border-destructive/30 p-5">
          <p className="text-sm font-medium mb-1">Delete Account</p>
          <p className="text-xs text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button variant="destructive" size="sm">
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
}
