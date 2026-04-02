import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ObservationCardProps {
  label: string;
  badgeText: string;
  insight: string;
  actionText: string;
  icon: LucideIcon;
  variant?: "default" | "alert" | "info";
  className?: string;
}

export function ObservationCard({ 
  badgeText, 
  insight, 
  actionText, 
  icon: Icon, 
  variant = "default",
  className 
}: ObservationCardProps) {
  const variantStyles = {
    default: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    alert: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    info: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  return (
    <Card className={cn("overflow-hidden group hover:shadow-lg transition-shadow duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className={cn("p-2 rounded-lg border", variantStyles[variant])}>
          <Icon className="size-5" />
        </div>
        <Badge variant="outline" className="text-[10px] uppercase tracking-widest font-bold">
          {badgeText}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground font-medium">
          {insight}
        </p>
      </CardContent>
      <CardFooter className="pt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
        <button className="text-xs font-bold text-blue-600 uppercase tracking-tighter flex items-center gap-1">
          {actionText}
          <ArrowRight className="size-3.5" />
        </button>
      </CardFooter>
    </Card>
  );
}
