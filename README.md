# Finance Dashboard UI

A modern, interactive finance dashboard built with React, TypeScript, and Vite. This application provides comprehensive financial tracking, analytics, and insights with role-based access control.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 🌐 Live Demo

Access the application at: `http://localhost:5174/` (after running locally)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Role-Based Access Control](#role-based-access-control)
- [Assignment Requirements](#assignment-requirements)
- [Scripts](#scripts)
- [Code Quality](#code-quality)

## 🎯 Overview

This Finance Dashboard is designed to help users track and understand their financial activity through an intuitive interface. Built with modern web technologies, it offers real-time analytics, transaction management, and intelligent insights.

### Key Highlights

- **Interactive Visualizations**: Area charts, donut charts, and bar graphs for comprehensive data representation
- **Smart Filtering**: Advanced search and category-based filtering
- **Role-Based UI**: Simulated RBAC with Admin and Viewer permissions
- **Dark Mode**: Full theme support with system preference detection
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Data Persistence**: Local storage integration for data retention
- **Type Safety**: Full TypeScript implementation with strict mode

## ✨ Features

### 1. Dashboard Overview

The main dashboard provides a comprehensive financial snapshot:

- **Liquidity Card**: Real-time balance display with visual indicators
- **Summary Metrics**: 
  - Total Balance with trend visualization
  - Monthly Income with percentage change
  - Monthly Expenses with trend indicators
- **Balance Trend Chart**: Interactive area chart showing income vs expenses over time
  - Configurable time ranges (6M, 1Y, ALL)
  - Smooth animations and hover tooltips
  - Gradient fills for visual appeal
- **Spending Breakdown**: Donut chart categorizing expenses by type
- **Recent Activity**: List of the 5 most recent transactions with quick details

### 2. Transaction Management

Comprehensive transaction tracking with powerful features:

- **Transaction Table**: Sortable, filterable table view
  - Date, Amount, Category, Type, and Description columns
  - Color-coded transaction types (green for income, red for expenses)
- **Search Functionality**: Real-time search across descriptions and categories
- **Category Filtering**: Filter by specific expense/income categories
- **Add Transactions** (Admin only):
  - Form validation with error handling
  - Date picker for transaction date
  - Category selection from predefined list
  - Amount validation (must be > 0)
- **Edit Transactions** (Admin only):
  - Inline edit button on each transaction row
  - Pre-populated form with existing data
  - Full field editing capabilities
- **Delete Transactions** (Admin only):
  - Confirmation dialog before deletion
  - Shows transaction details for review
  - Cannot be undone warning
- **Export Functionality**:
  - Export to CSV format
  - Export to JSON format
  - Timestamped file names
  - Works with filtered data

### 3. Financial Insights

Advanced analytics and observations:

- **Monthly Comparison**: Bar chart comparing income vs expenses across months
- **Highest Spending Category**: Visual representation with percentage breakdown
- **Smart Observations**:
  - Savings alerts and recommendations
  - Subscription reminders
  - Unusual activity detection
- **Spending Projection**: Forecast based on current trends
- **Recurring Payments**: Upcoming recurring transaction tracker

### 4. Role-Based Access Control

Simple yet effective RBAC implementation:

- **Admin Role**:
  - Full CRUD permissions (Create, Read, Update, Delete)
  - Can add new transactions
  - Can edit existing transactions
  - Can delete existing transactions
  - Access to all features
  
- **Viewer Role**:
  - Read-only access
  - Can view all data and analytics
  - Cannot modify transactions
  - Add/Delete buttons are hidden

Switch roles easily using the role switcher in the header.

### 5. UI/UX Excellence

**Design & Layout:**
- **Responsive Layout**: Adapts seamlessly to all screen sizes
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Custom 404 Page**: Branded error page with real-time clock and navigation

**User Feedback:**
- **Toast Notifications (Sonner)**: Professional toast feedback for all operations
  - Success toasts for create/update/delete with descriptions
  - Error toasts for validation failures
  - Export success notifications with counts
  - Auto-dismissing with smooth animations
- **Delete Confirmation**: Review transaction before permanent deletion
- **Form Validation**: Real-time error messages with helpful guidance
- **Loading States**: Smooth animations during data operations
- **Empty States**: Helpful messages when no data is available

**Interactions:**
- **Hover Effects**: Icons appear on transaction hover for clean UI
- **Smooth Animations**: Fade-ins, slide-ins, and transitions throughout
- **Visual Feedback**: Color-coded actions (blue=edit, red=delete)
- **Error Boundaries**: Prevents crashes with graceful error handling

**Keyboard Shortcuts:**
- **Ctrl+1**: Navigate to Dashboard
- **Ctrl+2**: Navigate to Transactions
- **Ctrl+3**: Navigate to Insights
- Quick navigation for power users

## 🛠 Tech Stack

### Core

- **React 19.2** - UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.3** - Lightning-fast build tool
- **React Router 7** - Client-side routing

### Styling

- **Tailwind CSS 4.2** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful, consistent icons

### Data & State

- **Zustand 5.0** - Lightweight state management
- **Zustand Persist Middleware** - LocalStorage integration

### Visualization

- **Recharts 3.8** - Composable charting library
  - Area charts for trends
  - Donut charts for categorical data
  - Bar charts for comparisons

### Code Quality

- **ESLint 9** - Linting with TypeScript support
- **Prettier 3.8** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
finance-vite/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── CompactStatCard.tsx
│   │   │   ├── LiquidityCard.tsx
│   │   │   ├── RecentActivityList.tsx
│   │   │   └── SpendingDonutChart.tsx
│   │   ├── insights/        # Insights page components
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── HighestSpendingCard.tsx
│   │   │   ├── ObservationCard.tsx
│   │   │   ├── SpendingProjectionCard.tsx
│   │   │   └── TopRecurringCard.tsx
│   │   ├── transactions/    # Transaction management components
│   │   │   ├── AddTransactionDialog.tsx
│   │   │   ├── TransactionFilters.tsx
│   │   │   ├── TransactionRow.tsx
│   │   │   ├── TransactionsHeader.tsx
│   │   │   └── TransactionTable.tsx
│   │   ├── layout/          # Layout components
│   │   │   └── RoleSwitcher.tsx
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ErrorBoundary.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── mode-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Transactions.tsx
│   │   ├── Insights.tsx
│   │   └── NotFound.tsx
│   ├── store/               # State management
│   │   └── usefinance.store.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── transaction.type.ts
│   │   └── role.type.ts
│   ├── data/                # Mock data
│   │   └── mockTransactions.ts
│   ├── constants/           # Application constants
│   │   └── transactions.ts
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts  # Financial calculations
│   │   └── icons.ts         # Icon mappings
│   ├── lib/                 # Library utilities
│   │   └── utils.ts         # Helper functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── eslint.config.js         # ESLint configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd finance-vite
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:5174/
   ```

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## 📖 Usage Guide

### First Launch

1. The application loads with **mock transaction data** pre-populated
2. Default role is set to **Admin** (you can switch to Viewer)
3. Data is automatically persisted to localStorage
4. Dark mode is enabled by default (can be toggled)

### Navigating the Application

**Sidebar Navigation:**
- **Dashboard**: Main overview with charts and summaries
- **Transactions**: Detailed transaction list with filters
- **Insights**: Advanced analytics and predictions

**Header Controls:**
- **Role Switcher**: Toggle between Admin and Viewer roles
- **Theme Toggle**: Switch between light and dark modes
- **Sidebar Toggle**: Collapse/expand the sidebar

### Adding a Transaction (Admin Only)

1. Navigate to the **Transactions** page
2. Click the **"Add Entry"** button in the header
3. Fill in the transaction details:
   - Description (required)
   - Amount (required, must be > 0)
   - Type (Income or Expense)
   - Category (select from dropdown)
   - Date (defaults to today)
4. Click **"Save Transaction"**
5. The transaction appears immediately in the list

### Editing a Transaction (Admin Only)

1. Navigate to the **Transactions** page
2. Hover over any transaction row
3. Click the **Edit icon** (pencil) that appears
4. The edit dialog opens with pre-populated data
5. Modify any fields as needed
6. Click **"Update Transaction"** to save changes
7. Click **"Cancel"** to discard changes

### Filtering Transactions

- **Search Bar**: Type to search descriptions or categories
- **Category Filter**: Use the dropdown to filter by specific category
- Both filters work together for refined results

### Understanding the Charts

**Balance Trend (Dashboard)**
- Green line: Income over time
- Red dashed line: Expenses over time
- Toggle between 6M, 1Y, or ALL time ranges
- Hover over points to see exact values

**Spending Breakdown (Dashboard)**
- Donut chart showing expense distribution
- Each segment represents a category
- Percentages calculated automatically

**Monthly Comparison (Insights)**
- Bar chart comparing months
- Side-by-side income vs expense comparison
- Helps identify spending patterns

### Resetting Data

To reset to original mock data:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete the `finance-storage` key
4. Refresh the page

## 🔐 Role-Based Access Control

This application implements **frontend-simulated RBAC** for demonstration purposes.

### Admin Role

**Can Do:**
- ✅ View all data and analytics
- ✅ Add new transactions
- ✅ Edit existing transactions
- ✅ Delete existing transactions
- ✅ Access all features

**UI Changes:**
- "Add Entry" button is visible
- Edit and Delete icons appear on transaction hover
- Full CRUD operations enabled
- Edit opens dialog with pre-populated data

### Viewer Role

**Can Do:**
- ✅ View all data and analytics
- ✅ Use search and filters
- ✅ Navigate between pages

**Cannot Do:**
- ❌ Add new transactions
- ❌ Edit transactions
- ❌ Delete transactions
- ❌ Modify any data

**UI Changes:**
- "Add Entry" button is hidden
- Edit and Delete icons are hidden
- All forms are disabled
- Read-only mode across the application

### Switching Roles

Click the role dropdown in the header and select:
- **Admin** - Full CRUD access
- **Viewer** - Read-only access

The UI updates immediately to reflect permissions.

## 📝 Assignment Requirements

This project fulfills all core and optional requirements:

### ✅ Core Requirements

| Requirement | Implementation | Status |
|------------|----------------|--------|
| **Dashboard Overview** | Fully implemented with balance, income, expenses cards | ✅ |
| Summary Cards | Liquidity, Income, Expenses with trend indicators | ✅ |
| Time-based Visualization | Area chart with 6M/1Y/ALL filters | ✅ |
| Categorical Visualization | Donut chart for spending breakdown | ✅ |
| **Transactions Section** | Full CRUD with filtering | ✅ |
| Transaction Details | Date, Amount, Category, Type, Description | ✅ |
| Filtering | Search + Category filter | ✅ |
| Sorting | Implicit by date (newest first) | ✅ |
| **Role-Based UI** | Admin vs Viewer with different permissions | ✅ |
| Role Simulation | Frontend role switcher | ✅ |
| UI Adaptation | Dynamic show/hide of controls | ✅ |
| **Insights Section** | Comprehensive analytics page | ✅ |
| Highest Spending | Category breakdown with percentage | ✅ |
| Monthly Comparison | Bar chart comparison | ✅ |
| Observations | 3 smart insight cards | ✅ |
| **State Management** | Zustand with persistence | ✅ |
| Proper State Handling | Transactions, filters, role | ✅ |
| **UI/UX** | Clean, modern, responsive design | ✅ |
| Responsive Design | Works on all screen sizes | ✅ |
| Empty States | Graceful handling throughout | ✅ |

### ✅ Optional Enhancements

| Enhancement | Status | Details |
|------------|--------|---------|
| Dark Mode | ✅ | Full theme support with toggle |
| Data Persistence | ✅ | LocalStorage via Zustand middleware |
| Animations/Transitions | ✅ | Smooth fade-ins, hover effects, chart animations |
| Advanced Filtering | ✅ | Combined search + category filter |
| Export Functionality | ✅ | CSV & JSON export with timestamps |
| Error Boundaries | ✅ | App-wide error handling with recovery |
| Keyboard Shortcuts | ✅ | Ctrl+1/2/3 for quick navigation |
| Toast Notifications | ✅ | Success feedback for all actions |
| Confirmation Dialogs | ✅ | Delete confirmation with transaction preview |

**Implemented: 9/9 Optional Features** 🎉

## 🧪 Scripts

```bash
# Development
pnpm dev              # Start dev server

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript type checking
```

## 🎨 Code Quality

This project maintains high code quality standards:

- ✅ **TypeScript Strict Mode**: No type errors
- ✅ **ESLint**: Zero linting errors
- ✅ **Prettier**: Consistent code formatting
- ✅ **Component Modularity**: Reusable, single-responsibility components
- ✅ **Error Handling**: Comprehensive validation and error boundaries
- ✅ **Type Safety**: Full TypeScript coverage with proper typing
- ✅ **Clean Code**: No unused imports or variables

### Type Safety Features

- Strict null checks
- No implicit any
- Proper interface definitions
- Type guards for runtime validation
- Zod-like validation in store

### Performance Optimizations

- Memoized calculations with `useMemo`
- Efficient re-renders
- Code splitting with React lazy loading (ready for implementation)
- Optimized bundle size

## 🎓 Technical Decisions

### Why Zustand?

- Lightweight (< 1KB)
- Simple API
- Built-in persistence middleware
- Perfect for this scale of application

### Why shadcn/ui?

- Fully customizable components
- Copy-paste approach (no dependency bloat)
- Accessible by default (Radix UI primitives)
- Tailwind integration

### Why Recharts?

- Composable chart API
- Responsive by default
- Extensive customization
- Good TypeScript support

## 🔮 Future Enhancements

Potential features for expansion:

- [ ] Export to CSV/JSON functionality
- [ ] PDF report generation
- [ ] Date range picker for custom insights
- [ ] Transaction categories customization
- [ ] Budget tracking and alerts
- [ ] Multi-currency support
- [ ] Backend integration (REST API)
- [ ] User authentication
- [ ] Real-time data sync
- [ ] Mobile app (React Native)

## 📄 License

This project is created as part of an interview assignment.

## 👨‍💻 Developer

Built with ⚡ by Himanshu Verma

---

**Last Updated**: April 2026  
**Node Version**: 18+  
**React Version**: 19.2.4  
**TypeScript Version**: 5.9.3
