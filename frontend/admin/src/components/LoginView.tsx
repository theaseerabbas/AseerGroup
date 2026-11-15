import { useState, type FormEvent } from "react";
import { ArrowUpRight, Eye, EyeOff, Lock } from "lucide-react";
import { loginAdmin, type AdminUser } from "@/lib/api";
import { Logo } from "./Logo";
import { SpotlightCard } from "./SpotlightCard";

export function LoginView({ onLogin }: { onLogin: (user: AdminUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginAdmin(email.trim(), password);
      onLogin(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <SpotlightCard className="rounded-[2rem] border border-border bg-card p-8 shadow-float md:p-10">
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-jade">
            <Lock className="size-3.5" />
            Centralized Portal
          </div>
          <h1 className="display mt-4 text-3xl">
            Admin <span className="serif-i text-jade">sign in.</span>
          </h1>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
            Use your Supabase administrator credentials to manage submissions across The Aseer Group
            and its subsidiaries.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="eyebrow">Email address</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@theaseergroup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2.5 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none transition-all duration-300 placeholder:text-muted-foreground/55 focus:border-jade focus:ring-4 focus:ring-jade/10"
              />
            </label>

            <label className="block">
              <span className="eyebrow">Password</span>
              <div className="relative mt-2.5">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-input bg-background py-3.5 pl-4 pr-11 text-[15px] outline-none transition-all duration-300 placeholder:text-muted-foreground/55 focus:border-jade focus:ring-4 focus:ring-jade/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[13px] text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground transition-all duration-500 ease-apple hover:bg-jade active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to portal"}
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>
        </SpotlightCard>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          The Aseer Group · Internal Administration
        </p>
      </div>
    </div>
  );
}
