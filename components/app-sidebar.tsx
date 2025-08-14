"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { DAHSBOARD_ITEMS } from "@/constants/menu-item";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" variant="floating" collapsible="icon" {...props}>
      <div className="px-2 mt-4">
        <Logo />
      </div>
      <SidebarContent>
        <NavMain items={DAHSBOARD_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
