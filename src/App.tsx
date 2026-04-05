import { Routes, Route, Navigate } from "react-router";
import { DashboardLayout } from "./components/dashboard/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"
import NotFound from "./pages/NotFound"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/transactions" element={<DashboardLayout><Transactions /></DashboardLayout>} />
      <Route path="/insights" element={<DashboardLayout><Insights /></DashboardLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
