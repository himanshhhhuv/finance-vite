import { useState, useMemo } from "react";
import { useFinanceStore } from "@/store/usefinance.store";
import { TransactionsHeader } from "@/components/transactions/TransactionsHeader";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import { DeleteConfirmDialog } from "@/components/transactions/DeleteConfirmDialog";
import { toast } from "sonner";
import type { Transaction } from "@/types/transaction.type";

export default function Transactions() {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleAddTransaction = (transaction: Transaction) => {
    addTransaction(transaction);
    toast.success("Transaction added successfully!", {
      description: `${transaction.description} - $${transaction.amount}`,
    });
  };

  const handleUpdateTransaction = (id: string, transaction: Transaction) => {
    updateTransaction(id, transaction);
    toast.success("Transaction updated successfully!", {
      description: `${transaction.description} - $${transaction.amount}`,
    });
  };

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

  const handleDeleteClick = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingTransaction) {
      deleteTransaction(deletingTransaction.id);
      toast.success("Transaction deleted successfully!", {
        description: deletingTransaction.description,
      });
      setDeletingTransaction(null);
    }
  };

  const handleDeleteDialogClose = (open: boolean) => {
    setIsDeleteDialogOpen(open);
    if (!open) {
      setDeletingTransaction(null);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-700">
      <TransactionsHeader
        role={role}
        onAddTransaction={handleAddTransaction}
        transactions={filteredTransactions}
      />

      <TransactionTable
        transactions={filteredTransactions}
        role={role}
        onDelete={handleDeleteClick}
        onEdit={handleEditTransaction}
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {/* Edit Dialog */}
      <AddTransactionDialog
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        editTransaction={editingTransaction}
        isOpen={isEditDialogOpen}
        onOpenChange={handleEditDialogClose}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        transaction={deletingTransaction}
        isOpen={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
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
