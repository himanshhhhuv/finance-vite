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
import { GalleryVerticalEnd, Home, BookOpen, Settings } from "lucide-react";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Learning Resources", url: "/learning", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      {/* Logo / Brand */}
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-sm tracking-tight"
        >
          <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="truncate text-sidebar-foreground">Mapnexa Lidar</span>
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

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border px-3 py-3 flex items-center justify-center text-xs text-muted-foreground">
        v1.0
      </SidebarFooter>
    </Sidebar>
  );
}