import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

interface SpendingDonutChartProps {
  data: { name: string; value: number }[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { name: string; value: number };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-2.5 min-w-32 z-[9999] relative">
        <p className="text-[11px] font-bold uppercase tracking-wide mb-1">
          {payload[0].name}
        </p>
        <p className="text-base font-black text-primary">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function SpendingDonutChart({ data }: SpendingDonutChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (data.length === 0 || total === 0) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-lg">Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-sm text-muted-foreground">No spending data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 overflow-visible">
      <CardHeader>
        <CardTitle className="text-lg">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pt-6 overflow-visible">
        <div className="h-[160px] w-[160px] relative min-h-[160px] min-w-[160px] group/chart">
          <ResponsiveContainer width="100%" height="100%" minHeight={160} minWidth={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={70}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 group-hover/chart:opacity-0 transition-opacity">
            <div className="flex flex-col items-center rounded-lg px-3 py-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Total</span>
              <span className="text-xl font-black tracking-tighter">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 w-full">
          {data.slice(0, 5).map((item, index) => (
            <div key={item.name} className="flex items-center justify-between group px-2">
              <div className="flex items-center gap-2.5">
                <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-black ml-2 shrink-0">{Math.round((item.value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
