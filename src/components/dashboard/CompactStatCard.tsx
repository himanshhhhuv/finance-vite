import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/calculations";

interface CompactStatCardProps {
  title: string;
  value: number;
  trend: number;
  isPositive: boolean;
  previousValue: number;
  icon: LucideIcon;
  className?: string;
  variant?: "emerald" | "rose" | "blue";
}

export function CompactStatCard({ 
  title, 
  value, 
  trend, 
  isPositive, 
  previousValue,
  icon: Icon, 
  className,
  variant = "blue"
}: CompactStatCardProps) {
  const variantStyles = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <Card className={cn("overflow-hidden lg:col-span-1", className)}>
      <CardContent className="p-4  flex flex-col gap-4 h-full justify-between py-1">
        <div className="flex items-center justify-between gap-4">
          <div className={cn("p-2.5 rounded-xl border", variantStyles[variant])}>
            <Icon className="size-5" />
          </div>
          <div className={cn("px-2.5 py-1 rounded-full text-[12px] font-black uppercase tracking-tighter border", variantStyles[variant])}>
            {isPositive ? "+" : "-"}{trend}%
          </div>
        </div>

        <div className="flex flex-col gap-0.5 mt-0">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{title}</p>
          <h3 className="text-3xl font-black tracking-tighter">{formatCurrency(value)}</h3>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-muted/30">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">
            Previous Month: {formatCurrency(previousValue)}
          </span>
       
        </div>
      </CardContent>
    </Card>
  );
}
