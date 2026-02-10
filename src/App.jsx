
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useStore from './store/useStore';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import DailyCollection from './pages/DailyCollection';
import MemberAdmission from './pages/MemberAdmission';
import SharePage from './pages/SharePage';
import DpsPage from './pages/DpsPage';
import FdrPage from './pages/FdrPage';
import ShareholderAdmission from './pages/ShareholderAdmission';
import ShareholderList from './pages/ShareholderList';
import CreditPurchasePage from './pages/CreditPurchasePage';
import HawlatPage from './pages/HawlatPage';
import ExpensePage from './pages/ExpensePage';
import ProductApplicationPage from './pages/ProductApplicationPage';
import DirectorShipPage from './pages/DirectorShipPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import StockReport from './pages/StockReport';
import PurchaseReport from './pages/PurchaseReport';
import SellReport from './pages/SellReport';
import CustomerReport from './pages/CustomerReport';
import ProfitLossReport from './pages/ProfitLossReport';
import DailyCashSheet from './pages/DailyCashSheet';
import GeneralLedger from './pages/GeneralLedger';
import BalanceSheet from './pages/BalanceSheet';

// Protected Route Component
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, currentUser } = useStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout Wrapper to handle Sidebar availability based on auth
const AppLayout = ({ children }) => {
  const { isAuthenticated } = useStore();
  // If not authenticated, Layout (which has Sidebar) might redirect or look empty if Sidebar returns null.
  // Actually, Sidebar returns null if no user. Layout handles the grid.
  // If we are at login, we don't want Layout.
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/*" element={
        <AppLayout>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Admin/SuperAdmin Routes */}
            <Route path="/members" element={<ProtectedRoute roles={['admin', 'superadmin']}><MemberList /></ProtectedRoute>} />
            <Route path="/admission" element={<ProtectedRoute roles={['admin', 'superadmin']}><MemberAdmission /></ProtectedRoute>} />
            <Route path="/collection" element={<ProtectedRoute><DailyCollection /></ProtectedRoute>} /> {/* Collectors need this too */}

            <Route path="/shares" element={<ProtectedRoute roles={['admin', 'superadmin']}><SharePage /></ProtectedRoute>} />
            <Route path="/dps" element={<ProtectedRoute roles={['admin', 'superadmin']}><DpsPage /></ProtectedRoute>} />
            <Route path="/fdr" element={<ProtectedRoute roles={['admin', 'superadmin']}><FdrPage /></ProtectedRoute>} />

            {/* Shareholder Routes */}
            <Route path="/shareholder-admission" element={<ProtectedRoute><ShareholderAdmission /></ProtectedRoute>} />
            <Route path="/shareholder-list" element={<ProtectedRoute><ShareholderList /></ProtectedRoute>} />

            <Route path="/credit-purchase" element={<ProtectedRoute roles={['admin', 'superadmin']}><CreditPurchasePage /></ProtectedRoute>} />
            <Route path="/product-application" element={<ProtectedRoute><ProductApplicationPage /></ProtectedRoute>} />
            <Route path="/hawlat" element={<ProtectedRoute roles={['admin', 'superadmin']}><HawlatPage /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute roles={['admin', 'superadmin']}><ExpensePage /></ProtectedRoute>} />

            <Route path="/directorship" element={<ProtectedRoute roles={['admin', 'superadmin']}><DirectorShipPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute roles={['admin', 'superadmin']}><SettingsPage /></ProtectedRoute>} />

            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/report-stock" element={<ProtectedRoute><StockReport /></ProtectedRoute>} />
            <Route path="/report-purchase" element={<ProtectedRoute><PurchaseReport /></ProtectedRoute>} />
            <Route path="/report-sell" element={<ProtectedRoute><SellReport /></ProtectedRoute>} />
            <Route path="/report-customer" element={<ProtectedRoute><CustomerReport /></ProtectedRoute>} />
            <Route path="/report-profit-loss" element={<ProtectedRoute><ProfitLossReport /></ProtectedRoute>} />
            <Route path="/report-cash-sheet" element={<ProtectedRoute><DailyCashSheet /></ProtectedRoute>} />
            <Route path="/report-ledger" element={<ProtectedRoute><GeneralLedger /></ProtectedRoute>} />
            <Route path="/report-balance-sheet" element={<ProtectedRoute><BalanceSheet /></ProtectedRoute>} />
          </Routes>
        </AppLayout>
      } />
    </Routes>
  );
}

export default App;
