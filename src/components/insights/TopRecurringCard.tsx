import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Zap, Home, CreditCard, Phone, Calendar } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";

const RECURRING_MOCK = [
  { id: "1", name: "AT&T Fiber", amount: 79.99, icon: Phone, days: "Upcoming 7 days" },
  { id: "2", name: "NextEra Energy", amount: 142.10, icon: Zap, days: "Upcoming 15 days" },
  { id: "3", name: "Netflix Premium", amount: 19.99, icon: CreditCard, days: "Today" },
];

export function TopRecurringCard() {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg">Top Recurring</CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest font-bold">Upcoming Payments</CardDescription>
        </div>
        <Calendar className="size-5 text-blue-600" />
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {RECURRING_MOCK.map((item) => (
          <div key={item.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-muted/50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <item.icon className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold group-hover:text-blue-600 transition-colors">{item.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{item.days}</span>
              </div>
            </div>
            <span className="text-sm font-bold">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
