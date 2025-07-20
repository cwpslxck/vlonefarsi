"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-muted-foreground">
          در حال بارگذاری اطلاعات...
        </p>
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500 text-sm">کاربری پیدا نشد.</p>
        <Button onClick={() => (window.location.href = "/login")}>
          رفتن به صفحه ورود
        </Button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 border border-border space-y-4">
        <h1 className="text-xl font-bold text-center">اطلاعات حساب کاربری</h1>
        <div className="text-sm space-y-1">
          <p>
            <span className="text-muted-foreground">ایمیل:</span> {user.email}
          </p>
          <p>
            <span className="text-muted-foreground">آی‌دی:</span> {user.id}
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
