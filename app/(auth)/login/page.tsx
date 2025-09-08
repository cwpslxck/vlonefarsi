"use client";
import { LoginForm } from "@/components/login-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("url") || undefined;

  return (
    <div className="bg-background min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
