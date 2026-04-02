export type TransactionCategory =
  | "Salary"
  | "Food"
  | "Rent"
  | "Entertainment"
  | "Shopping"
  | "Transport"
  | "Health"
  | "Others";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string; // ISO format (e.g., 2024-04-01)
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
}
