"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, FileText, Mail, Lock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const passwordStrength = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await signUp(email, password, fullName);
    if (error) {
      const errMessage = (error as { message?: string })?.message;
      if (errMessage?.includes("already registered")) {
        setError("An account with this email already exists.");
      } else {
        setError("Failed to create account. Please try again.");
      }
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Account created!</h2>
          <p className="text-muted-foreground text-sm">
            Please check your email to verify your account. Redirecting to
            dashboard…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-ink-900 to-ink-700 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">PDF Workspace</span>
          </Link>

          {/* Feature highlights */}
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold leading-snug">
              Everything you need to work with PDFs, in one place.
            </h2>
            <div className="space-y-3">
              {[
                "Unlimited projects on Pro",
                "Real-time team collaboration",
                "Digital signatures & forms",
                "One-click PDF export",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-white/80">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40">
            No credit card required · Free plan forever
          </p>

          {/* Shapes */}
          <div className="absolute top-24 right-8 h-24 w-24 rounded-2xl border border-white/10 rotate-12 bg-white/5" />
          <div className="absolute bottom-40 right-16 h-16 w-16 rounded-2xl border border-white/10 -rotate-6 bg-white/5" />
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-600 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-display font-bold">PDF Workspace</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold tracking-tight mb-1">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start for free — no credit card needed
            </p>
          </div>

          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full gap-2 mb-6"
            onClick={() => signInWithGoogle()}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Alex Johnson"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setError(""); }}
                leftIcon={<User className="h-3.5 w-3.5" />}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                leftIcon={<Mail className="h-3.5 w-3.5" />}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                leftIcon={<Lock className="h-3.5 w-3.5" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                }
                autoComplete="new-password"
                required
              />

              {/* Password strength */}
              {password && (
                <div className="space-y-2 pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          passwordStrength >= i
                            ? passwordStrength === 1
                              ? "bg-red-400"
                              : passwordStrength === 2
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                            : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <div className="space-y-1">
                    {PASSWORD_REQUIREMENTS.map((req) => (
                      <div key={req.label} className="flex items-center gap-1.5">
                        <div
                          className={cn(
                            "h-3 w-3 rounded-full flex items-center justify-center",
                            req.test(password)
                              ? "bg-emerald-100 dark:bg-emerald-900/40"
                              : "bg-muted"
                          )}
                        >
                          {req.test(password) && (
                            <Check className="h-2 w-2 text-emerald-600" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[11px]",
                            req.test(password)
                              ? "text-emerald-600"
                              : "text-muted-foreground"
                          )}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" variant="ink" className="w-full" loading={loading}>
              Create Account
            </Button>

            <p className="text-[11px] text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-ink-600 hover:underline">Terms</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-ink-600 hover:underline">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-ink-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
