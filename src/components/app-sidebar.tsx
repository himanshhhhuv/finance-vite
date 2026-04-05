import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link, useLocation } from "react-router";
import {
  Sparkles,
  Zap,
  Settings,
  LayoutDashboard,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const platformItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: History },
  { title: "Insights", url: "/insights", icon: Zap },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r-0 bg-sidebar">
      {/* Branding Header */}
      <SidebarHeader className="px-2 py-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/5">
            <Sparkles className="size-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden group-data-[collapsible=icon]:hidden">
             <span className="text-[12px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 leading-none">
                Sovereign
             </span>
             <span className="text-xl font-black tracking-tighter text-blue-900 leading-none">
                Equilibrium
             </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">
            Platform Hub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-300",
                        isActive 
                          ? "!bg-blue-600 !text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:text-white" 
                          : "hover:bg-muted/80"
                      )}
                    >
                      <Link to={item.url}>
                        <item.icon className={cn("size-4.5", isActive ? "" : "text-muted-foreground")} />
                        <span className="font-bold tracking-tight">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">
            System Control
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-300",
                        isActive 
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:text-white" 
                          : "hover:bg-muted/80"
                      )}
                    >
                      <Link to={item.url}>
                        <item.icon className={cn("size-4.5", isActive ? "text-white" : "text-muted-foreground")} />
                        <span className="font-bold tracking-tight">{item.title}</span>
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