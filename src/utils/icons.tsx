import { 
  Utensils, 
  ShoppingBag, 
  Car, 
  Zap, 
  Plus, 
  Home, 
  Heart, 
  HelpCircle,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Car,
  Entertainment: Zap,
  Salary: Plus,
  Rent: Home,
  Health: Heart,
  Others: HelpCircle,
};

export const TYPE_ICONS = {
  income: TrendingUp,
  expense: TrendingDown,
};
