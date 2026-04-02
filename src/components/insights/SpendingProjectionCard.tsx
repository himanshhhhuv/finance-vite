import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CircularProgress } from "./CircularProgress";
import { formatCurrency } from "@/utils/calculations";

interface SpendingProjectionCardProps {
  currentSpend: number;
  projectedSpend: number;
  targetSpend: number;
}

export function SpendingProjectionCard({ currentSpend, projectedSpend, targetSpend }: SpendingProjectionCardProps) {
  const percentage = Math.round((currentSpend / targetSpend) * 100);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-lg">Spending Projection</CardTitle>
        <CardDescription className="text-xs uppercase tracking-widest font-bold">Monthly Velocity</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-8 pt-6">
        <CircularProgress percentage={percentage} size={140} strokeWidth={14} label="Velocity" />
        <div className="flex flex-col gap-4">
          <p className="text-xs leading-relaxed text-muted-foreground font-medium max-w-[200px]">
            Based on current velocity, your projected end-of-month spend is within your curated target of {formatCurrency(targetSpend)}.
          </p>
          <div className="flex items-center gap-4 border-t pt-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-tighter flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Current
              </span>
              <span className="text-sm font-bold">{formatCurrency(currentSpend)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">PROJECTED</span>
              <span className="text-sm font-bold">{formatCurrency(projectedSpend)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
