"use client";

import { useFinanceStore } from "@/store/usefinance.store";
import { calculateTotals, groupByCategory, groupByMonth } from "@/utils/calculations";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
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

type Range = "6M" | "1Y" | "ALL";

export default function Dashboard() {
  const { transactions } = useFinanceStore();
  const [range, setRange] = useState<Range>("1Y");

  const { income, expenses, balance } = calculateTotals(transactions);
  const categoryData = groupByCategory(transactions);
  const allMonthlyData = groupByMonth(transactions);

  const filteredMonthlyData = (() => {
    if (range === "ALL") return allMonthlyData;
    const monthCount = range === "6M" ? 6 : 12;
    return allMonthlyData.slice(-monthCount);
  })();

  return (
    <div className="flex flex-col gap-4 pb-0 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 leading-none">
          Editorial Intelligence
        </span>
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl flex items-center gap-4">
          Equilibrium <span className="text-primary font-light">Finance</span>
        </h1>
      </div>

      {/* Top Row: Liquidity & Key Stats */}
      <div className="grid gap-4 lg:grid-cols-4">
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
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left Span: Balance Trend */}
        <Card className="lg:col-span-8 overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl">Balance Trend</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Historical performance over {range === "6M" ? "6 months" : range === "1Y" ? "1 year" : "all time"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              {(["6M", "1Y", "ALL"] as Range[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`text-[10px] font-black uppercase tracking-tighter px-2.5 py-1.5 rounded-md transition-all ${
                    range === r
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:bg-background/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </CardHeader>

          {/* Fixed: remove h-[600px] from CardContent, use explicit height div instead */}
          <CardContent className="pt-4 pb-6 px-2">
            {filteredMonthlyData.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">
                No transaction data to display
              </div>
            ) : (
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredMonthlyData}
                    margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
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
                      tickFormatter={(value) => `$${value / 1000}k`}
                      fontWeight="bold"
                      width={48}
                    />
                    <Tooltip
                      cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)",
                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`,
                        name.charAt(0).toUpperCase() + name.slice(1),
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="var(--chart-1)"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                      animationDuration={800}
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                      animationDuration={1000}
                      dot={false}
                      activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Span: Breakdown & Activity */}
        <div className="lg:col-span-4 flex flex-col gap-4">
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