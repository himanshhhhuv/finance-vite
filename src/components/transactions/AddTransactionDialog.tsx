import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type { Transaction, TransactionCategory, TransactionType } from "@/types/transaction.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/constants/transactions";

interface AddTransactionDialogProps {
  onAddTransaction: (transaction: Transaction) => void;
  onUpdateTransaction?: (id: string, transaction: Transaction) => void;
  editTransaction?: Transaction | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const getInitialFormState = (editTransaction: Transaction | null) => {
  if (editTransaction) {
    return {
      amount: editTransaction.amount.toString(),
      category: editTransaction.category,
      type: editTransaction.type,
      description: editTransaction.description,
      date: editTransaction.date,
    };
  }
  return {
    amount: "",
    category: "Others" as TransactionCategory,
    type: "expense" as TransactionType,
    description: "",
    date: new Date().toISOString().split("T")[0],
  };
};

export function AddTransactionDialog({
  onAddTransaction,
  onUpdateTransaction,
  editTransaction = null,
  isOpen: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AddTransactionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [newTx, setNewTx] = useState(() => getInitialFormState(editTransaction));

  // Determine if we're in controlled mode
  const isControlled = controlledOpen !== undefined;
  const isDialogOpen = isControlled ? controlledOpen : internalOpen;

  const isEditMode = editTransaction !== null;

  // Update form when editTransaction changes (for edit mode)
  // This is intentional - we need to sync form state with the prop
  useEffect(() => {
    if (isDialogOpen && editTransaction) {
      // Intentionally setting state in effect to sync with prop changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewTx(getInitialFormState(editTransaction));
      setError("");
    }
  }, [editTransaction, isDialogOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open && !isEditMode) {
      // Only reset form for new entries
      setNewTx(getInitialFormState(null));
      setError("");
    } else if (!open) {
      // Clear form when closing
      setNewTx(getInitialFormState(null));
      setError("");
    }
    if (isControlled && controlledOnOpenChange) {
      controlledOnOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amount = parseFloat(newTx.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (!newTx.description.trim()) {
      setError("Please enter a description");
      return;
    }

    try {
      const transaction: Transaction = {
        id: isEditMode ? editTransaction.id : crypto.randomUUID(),
        amount,
        category: newTx.category,
        type: newTx.type,
        description: newTx.description.trim(),
        date: newTx.date,
      };

      if (isEditMode && onUpdateTransaction) {
        onUpdateTransaction(editTransaction.id, transaction);
      } else {
        onAddTransaction(transaction);
      }

      handleOpenChange(false);
      setNewTx({
        amount: "",
        category: "Others",
        type: "expense",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : isEditMode ? "Failed to update transaction" : "Failed to add transaction");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="h-9 gap-2 rounded-full bg-blue-600 px-4 font-bold uppercase tracking-tighter text-white transition-all hover:bg-blue-500"
          >
            <Plus className="size-4" />
            Add Entry
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details of your transaction here."
              : "Enter the details of your new transaction here."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddTransaction} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newTx.description}
              onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
              placeholder="e.g. Weekly Groceries"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={newTx.amount}
                onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newTx.type}
                onValueChange={(v) => {
                  if (v === "income" || v === "expense") {
                    setNewTx({ ...newTx, type: v });
                  }
                }}
              >
                <SelectTrigger id="type" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newTx.category}
                onValueChange={(v) => setNewTx({ ...newTx, category: v as TransactionCategory })}
              >
                <SelectTrigger id="category" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newTx.date}
                onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                required
              />
            </div>
          </div>
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update Transaction" : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
