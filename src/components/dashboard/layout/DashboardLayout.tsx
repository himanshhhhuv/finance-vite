import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { useNavigate } from "react-router"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // Keyboard shortcuts for navigation
  useKeyboardShortcuts([
    {
      key: "1",
      ctrlKey: true,
      action: () => navigate("/dashboard"),
      description: "Go to Dashboard",
    },
    {
      key: "2",
      ctrlKey: true,
      action: () => navigate("/transactions"),
      description: "Go to Transactions",
    },
    {
      key: "3",
      ctrlKey: true,
      action: () => navigate("/insights"),
      description: "Go to Insights",
    },
  ]);
  return (
    <SidebarProvider
         style={
           {
             "--sidebar-width": "calc(var(--spacing) * 72)",
             "--header-height": "calc(var(--spacing) * 12)",
           } as React.CSSProperties
         }
       >
         <AppSidebar  />
         <SidebarInset>
           <SiteHeader />
           <div className="flex flex-1 flex-col">
             <div className="@container/main flex flex-1 flex-col gap-2">
               <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                 
                 <div className="px-4 lg:px-6">
                 {children}
                 </div>
                
               </div>
             </div>
           </div>
         </SidebarInset>
       </SidebarProvider>
  )
}