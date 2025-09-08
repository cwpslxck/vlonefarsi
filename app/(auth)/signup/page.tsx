"use client";
import { SignupForm } from "@/components/signup-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignupPageContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("url") || undefined;

  return (
    <div className="bg-background min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupPageContent />
    </Suspense>
  );
}
