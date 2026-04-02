import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

interface SpendingDonutChartProps {
  data: { name: string; value: number }[];
}

export function SpendingDonutChart({ data }: SpendingDonutChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-8 pt-6">
        <div className="h-[200px] w-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
                itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Total</span>
              <span className="text-xl font-black tracking-tighter">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          {data.slice(0, 5).map((item, index) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] font-black">{Math.round((item.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
