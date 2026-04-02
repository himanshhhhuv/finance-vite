import { useMemo } from "react";
import { useFinanceStore } from "@/store/usefinance.store";
import { 
  groupByCategory, 
  groupByMonth, 
  calculateTotals 
} from "@/utils/calculations";
import { 
  TrendingDown, 
  FileDown,
  Sparkles,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HighestSpendingCard } from "@/components/insights/HighestSpendingCard";
import { ObservationCard } from "@/components/insights/ObservationCard";
import { TopRecurringCard } from "@/components/insights/TopRecurringCard";
import { SpendingProjectionCard } from "@/components/insights/SpendingProjectionCard";

export default function Insights() {
  const { transactions } = useFinanceStore();
  const { income, expenses } = calculateTotals(transactions);
  const monthlyData = groupByMonth(transactions);
  const categoryData = groupByCategory(transactions);

  const topCategory = useMemo(() => {
    return categoryData.sort((a, b) => b.value - a.value)[0] || { name: "Housing", value: 0 };
  }, [categoryData]);

  const spendingPercentage = useMemo(() => {
    return expenses > 0 ? Math.round((topCategory.value / expenses) * 100) : 0;
  }, [topCategory, expenses]);

  return (
    <div className="flex flex-col gap-4 pb-0 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
            Portfolio Intelligence
          </span>
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
            Financial Insights <span className="text-primary font-light">&</span> Trends
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-muted-foreground/20 px-4 font-bold uppercase tracking-tighter transition-all hover:bg-muted/50">
            <FileDown className="size-3.5" />
            Export Report
          </Button>
          <Button size="sm" className="h-9 gap-2 rounded-full bg-blue-900 px-4 font-bold uppercase tracking-tighter text-white transition-all hover:bg-blue-800">
            Custom Range
          </Button>
        </div>
      </div>

      {/* Primary Row: Trends & Top Spending */}
      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-8 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl">Monthly Comparison</CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">Cashflow dynamics: July vs August</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 opacity-40"><span className="size-2 rounded-full bg-blue-400" /> July</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-blue-900" /> August</span>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--muted-foreground)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontWeight="bold"
                />
                <YAxis 
                   stroke="var(--muted-foreground)" 
                   fontSize={10} 
                   tickLine={false} 
                   axisLine={false}
                   tickFormatter={(value) => `$${value}`}
                   fontWeight="bold"
                />
                <Tooltip 
                  cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                />
                <Bar dataKey="income" fill="var(--chart-1)" radius={[10, 10, 0, 0]} barSize={32} />
                <Bar dataKey="expenses" fill="var(--chart-2)" radius={[10, 10, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <HighestSpendingCard 
           percentage={spendingPercentage || 40} 
           category={topCategory.name} 
           className="lg:col-span-4"
        />
      </div>

      {/* Observations Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Sparkles className="size-4" />
          </div>
          <h2 className="text-xl font-black tracking-tight uppercase">Smart Observations</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ObservationCard 
            label="Savings" 
            badgeText="Savings"
            insight="You spent 15% less on Food this month than last month."
            actionText="View Breakdown"
            icon={TrendingDown}
            variant="default"
          />
          <ObservationCard 
            label="Subscription" 
            badgeText="Subscription"
            insight="Recurring subscription detected for Netflix. Billing scheduled for Sept 12th."
            actionText="Manage Subscriptions"
            icon={CreditCard}
            variant="info"
          />
          <ObservationCard 
            label="Alert" 
            badgeText="Alert"
            insight="Unusual activity in Entertainment category. Spent $450 more than average."
            actionText="Audit Transactions"
            icon={AlertTriangle}
            variant="alert"
          />
        </div>
      </div>

      {/* Bottom Row: Projection & Recurring */}
      <div className="grid gap-4 md:grid-cols-2">
        <SpendingProjectionCard 
          currentSpend={expenses} 
          projectedSpend={expenses * 1.1} 
          targetSpend={income * 0.8 || 5000} 
        />
        <TopRecurringCard />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
