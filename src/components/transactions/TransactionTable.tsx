import type { Transaction } from "@/types/transaction.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { TransactionRow } from "./TransactionRow";
import { TransactionFilters } from "./TransactionFilters";

interface TransactionTableProps {
  transactions: Transaction[];
  role: string | null;
  onDelete: (transaction: Transaction) => void;
  onEdit?: (transaction: Transaction) => void;
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

export function TransactionTable({
  transactions,
  role,
  onDelete,
  onEdit,
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
}: TransactionTableProps) {
  return (
    <Card className="overflow-hidden border-muted-foreground/10">
      <CardContent className="p-0">
        <TransactionFilters
          search={search}
          onSearchChange={onSearchChange}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={onCategoryFilterChange}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[100px] sm:w-[120px] font-black uppercase tracking-wide sm:tracking-widest text-[11px] sm:text-[10px] pl-4 sm:pl-6 h-12">
                  Date
                </TableHead>
                <TableHead className="font-black uppercase tracking-wide sm:tracking-widest text-[11px] sm:text-[10px] h-12">
                  Description
                </TableHead>
                <TableHead className="hidden md:table-cell font-black uppercase tracking-wide sm:tracking-widest text-[11px] sm:text-[10px] h-12">
                  Category
                </TableHead>
                <TableHead className="hidden sm:table-cell font-black uppercase tracking-wide sm:tracking-widest text-[11px] sm:text-[10px] h-12">
                  Type
                </TableHead>
                <TableHead className="text-right font-black uppercase tracking-wide sm:tracking-widest text-[11px] sm:text-[10px] pr-4 sm:pr-6 h-12">
                  Amount
                </TableHead>
                {role === "admin" && (
                  <TableHead className="w-[120px] h-12"></TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={role === "admin" ? 6 : 5}
                    className="h-32 text-center text-muted-foreground italic"
                  >
                    No matching financial records found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TransactionRow
                    key={tx.id}
                    tx={tx}
                    role={role}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
