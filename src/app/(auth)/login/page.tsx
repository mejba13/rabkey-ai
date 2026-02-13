"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { GamingButton } from "@/components/gaming";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SocialButton } from "@/components/auth/social-button";
import { useAuthStore } from "@/stores/auth-store";
import { authenticateSeedUser } from "@/lib/seed-users";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    // Check against seed credentials
    const seedUser = authenticateSeedUser(email, password);

    if (seedUser) {
      login(seedUser);
      toast.success("Welcome back!", {
        description: `Signed in as ${seedUser.name}.`,
      });
      setLoading(false);
      router.push(seedUser.role === "admin" ? "/admin" : "/dashboard");
      return;
    }

    // For demo: also allow any valid email/password as a free user
    login({
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role: "user",
      tier: "free",
      joinedAt: new Date().toISOString(),
    });

    toast.success("Welcome back!", {
      description: "You have been successfully logged in.",
    });

    setLoading(false);
    router.push("/dashboard");
  }

  function handleSocialLogin(provider: string) {
    toast.info(`${provider} login`, {
      description: `Redirecting to ${provider}...`,
    });
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your GrabKey AI account to track deals and save."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Social login */}
        <div className="grid grid-cols-3 gap-3">
          <SocialButton
            provider="google"
            onClick={() => handleSocialLogin("Google")}
            disabled={loading}
          />
          <SocialButton
            provider="steam"
            onClick={() => handleSocialLogin("Steam")}
            disabled={loading}
          />
          <SocialButton
            provider="discord"
            onClick={() => handleSocialLogin("Discord")}
            disabled={loading}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground font-medium">
            or continue with email
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              className="pl-10 bg-gaming-surface-elevated border-border h-11"
              autoComplete="email"
              disabled={loading}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-gaming-pink">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/login"
              className="text-xs text-gaming-orange hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((p) => ({ ...p, password: undefined }));
              }}
              className="pl-10 pr-10 bg-gaming-surface-elevated border-border h-11"
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-gaming-pink">{errors.password}</p>
          )}
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            disabled={loading}
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>

        {/* Submit */}
        <GamingButton
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              <LogIn className="size-4" />
              Sign In
            </>
          )}
        </GamingButton>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-gaming-orange hover:underline font-medium"
          >
            Create one free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
