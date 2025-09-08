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

export function SignupForm({
  className,
  callbackUrl,
  ...props
}: React.ComponentProps<"div"> & { callbackUrl?: string }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: signupData, error: signupError } =
        await supabase.auth.signUp({
          phone,
          password,
          options: { data: { displayName: name } },
        });

      if (signupError) {
        if (signupError.message.includes("already registered")) {
          setError("این شماره از قبل وجود داره!");
        } else if (signupError.message.includes("Password should be")) {
          setError("پسورد باید حداقل ۶ کاراکتر باشه.");
        }
        setLoading(false);
        return;
      }

      if (signupData.session) {
        document.cookie = `auth_token=${signupData.session.access_token}; path=/; SameSite=Lax; Secure`;
        router.push(callbackUrl || "/");
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ phone, password });

      if (signInError) {
        setError("مشکلی در ثبت‌نام پیش اومد.");
        setLoading(false);
        return;
      }

      if (!signInData.session) {
        setError("مشکلی در ورود پیش اومد. لطفاً از صفحه ورود تلاش کن.");
        setLoading(false);
        return;
      }

      document.cookie = `auth_token=${signInData.session.access_token}; path=/; SameSite=Lax; Secure`;
      router.push(callbackUrl || "/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کن.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSignup}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold">ثبت‌نام در ویلون فارسی</h1>
            <div className="text-center text-sm">
              از قبل اکانت داری؟{" "}
              <Link
                href={`/login${
                  callbackUrl ? `?url=${encodeURIComponent(callbackUrl)}` : ""
                }`}
                className="underline underline-offset-4"
              >
                لاگین کن
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">اسم</Label>
              <Input
                id="name"
                type="text"
                placeholder="دوست داری چی صدات کنیم؟"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام در ویلون فارسی"}
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
