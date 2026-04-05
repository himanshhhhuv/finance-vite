import type { Transaction } from "../types/transaction.type";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2024-03-01", amount: 5000, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "2", date: "2024-03-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "3", date: "2024-03-03", amount: 120, category: "Food", type: "expense", description: "Grocery Store" },
  { id: "4", date: "2024-03-04", amount: 50, category: "Entertainment", type: "expense", description: "Netflix Subscription" },
  { id: "5", date: "2024-03-05", amount: 200, category: "Shopping", type: "expense", description: "New Sneakers" },
  { id: "6", date: "2024-03-06", amount: 45, category: "Transport", type: "expense", description: "Fuel" },
  { id: "7", date: "2024-03-08", amount: 80, category: "Food", type: "expense", description: "Dinner with friends" },
  { id: "8", date: "2024-03-10", amount: 150, category: "Health", type: "expense", description: "Gym Membership" },
  { id: "9", date: "2024-03-12", amount: 300, category: "Others", type: "expense", description: "Electricity Bill" },
  { id: "10", date: "2024-03-15", amount: 2500, category: "Salary", type: "income", description: "Freelance Project Payment" },
  { id: "11", date: "2024-03-16", amount: 60, category: "Food", type: "expense", description: "Lunch" },
  { id: "12", date: "2024-03-18", amount: 100, category: "Shopping", type: "expense", description: "Book store" },
  { id: "13", date: "2024-03-20", amount: 40, category: "Transport", type: "expense", description: "Bus pass" },
  { id: "14", date: "2024-03-22", amount: 90, category: "Food", type: "expense", description: "Pizza night" },
  { id: "15", date: "2024-03-25", amount: 200, category: "Entertainment", type: "expense", description: "Concert tickets" },
  { id: "16", date: "2024-03-28", amount: 55, category: "Transport", type: "expense", description: "Uber rides" },
  { id: "17", date: "2024-03-30", amount: 150, category: "Others", type: "expense", description: "Internet Bill" },
  { id: "18", date: "2024-04-01", amount: 5200, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "19", date: "2024-04-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "20", date: "2024-04-03", amount: 140, category: "Food", type: "expense", description: "Whole Foods" },

  // May 2024
  { id: "21", date: "2024-05-01", amount: 5300, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "22", date: "2024-05-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "23", date: "2024-05-05", amount: 180, category: "Food", type: "expense", description: "Groceries" },
  { id: "24", date: "2024-05-10", amount: 95, category: "Entertainment", type: "expense", description: "Movie night" },
  { id: "25", date: "2024-05-15", amount: 220, category: "Shopping", type: "expense", description: "Summer clothes" },

  // June 2024
  { id: "26", date: "2024-06-01", amount: 5400, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "27", date: "2024-06-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "28", date: "2024-06-08", amount: 160, category: "Food", type: "expense", description: "Groceries" },
  { id: "29", date: "2024-06-12", amount: 300, category: "Health", type: "expense", description: "Dental checkup" },

  // July 2024
  { id: "30", date: "2024-07-01", amount: 5500, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "31", date: "2024-07-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "32", date: "2024-07-04", amount: 200, category: "Entertainment", type: "expense", description: "4th July BBQ" },
  { id: "33", date: "2024-07-15", amount: 170, category: "Food", type: "expense", description: "Groceries" },

  // August 2024
  { id: "34", date: "2024-08-01", amount: 5600, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "35", date: "2024-08-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "36", date: "2024-08-10", amount: 190, category: "Food", type: "expense", description: "Groceries" },
  { id: "37", date: "2024-08-20", amount: 500, category: "Others", type: "expense", description: "Emergency car repair" },

  // September 2024
  { id: "38", date: "2024-09-01", amount: 5700, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "39", date: "2024-09-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "40", date: "2024-09-05", amount: 175, category: "Food", type: "expense", description: "Groceries" },
  { id: "41", date: "2024-09-15", amount: 1200, category: "Others", type: "income", description: "Tax refund" },

  // October 2024
  { id: "42", date: "2024-10-01", amount: 5800, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "43", date: "2024-10-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "44", date: "2024-10-10", amount: 185, category: "Food", type: "expense", description: "Groceries" },
  { id: "45", date: "2024-10-31", amount: 120, category: "Entertainment", type: "expense", description: "Halloween party" },

  // November 2024
  { id: "46", date: "2024-11-01", amount: 5900, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "47", date: "2024-11-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "48", date: "2024-11-08", amount: 195, category: "Food", type: "expense", description: "Groceries" },
  { id: "49", date: "2024-11-25", amount: 300, category: "Food", type: "expense", description: "Thanksgiving dinner" },

  // December 2024
  { id: "50", date: "2024-12-01", amount: 6000, category: "Salary", type: "income", description: "Monthly Salary + Bonus" },
  { id: "51", date: "2024-12-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "52", date: "2024-12-10", amount: 200, category: "Food", type: "expense", description: "Groceries" },
  { id: "53", date: "2024-12-20", amount: 450, category: "Shopping", type: "expense", description: "Holiday gifts" },
  { id: "54", date: "2024-12-25", amount: 180, category: "Food", type: "expense", description: "Christmas dinner" },

  // January 2025
  { id: "55", date: "2025-01-01", amount: 6100, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "56", date: "2025-01-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "57", date: "2025-01-05", amount: 210, category: "Food", type: "expense", description: "Groceries" },
  { id: "58", date: "2025-01-15", amount: 100, category: "Health", type: "expense", description: "Gym renewal" },

  // February 2025
  { id: "59", date: "2025-02-01", amount: 6200, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "60", date: "2025-02-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "61", date: "2025-02-08", amount: 190, category: "Food", type: "expense", description: "Groceries" },
  { id: "62", date: "2025-02-14", amount: 150, category: "Entertainment", type: "expense", description: "Valentine's Day" },

  // March 2025
  { id: "63", date: "2025-03-01", amount: 6300, category: "Salary", type: "income", description: "Monthly Salary" },
  { id: "64", date: "2025-03-02", amount: 1500, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "65", date: "2025-03-10", amount: 205, category: "Food", type: "expense", description: "Groceries" },
  { id: "66", date: "2025-03-20", amount: 280, category: "Shopping", type: "expense", description: "Spring wardrobe" },
];