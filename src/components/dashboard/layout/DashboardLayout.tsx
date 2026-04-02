import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
     <AppSidebar  />
      <main>
     
          
        <SidebarTrigger />
     
       

              
             
        {children}
      </main>
    </SidebarProvider>
  )
}