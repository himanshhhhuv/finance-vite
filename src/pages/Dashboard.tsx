import { useFinanceStore } from "@/store/usefinance.store";
import { calculateTotals, groupByCategory, groupByMonth } from "@/utils/calculations";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LiquidityCard } from "@/components/dashboard/LiquidityCard";
import { CompactStatCard } from "@/components/dashboard/CompactStatCard";
import { SpendingDonutChart } from "@/components/dashboard/SpendingDonutChart";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";

export default function Dashboard() {
  const { transactions } = useFinanceStore();
  const { income, expenses, balance } = calculateTotals(transactions);
  const categoryData = groupByCategory(transactions);
  const monthlyData = groupByMonth(transactions);

  return (
    <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 leading-none">
          Editorial Intelligence
        </span>
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl flex items-center gap-4">
          Equilibrium <span className="text-primary font-light">Finance</span> Dashboard
          <Sparkles className="size-6 text-indigo-500 animate-pulse" />
        </h1>
      </div>

      {/* Top Row: Liquidity & Key Stats */}
      <div className="grid gap-6 lg:grid-cols-4">
        <LiquidityCard balance={balance} />
        <CompactStatCard 
          title="Monthly Income"
          value={income}
          trend={12}
          isPositive={true}
          previousValue={income * 0.88}
          icon={TrendingUp}
          variant="emerald"
        />
        <CompactStatCard 
          title="Monthly Expenses"
          value={expenses}
          trend={5}
          isPositive={false}
          previousValue={expenses * 1.05}
          icon={TrendingDown}
          variant="rose"
        />
      </div>

      {/* Main Section: Trend & Analytics */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Span: Balance Trend */}
        <Card className="lg:col-span-8 overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl">Balance Trend</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Historical performance over 6 months</CardDescription>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              <span className="text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-md cursor-pointer hover:bg-background transition-all">6M</span>
              <span className="text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-md cursor-pointer hover:bg-background transition-all bg-background shadow-sm">1Y</span>
              <span className="text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-md cursor-pointer hover:bg-background transition-all">ALL</span>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="var(--muted-foreground)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  fontWeight="bold" 
                  dy={10}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value/1000}k`}
                  fontWeight="bold"
                />
                <Tooltip
                  cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="var(--chart-1)"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right Span: Breakdown & Activity */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <SpendingDonutChart data={categoryData} />
           <RecentActivityList transactions={transactions} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
