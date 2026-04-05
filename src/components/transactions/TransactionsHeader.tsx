import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddTransactionDialog } from "./AddTransactionDialog";
import type { Transaction } from "@/types/transaction.type";
import { exportToCSV, exportToJSON } from "@/utils/export";

interface TransactionsHeaderProps {
  role: string | null;
  onAddTransaction: (transaction: Transaction) => void;
  transactions: Transaction[];
}

export function TransactionsHeader({ role, onAddTransaction, transactions }: TransactionsHeaderProps) {
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
      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-full border-muted-foreground/20 px-3 sm:px-4 font-bold uppercase tracking-tighter transition-all hover:bg-muted/50"
            >
              <FileDown className="size-3.5" />
              <span className="hidden sm:inline">Export Ledger</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => exportToCSV(transactions, "transactions")}>
              <FileDown className="mr-2 size-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToJSON(transactions, "transactions")}>
              <FileDown className="mr-2 size-4" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {role === "admin" && (
          <AddTransactionDialog onAddTransaction={onAddTransaction} />
        )}
      </div>
    </div>
  );
}
