import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LoanWizard } from './pages/application/LoanWizard';
import { LoanListPage } from './pages/loans/LoanListPage';
import { LoanDetailPage } from './pages/loans/LoanDetailPage';
import { ApprovalQueuePage } from './pages/approvals/ApprovalQueuePage';
import { AuditLogPage } from './pages/audit/AuditLogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/apply" element={<LoanWizard />} />
          <Route path="/loans" element={<LoanListPage />} />
          <Route path="/loans/:id" element={<LoanDetailPage />} />
          <Route element={<ProtectedRoute roles={['LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER', 'ADMIN']} />}>
            <Route path="/approvals" element={<ApprovalQueuePage />} />
          </Route>
          <Route element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route path="/audit" element={<AuditLogPage />} />
          </Route>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
