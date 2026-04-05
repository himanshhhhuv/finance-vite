import { useState, useMemo } from "react";
import { useFinanceStore } from "@/store/usefinance.store";
import { TransactionsHeader } from "@/components/transactions/TransactionsHeader";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import type { Transaction } from "@/types/transaction.type";

export default function Transactions() {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, categoryFilter]);

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setEditingTransaction(null);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-700">
      <TransactionsHeader role={role} onAddTransaction={addTransaction} />

      <TransactionTable
        transactions={filteredTransactions}
        role={role}
        onDelete={deleteTransaction}
        onEdit={handleEditTransaction}
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {/* Edit Dialog */}
      <AddTransactionDialog
        onAddTransaction={addTransaction}
        onUpdateTransaction={updateTransaction}
        editTransaction={editingTransaction}
        isOpen={isEditDialogOpen}
        onOpenChange={handleEditDialogClose}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
