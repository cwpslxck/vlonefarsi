import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Logo from "./logo";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Logo />
            </Link>
            <h1 className="text-xl font-bold">ثبت‌نام در ویلون فارسی</h1>
            <div className="text-center text-sm">
              از قبل اکانت داری؟{" "}
              <Link href="/login" className="underline underline-offset-4">
                لاگین کن
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="wtf@vlonefarsi.ir"
                required
                dir="ltr"
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
              />
            </div>
            <Button type="submit" className="w-full">
              ثبت‌نام در ویلون فارسی
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              یا
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              <FaDiscord />
              ادامه با دیسکورد
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <FaGoogle />
              ادامه با گوگل
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
