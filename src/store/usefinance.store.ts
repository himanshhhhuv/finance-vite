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
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "admin",
      setRole: (role) => set({ role }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      resetTransactions: () => set({ transactions: mockTransactions }),
    }),
    {
      name: "finance-storage",
    }
  )
);
