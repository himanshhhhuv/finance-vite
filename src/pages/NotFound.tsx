import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  ArrowRight, 
  HelpCircle, 
  Activity, 
  Info,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toUTCString().split(" ")[4]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(" ")[4]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#fcfcfd] text-slate-900 animate-in fade-in duration-1000 select-none">
      {/* Background ghost 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <span className="text-[40vw] font-black tracking-tighter leading-none">404</span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl animate-in slide-in-from-bottom-5 duration-1000">
        {/* Centerpiece Icon Group */}
        <div className="relative flex flex-col items-center mb-12">
            <div className="size-24 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 ring-8 ring-blue-500/5">
                <AlertCircle className="size-10 text-white" strokeWidth={2.5} />
            </div>
            <div className="h-0.5 w-12 bg-blue-600/20 mt-6 rounded-full" />
        </div>

        {/* Heading */}
        <div className="space-y-4 mb-12">
            <h1 className="text-5xl font-black tracking-tight text-blue-900 sm:text-6xl">
                Equilibrium <span className="font-light">Unfound</span>
            </h1>
            <p className="text-lg font-medium text-slate-500 max-w-lg leading-relaxed">
                The financial data you are seeking has moved to a new jurisdiction or does not exist in our current ledger.
            </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-6">
            <Button 
                onClick={() => navigate("/dashboard")}
                className="h-14 px-8 rounded-full bg-blue-600 text-base font-bold uppercase tracking-wider text-white shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            >
                Return to Dashboard
                <ArrowRight className="ml-2 size-5" />
            </Button>
            
            <button className="flex items-center gap-2 text-sm font-bold text-blue-800 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                <HelpCircle className="size-4" />
                Contact Institutional Support
            </button>
        </div>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-10 right-10 hidden xl:block animate-in slide-in-from-right-10 duration-1000 delay-500 fill-mode-both">
        <div className="w-80 rounded-3xl bg-white p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-slate-100">
            <div className="flex flex-col gap-4">
                <span className="text-sm font-black text-blue-900">Did you know?</span>
                <p className="text-xs leading-relaxed text-slate-500 font-medium">
                    Our Sovereign Intelligence engine updates global treasury benchmarks every 15 minutes to ensure absolute equilibrium.
                </p>
                <div className="flex items-center gap-1 mt-2">
                    <span className="size-2 rounded-full bg-blue-600" />
                    <span className="size-2 rounded-full bg-slate-200" />
                    <span className="size-2 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
      </div>

      {/* Footer Metadata */}
      <div className="absolute bottom-10 left-10 right-10 sm:left-auto sm:right-auto flex flex-col sm:flex-row items-center gap-8 md:gap-16 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 animate-in fade-in duration-1000 delay-700 fill-mode-both">
         <div className="flex items-center gap-3">
            <span className="text-slate-300">Status</span>
            <span className="flex items-center gap-2 text-slate-900">
                <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                Systems Operational
            </span>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-slate-300">Reference</span>
            <span className="text-slate-900">REQ-SI-404-0X92</span>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-slate-300">Timestamp</span>
            <span className="text-slate-900">UTC {time}</span>
         </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-in {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in { animation-name: fadeIn; }
        .slide-in-from-bottom-5 { animation-name: slideInUp; }
        .slide-in-from-right-10 { animation-name: slideInRight; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .fill-mode-both { animation-fill-mode: both; }
      `}</style>
    </div>
  );
}