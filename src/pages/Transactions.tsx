import { useState, useMemo } from "react";
import { useFinanceStore } from "@/store/usefinance.store";
import type { Transaction, TransactionCategory } from "@/types/transaction.type";
import { formatCurrency, formatDate } from "@/utils/calculations";
import { CATEGORY_ICONS } from "@/utils/icons";
import { 
  Search, 
  Plus, 
  Trash2, 
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  FileDown,
  Sparkles
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CATEGORIES: TransactionCategory[] = [
  "Salary",
  "Food",
  "Rent",
  "Entertainment",
  "Shopping",
  "Transport",
  "Health",
  "Others",
];

export default function Transactions() {
  const { transactions, role, addTransaction, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [newTx, setNewTx] = useState({
    amount: "",
    category: "Others" as TransactionCategory,
    type: "expense" as "income" | "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                           t.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, categoryFilter]);

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
    addTransaction(transaction);
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
    <div className="flex flex-col gap-10 pb-10 animate-in fade-in duration-700">
      {/* Header Section */}
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
          <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-muted-foreground/20 px-4 font-bold uppercase tracking-tighter transition-all hover:bg-muted/50">
            <FileDown className="size-3.5" />
            Export Ledger
          </Button>
          {role === "admin" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9 gap-2 rounded-full bg-blue-600 px-4 font-bold uppercase tracking-tighter text-white transition-all hover:bg-blue-500">
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
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                        size="sm"
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
          )}
        </div>
      </div>

      <Card className="overflow-hidden border-muted-foreground/10">
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center bg-muted/30 border-b">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search description or category..."
                className="pl-10 h-10 rounded-xl bg-background border-muted-foreground/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] h-10 rounded-xl bg-background border-muted-foreground/20">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-[120px] font-black uppercase tracking-widest text-[10px] pl-6 h-12">Date</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] h-12">Description</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] h-12">Category</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] h-12">Status</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] pr-6 h-12">Amount</TableHead>
                  {role === "admin" && <TableHead className="w-[80px] h-12"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={role === "admin" ? 6 : 5} className="h-32 text-center text-muted-foreground italic">
                      No matching financial records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((tx) => {
                    const Icon = CATEGORY_ICONS[tx.category] || HelpCircle;
                    const isIncome = tx.type === "income";

                    return (
                      <TableRow key={tx.id} className="group transition-all hover:bg-muted/30">
                        <TableCell className="pl-6 text-[11px] font-bold text-muted-foreground uppercase">{formatDate(tx.date)}</TableCell>
                        <TableCell className="font-black tracking-tight">{tx.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                <Icon className="size-3.5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-tighter">{tx.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter border-0",
                              isIncome ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                            )}
                          >
                            {isIncome ? "Income" : "Expense"}
                          </Badge>
                        </TableCell>
                        <TableCell className={cn(
                          "text-right pr-6 font-black tracking-tighter text-sm",
                          isIncome ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                        </TableCell>
                        {role === "admin" && (
                          <TableCell className="pr-6">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                              onClick={() => deleteTransaction(tx.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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

import { HelpCircle } from "lucide-react";
