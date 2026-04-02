import { useState, useMemo } from "react";
import { useFinanceStore } from "@/store/usefinance.store";
import { TransactionsHeader } from "@/components/transactions/TransactionsHeader";
import { TransactionTable } from "@/components/transactions/TransactionTable";

export default function Transactions() {
  const { transactions, role, addTransaction, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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

  return (
    <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-700">
      <TransactionsHeader role={role} onAddTransaction={addTransaction} />

      <TransactionTable
        transactions={filteredTransactions}
        role={role}
        onDelete={deleteTransaction}
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
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
