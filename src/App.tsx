import { DashboardLayout } from "./components/dashboard/layout/DashboardLayout"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      
      <DashboardLayout>
           <div className="max-w-6xl mx-auto space-y-12 p-12">
             {/* Top section: New Project */}
             
     
             {/* Bottom section: Recent splits 60/40 */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left: Recent Projects */}
               <div className="lg:col-span-8">
              
               </div>
     
               {/* Right: Recent Templates */}
               <div className="lg:col-span-4">
                
               </div>
             </div>
           </div>
         </DashboardLayout>
      
    </div>
  )
}

export default App
