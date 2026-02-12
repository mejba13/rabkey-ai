"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { GamingButton } from "@/components/gaming";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SocialButton } from "@/components/auth/social-button";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-gaming-pink" };
  if (score <= 2) return { score: 2, label: "Fair", color: "bg-gaming-orange" };
  if (score <= 3) return { score: 3, label: "Good", color: "bg-gaming-gold" };
  if (score <= 4)
    return { score: 4, label: "Strong", color: "bg-gaming-teal" };
  return { score: 5, label: "Very Strong", color: "bg-gaming-teal" };
}

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const strength = password ? getPasswordStrength(password) : null;

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    login({
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      tier: "free",
      joinedAt: new Date().toISOString(),
    });

    toast.success("Account created!", {
      description: "Welcome to GrabKey AI. Start saving on game keys today!",
    });

    setLoading(false);
    router.push("/dashboard");
  }

  function handleSocialSignup(provider: string) {
    toast.info(`${provider} signup`, {
      description: `Redirecting to ${provider}...`,
    });
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of gamers finding the best deals with AI."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Social signup */}
        <div className="grid grid-cols-3 gap-3">
          <SocialButton
            provider="google"
            onClick={() => handleSocialSignup("Google")}
            disabled={loading}
          />
          <SocialButton
            provider="steam"
            onClick={() => handleSocialSignup("Steam")}
            disabled={loading}
          />
          <SocialButton
            provider="discord"
            onClick={() => handleSocialSignup("Discord")}
            disabled={loading}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground font-medium">
            or sign up with email
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              className="pl-10 bg-gaming-surface-elevated border-border h-11"
              autoComplete="name"
              disabled={loading}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-gaming-pink">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="reg-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
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
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              className="pl-10 pr-10 bg-gaming-surface-elevated border-border h-11"
              autoComplete="new-password"
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
          {/* Password strength meter */}
          {strength && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i < strength.score
                        ? strength.color
                        : "bg-gaming-surface-elevated"
                    )}
                  />
                ))}
              </div>
              <p
                className={cn(
                  "text-[10px] font-medium",
                  strength.score <= 1 && "text-gaming-pink",
                  strength.score === 2 && "text-gaming-orange",
                  strength.score === 3 && "text-gaming-gold",
                  strength.score >= 4 && "text-gaming-teal"
                )}
              >
                {strength.label}
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-gaming-pink">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError("confirmPassword");
              }}
              className="pl-10 pr-10 bg-gaming-surface-elevated border-border h-11"
              autoComplete="new-password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-gaming-pink">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={(checked) => {
                setAgreedToTerms(checked === true);
                clearError("terms");
              }}
              className="mt-0.5"
              disabled={loading}
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link
                href="/login"
                className="text-gaming-orange hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/login"
                className="text-gaming-orange hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-gaming-pink ml-7">{errors.terms}</p>
          )}
        </div>

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
              Creating account...
            </span>
          ) : (
            <>
              <UserPlus className="size-4" />
              Create Account
            </>
          )}
        </GamingButton>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-gaming-orange hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
