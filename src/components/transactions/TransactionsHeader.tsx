import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTransactionDialog } from "./AddTransactionDialog";
import type { Transaction } from "@/types/transaction.type";

interface TransactionsHeaderProps {
  role: string | null;
  onAddTransaction: (transaction: Transaction) => void;
}

export function TransactionsHeader({ role, onAddTransaction }: TransactionsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 leading-none">
          Transaction Management
        </span>
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl flex items-center gap-4">
          Financial <span className="text-primary font-light">Activity</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 rounded-full border-muted-foreground/20 px-4 font-bold uppercase tracking-tighter transition-all hover:bg-muted/50"
        >
          <FileDown className="size-3.5" />
          Export Ledger
        </Button>
        {role === "admin" && (
          <AddTransactionDialog onAddTransaction={onAddTransaction} />
        )}
      </div>
    </div>
  );
}
