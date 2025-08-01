"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ShoppingBagIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import Link from "next/link";
import { DAHSBOARD_ITEMS } from "@/constants/menu-item";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" variant="floating" collapsible="icon" {...props}>
      <Link href={"/"} draggable="false" className="px-2 mt-4">
        <div>
          <Logo />
        </div>
      </Link>
      <SidebarContent>
        <NavMain items={DAHSBOARD_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
