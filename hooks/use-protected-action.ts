"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export function useProtectedAction() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    getUser();
  }, []);

  const protect = <T extends (...args: any[]) => any>(action: T): T => {
    const wrappedFn = ((...args: any[]) => {
      if (!isLoggedIn) {
        router.push(`/login?url=${encodeURIComponent(pathname)}`);
        return;
      }

      return action(...args);
    }) as T;

    return wrappedFn;
  };

  return { protect, isLoggedIn };
}
