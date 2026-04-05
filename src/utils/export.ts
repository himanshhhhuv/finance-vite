import type { Transaction } from "@/types/transaction.type";
import { toast } from "sonner";

export function exportToCSV(transactions: Transaction[], filename: string = "transactions") {
  if (transactions.length === 0) {
    toast.error("No transactions to export");
    return;
  }

  // CSV headers
  const headers = ["Date", "Description", "Category", "Type", "Amount"];

  // CSV rows
  const rows = transactions.map(tx => [
    tx.date,
    `"${tx.description}"`, // Wrap in quotes to handle commas
    tx.category,
    tx.type,
    tx.amount.toString()
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  toast.success("CSV exported successfully!", {
    description: `${transactions.length} transactions exported`,
  });
}

export function exportToJSON(transactions: Transaction[], filename: string = "transactions") {
  if (transactions.length === 0) {
    toast.error("No transactions to export");
    return;
  }

  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.json`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  toast.success("JSON exported successfully!", {
    description: `${transactions.length} transactions exported`,
  });
}
