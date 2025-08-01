import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <header className="flex h-16 items-center w-full justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            داشبورد
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <SidebarTrigger className="block md:hidden" />
        </header>
        <div className="px-4 w-full">{children}</div>
      </div>
    </SidebarProvider>
  );
}
