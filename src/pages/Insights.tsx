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
  const { expenses } = calculateTotals(transactions);
  const allMonthlyData = groupByMonth(transactions);
  const categoryData = groupByCategory(transactions);

  // Show last 6 months for better comparison
  const monthlyData = useMemo(() => {
    return allMonthlyData.slice(-6);
  }, [allMonthlyData]);

  // Get last two months for comparison labels
  const lastTwoMonths = useMemo(() => {
    if (monthlyData.length >= 2) {
      return {
        current: monthlyData[monthlyData.length - 1].name,
        previous: monthlyData[monthlyData.length - 2].name,
      };
    }
    return { current: "Current", previous: "Previous" };
  }, [monthlyData]);

  const topCategory = useMemo(() => {
    return categoryData.sort((a, b) => b.value - a.value)[0] || { name: "Housing", value: 0 };
  }, [categoryData]);

  const spendingPercentage = useMemo(() => {
    return expenses > 0 ? Math.round((topCategory.value / expenses) * 100) : 0;
  }, [topCategory, expenses]);

  // Calculate month-over-month change
  const monthComparison = useMemo(() => {
    if (monthlyData.length < 2) return { change: 0, isIncrease: false };
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const change = Math.round(((current.expenses - previous.expenses) / previous.expenses) * 100);
    return { change: Math.abs(change), isIncrease: change > 0 };
  }, [monthlyData]);

  // Calculate average monthly spending
  const avgMonthlySpend = useMemo(() => {
    if (monthlyData.length === 0) return 0;
    const total = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
    return Math.round(total / monthlyData.length);
  }, [monthlyData]);

  // Get current month's data
  const currentMonthData = useMemo(() => {
    if (monthlyData.length === 0) return { income: 0, expenses: 0 };
    return monthlyData[monthlyData.length - 1];
  }, [monthlyData]);

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
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-muted-foreground/20 px-3 sm:px-4 font-bold uppercase tracking-tighter transition-all hover:bg-muted/50">
            <FileDown className="size-3.5" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button size="sm" className="h-9 gap-2 rounded-full bg-blue-900 px-3 sm:px-4 font-bold uppercase tracking-tighter text-white transition-all hover:bg-blue-800 hidden sm:flex">
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
              <CardDescription className="text-xs font-medium text-muted-foreground">
                Last 6 months cashflow dynamics
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-1" /> Income</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-2" /> Expenses</span>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] min-h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
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
            label={monthComparison.isIncrease ? "Spending Up" : "Savings"}
            badgeText={monthComparison.isIncrease ? "Alert" : "Savings"}
            insight={`Your spending ${monthComparison.isIncrease ? 'increased' : 'decreased'} by ${monthComparison.change}% in ${lastTwoMonths.current} compared to ${lastTwoMonths.previous}.`}
            actionText="View Details"
            icon={monthComparison.isIncrease ? TrendingDown : TrendingDown}
            variant={monthComparison.isIncrease ? "alert" : "default"}
          />
          <ObservationCard
            label="Top Category"
            badgeText="Insight"
            insight={`${topCategory.name} is your highest spending category at ${spendingPercentage}% of total expenses.`}
            actionText="Manage Budget"
            icon={CreditCard}
            variant="info"
          />
          <ObservationCard
            label="Monthly Average"
            badgeText="Trend"
            insight={`Your average monthly spending is $${avgMonthlySpend.toLocaleString()} over the last ${monthlyData.length} months.`}
            actionText="View Trends"
            icon={AlertTriangle}
            variant="default"
          />
        </div>
      </div>

      {/* Bottom Row: Projection & Recurring */}
      <div className="grid gap-4 md:grid-cols-2">
        <SpendingProjectionCard
          currentSpend={currentMonthData.expenses}
          projectedSpend={avgMonthlySpend}
          targetSpend={currentMonthData.income * 0.7 || 5000}
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
