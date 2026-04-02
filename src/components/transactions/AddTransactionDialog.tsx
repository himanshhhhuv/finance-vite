import { useState } from "react";
import { Plus } from "lucide-react";
import type { Transaction, TransactionCategory } from "@/types/transaction.type";
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
}

export function AddTransactionDialog({ onAddTransaction }: AddTransactionDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    amount: "",
    category: "Others" as TransactionCategory,
    type: "expense" as "income" | "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(newTx.amount),
      category: newTx.category,
      type: newTx.type,
      description: newTx.description,
      date: newTx.date,
    };
    onAddTransaction(transaction);
    setIsDialogOpen(false);
    setNewTx({
      amount: "",
      category: "Others",
      type: "expense",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-9 gap-2 rounded-full bg-blue-600 px-4 font-bold uppercase tracking-tighter text-white transition-all hover:bg-blue-500"
        >
          <Plus className="size-4" />
          Add Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your new transaction here.
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
                onValueChange={(v) => setNewTx({ ...newTx, type: v as any })}
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
                onValueChange={(v) => setNewTx({ ...newTx, category: v as any })}
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
          <DialogFooter className="pt-4">
            <Button type="submit">Save Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
