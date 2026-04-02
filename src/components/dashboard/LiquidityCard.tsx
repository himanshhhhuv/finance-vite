import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";

interface LiquidityCardProps {
  balance: number;
}

export function LiquidityCard({ balance }: LiquidityCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-blue-600 p-8 text-white shadow-xl lg:col-span-2">
      <div className="relative z-10 flex flex-col gap-6 h-full justify-center">
        <div>
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100/60">Available Liquidity</p>
           <h2 className="text-5xl font-black tracking-tighter mt-1">{formatCurrency(balance)}</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary" className="gap-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border-white/20 px-3 font-bold uppercase tracking-tighter transition-all">
            <CreditCard className="size-3.5" />
            Main Checking
          </Button>
          <Button size="sm" variant="secondary" className="gap-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border-white/20 px-3 font-bold uppercase tracking-tighter transition-all">
            <Landmark className="size-3.5" />
            Reserves
          </Button>
        </div>
      </div>
      
      {/* Visual Decor */}
      <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 size-48 rounded-full bg-blue-400/20 blur-3xl" />
    </Card>
  );
}
