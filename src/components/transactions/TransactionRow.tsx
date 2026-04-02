import type { Transaction } from "@/types/transaction.type";
import { formatCurrency, formatDate } from "@/utils/calculations";
import { CATEGORY_ICONS } from "@/utils/icons";
import { Trash2, HelpCircle } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransactionRowProps {
  tx: Transaction;
  role: string | null;
  onDelete: (id: string) => void;
}

export function TransactionRow({ tx, role, onDelete }: TransactionRowProps) {
  const Icon = CATEGORY_ICONS[tx.category] || HelpCircle;
  const isIncome = tx.type === "income";

  return (
    <TableRow key={tx.id} className="group transition-all hover:bg-muted/30">
      <TableCell className="pl-6 text-[11px] font-bold text-muted-foreground uppercase">
        {formatDate(tx.date)}
      </TableCell>
      <TableCell className="font-black tracking-tight">
        {tx.description}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon className="size-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-tighter">
            {tx.category}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter border-0",
            isIncome
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-rose-500/10 text-rose-500"
          )}
        >
          {isIncome ? "Income" : "Expense"}
        </Badge>
      </TableCell>
      <TableCell
        className={cn(
          "text-right pr-6 font-black tracking-tighter text-sm",
          isIncome ? "text-emerald-500" : "text-rose-500"
        )}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(tx.amount)}
      </TableCell>
      {role === "admin" && (
        <TableCell className="pr-6">
          <Button
            variant="ghost"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
            onClick={() => onDelete(tx.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
