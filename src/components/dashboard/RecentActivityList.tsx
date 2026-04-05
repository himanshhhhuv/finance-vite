import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/calculations";
import { CATEGORY_ICONS } from "@/utils/icons";
import type { Transaction } from "@/types/transaction.type";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface RecentActivityListProps {
  transactions: Transaction[];
}

export function RecentActivityList({ transactions }: RecentActivityListProps) {
  const recent = transactions.slice(0, 5);

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <div className="flex flex-col gap-0">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Your latest transactions</CardDescription>
        </div>
        <Link to="/transactions" className="text-xs font-bold uppercase tracking-tighter text-blue-600 hover:text-blue-500 transition-colors">
          View All
        </Link>
      </CardHeader>
      <CardContent className=" space-y-4">
        {recent.map((tx) => {
          const Icon = CATEGORY_ICONS[tx.category] || HelpCircle;
          const isIncome = tx.type === "income";

          return (
            <div key={tx.id} className="flex items-center justify-between group cursor-pointer transition-all hover:bg-muted/30 p-2 -mx-2 rounded-xl">
              <div className="flex items-center gap-4
              
              
              
              ">
                <div className={cn(
                  "p-2.5 rounded-xl transition-all duration-300",
                  isIncome ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white"
                )}>
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold truncate max-w-[150px]">{tx.description}</span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                    {tx.category} • {formatDate(tx.date)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className={cn(
                   "text-sm font-black tracking-tighter transition-all duration-300",
                   isIncome ? "text-emerald-500 group-hover:scale-105" : "text-rose-500 group-hover:scale-105"
                 )}>
                   {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                 </span>
              </div>
            </div>
          );
        })}
        {recent.length === 0 && (
          <p className="text-center py-8 text-muted-foreground text-sm italic">
            No recent activity found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
