import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants/transactions";

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
}

export function TransactionFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center bg-muted/30 border-b">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search description or category..."
          className="pl-10 h-10 rounded-xl bg-background border-muted-foreground/20"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="size-4 text-muted-foreground shrink-0" />
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-xl bg-background border-muted-foreground/20">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
