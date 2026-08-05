import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FilePlus, FileText, ClipboardCheck, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = () => {
  const { user, hasRole, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Ledger</div>
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        {(hasRole('APPLICANT', 'LOAN_OFFICER') || !user) && (
          <NavLink to="/apply" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FilePlus size={18} /> Apply for Loan
          </NavLink>
        )}
        <NavLink to="/loans" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <FileText size={18} /> Loan Applications
        </NavLink>
        {hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
          <NavLink to="/approvals" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <ClipboardCheck size={18} /> Approval Queue
          </NavLink>
        )}
        {hasRole('ADMIN') && (
          <NavLink to="/audit" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Shield size={18} /> Audit Log
          </NavLink>
        )}
      </div>
      <div className="sidebar-user">
        <div className="flex-between mb-sm" style={{ marginBottom: '12px' }}>
          <div>
            <div className="text-sm font-semibold">{user?.fullName || 'Guest'}</div>
            <div className="badge badge-submitted mt-sm">{user?.role || 'GUEST'}</div>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
