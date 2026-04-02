import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighestSpendingCardProps {
  percentage: number;
  category: string;
  className?: string;
}

export function HighestSpendingCard({ percentage, category, className }: HighestSpendingCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden border-0 bg-blue-600 p-6 text-white shadow-xl lg:min-h-[300px]",
      "dark:bg-blue-700",
      "flex flex-col justify-between",
      className
    )}>
      {/* Background Icon */}
      <Home className="absolute -top-4 -right-4 size-40 opacity-10" />

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-blue-100/80 uppercase tracking-wider">Highest Spending</h3>
        <p className="text-xs text-blue-100/60">Primary Expense Vector</p>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold tracking-tighter">{percentage}%</span>
          <span className="text-sm font-medium text-blue-100/60 uppercase">Total</span>
        </div>
        
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 w-fit">
          <Home className="size-3.5" />
          <span className="text-xs font-semibold">{category}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <Progress value={percentage} className="h-2 bg-blue-900/40" />
      </div>
    </Card>
  );
}
