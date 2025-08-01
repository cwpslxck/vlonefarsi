"use client";

import { Bell, BugIcon, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { DAHSBOARD_ITEMS } from "@/constants/menu-item";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex items-center gap-3 w-full flex-row-reverse">
                <div className="grid flex-1 text-right">
                  <span className="truncate font-medium">
                    {user?.user_metadata?.displayName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                  {loading && (
                    <div className="grid gap-0.5 flex-1">
                      <Skeleton className="w-1/3 h-5"></Skeleton>
                      <Skeleton className="w-3/4 h-4"></Skeleton>
                    </div>
                  )}
                </div>
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-sidebar-primary">
                    {user?.user_metadata?.displayName.slice(0, 2) || "وف"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg text-right"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="px-2 font-normal">
              <div className="flex items-center gap-3 w-full">
                <div className="grid flex-1 text-right">
                  <span className="truncate font-medium">
                    {user?.user_metadata?.displayName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-sidebar-primary">
                    {user?.user_metadata?.displayName.slice(0, 2) || "وف"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/help-us"}>
                <DropdownMenuItem className="flex-row-reverse cursor-pointer">
                  <Sparkles className="mx-1" />
                  <span>کمک به ویلون فارسی</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <Link href={"/report"}>
                <DropdownMenuItem className="flex-row-reverse cursor-pointer">
                  <BugIcon className="mx-1" />
                  <span>گزارش باگ</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex-row-reverse"
            >
              <LogOut className="mx-1 text-destructive" />
              <span className="text-destructive">خروج از حساب</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
