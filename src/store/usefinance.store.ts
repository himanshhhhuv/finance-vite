import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction } from "../types/transaction.type";
import type { Role } from "../types/role.type";
import { mockTransactions } from "../data/mockTransactions";

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
}

// Validation helper
const validateTransaction = (transaction: Transaction): boolean => {
  if (!transaction.id || typeof transaction.id !== "string") return false;
  if (!transaction.date || typeof transaction.date !== "string") return false;
  if (typeof transaction.amount !== "number" || transaction.amount <= 0) return false;
  if (!transaction.category || typeof transaction.category !== "string") return false;
  if (!transaction.type || (transaction.type !== "income" && transaction.type !== "expense")) return false;
  if (typeof transaction.description !== "string") return false;
  return true;
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "admin",
      setRole: (role) => {
        if (role === "admin" || role === "viewer") {
          set({ role });
        } else {
          console.error("Invalid role:", role);
        }
      },
      addTransaction: (transaction) => {
        if (!validateTransaction(transaction)) {
          console.error("Invalid transaction data:", transaction);
          throw new Error("Invalid transaction data");
        }
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      updateTransaction: (id, transaction) => {
        if (!id || typeof id !== "string") {
          console.error("Invalid transaction ID:", id);
          throw new Error("Invalid transaction ID");
        }
        if (!validateTransaction(transaction)) {
          console.error("Invalid transaction data:", transaction);
          throw new Error("Invalid transaction data");
        }
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...transaction, id } : t
          ),
        }));
      },
      deleteTransaction: (id) => {
        if (!id || typeof id !== "string") {
          console.error("Invalid transaction ID:", id);
          return;
        }
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      resetTransactions: () => set({ transactions: mockTransactions }),
    }),
    {
      name: "finance-storage",
    }
  )
);
