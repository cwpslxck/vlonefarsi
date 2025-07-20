"use client";

import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">
            در حال بررسی احراز هویت...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 border border-border space-y-4">
        <h1 className="text-xl font-bold text-center">
          سلام {user?.user_metadata?.displayName || "اومفی"}!
        </h1>
        <div className="text-sm space-y-1">
          <p>
            <span className="text-muted-foreground">ایمیل:</span> {user?.email}
          </p>
          <p>
            <span className="text-muted-foreground">آی‌دی:</span> {user?.id}
          </p>
        </div>
        <Button
          variant="destructive"
          className="w-full mt-4"
          onClick={handleLogout}
        >
          خروج از حساب
        </Button>
      </div>
    </div>
  );
}
