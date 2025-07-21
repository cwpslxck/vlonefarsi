import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        setUser(data.session.user);
        document.cookie = `auth_token=${data.session.access_token}; path=/; SameSite=Lax`;
      } else {
        router.push("/login");
        return;
      }

      setLoading(false);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        router.push("/login");
      } else if (session?.user) {
        setUser(session.user);
        setLoading(false);
        document.cookie = `auth_token=${session.access_token}; path=/; SameSite=Lax`;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
