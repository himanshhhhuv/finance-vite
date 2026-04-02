import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link, useLocation } from "react-router";
import { Sparkles,  Zap, Settings,LayoutGrid ,History} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Transactions", url: "/transactions", icon: History },
    { title: "Insights", url: "/insights", icon: Zap },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="inset">
      {/* Logo / Brand */}
      <SidebarHeader className="border-b border-sidebar-border px-3 py-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-sm tracking-tight"
        >
          <div className=" flex size-8 shrink-0 items-center justify-center">
            <Sparkles/>
          </div>
          <span className="truncate text-sidebar-foreground">finance.Inc</span>
        </Link>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    
   
     
    </Sidebar>
  );
}