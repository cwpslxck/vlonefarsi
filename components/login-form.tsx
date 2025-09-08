"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Logo from "./logo";

export function LoginForm({
  className,
  callbackUrl,
  ...props
}: React.ComponentProps<"div"> & { callbackUrl?: string }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          setError("شماره یا رمز اشتباهه.");
        } else if (error.message.toLowerCase().includes("too many requests")) {
          setError("لطفا یکم صبر کن و دوباره تلاش کن.");
        }
        return;
      }

      if (!data.session) {
        setError("ورود ناموفق. لطفا دوباره تلاش کن.");
        return;
      }

      document.cookie = `auth_token=${data.session.access_token}; path=/; SameSite=Lax; Secure`;
      router.push(callbackUrl || "/");
    } catch (err) {
      console.log("Login error:", err);
      setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کن.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">ورود به ویلون فارسی</h1>
            <div className="text-center text-sm">
              اکانت نداری؟{" "}
              <Link
                href={`/signup${
                  callbackUrl ? `?url=${encodeURIComponent(callbackUrl)}` : ""
                }`}
                className="underline underline-offset-4"
              >
                ثبت‌نام کن
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="phone">شماره همراه</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="09171234567"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">پسورد</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                required
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </div>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              یا
            </span>
          </div>

          <Button variant="outline" disabled type="button" className="w-full">
            <FaGoogle />
            ادامه با گوگل
          </Button>
        </div>
      </form>
    </div>
  );
}
