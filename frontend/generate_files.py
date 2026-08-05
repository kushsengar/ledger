import os

base_dir = r"c:\Users\kushs\.vscode\ledger\frontend\src"

files = {
    "vite-env.d.ts": """/// <reference types="vite/client" />
""",
    "index.css": """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-primary: #0a0f1e;
  --bg-secondary: #111827;
  --bg-tertiary: #1a2332;
  --border-color: #1e293b;
  --border-light: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-emerald: #10b981;
  --accent-cyan: #06b6d4;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;
  --accent-purple: #8b5cf6;
  --accent-blue: #3b82f6;
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.4);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --transition: all 0.2s ease;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

a {
  color: var(--accent-emerald);
  text-decoration: none;
}

.app-layout { display: flex; min-height: 100vh; }
.sidebar { width: 260px; background: var(--bg-secondary); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; position: fixed; height: 100vh; z-index: 100; }
.sidebar-logo { padding: 24px; font-size: 1.5rem; font-weight: 700; color: var(--accent-emerald); border-bottom: 1px solid var(--border-color); }
.sidebar-nav { flex: 1; padding: 16px 12px; }
.sidebar-link { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: var(--radius-md); color: var(--text-secondary); transition: var(--transition); margin-bottom: 4px; font-size: 0.9rem; cursor: pointer; text-decoration: none; }
.sidebar-link:hover { background: var(--bg-tertiary); color: var(--text-primary); }
.sidebar-link.active { background: rgba(16, 185, 129, 0.1); color: var(--accent-emerald); font-weight: 500; }
.sidebar-user { padding: 16px; border-top: 1px solid var(--border-color); }
.main-content { margin-left: 260px; flex: 1; padding: 32px; min-height: 100vh; }

.card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; backdrop-filter: blur(10px); }
.card-header { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); }
.glass-card { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }

.btn { padding: 10px 20px; border-radius: var(--radius-md); font-weight: 500; cursor: pointer; transition: var(--transition); border: none; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 8px; justify-content: center; }
.btn-primary { background: var(--accent-emerald); color: white; }
.btn-primary:hover { background: #0ea572; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(16,185,129,0.3); }
.btn-secondary { background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-color); }
.btn-danger { background: var(--accent-rose); color: white; }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-sm { padding: 6px 14px; font-size: 0.8rem; }
.btn-lg { padding: 14px 28px; font-size: 1rem; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

.form-group { margin-bottom: 20px; }
.form-label { display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500; }
.form-input { width: 100%; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.9rem; transition: var(--transition); font-family: inherit; }
.form-input:focus { outline: none; border-color: var(--accent-emerald); box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
.form-error { color: var(--accent-rose); font-size: 0.8rem; margin-top: 4px; display: block; }
.form-select { width: 100%; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.9rem; transition: var(--transition); font-family: inherit; appearance: none; }
.form-select:focus { outline: none; border-color: var(--accent-emerald); box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }

.badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; }
.badge-draft { background: rgba(100,116,139,0.15); color: #94a3b8; }
.badge-submitted { background: rgba(59,130,246,0.15); color: #60a5fa; }
.badge-under-review { background: rgba(245,158,11,0.15); color: #fbbf24; }
.badge-approved { background: rgba(16,185,129,0.15); color: #34d399; }
.badge-rejected { background: rgba(244,63,94,0.15); color: #fb7185; }
.badge-escalated { background: rgba(139,92,246,0.15); color: #a78bfa; }

.table { width: 100%; border-collapse: collapse; }
.table th { text-align: left; padding: 12px 16px; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); }
.table td { padding: 14px 16px; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; }
.table tr:hover { background: rgba(255,255,255,0.02); }
.table-row-clickable { cursor: pointer; }

.stat-card { display: flex; align-items: flex-start; gap: 16px; padding: 24px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); }
.stat-icon { width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.stat-value { font-size: 1.8rem; font-weight: 700; line-height: 1; }
.stat-label { font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; }
.stat-trend { font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 4px; margin-top: 8px; }
.trend-up { color: var(--accent-emerald); }
.trend-down { color: var(--accent-rose); }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease; }
.modal-content { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px; max-width: 500px; width: 90%; animation: slideUp 0.3s ease; box-shadow: var(--shadow-lg); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }

.stepper { display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 40px; }
.stepper-step { display: flex; align-items: center; gap: 8px; }
.stepper-number { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem; border: 2px solid var(--border-color); color: var(--text-muted); transition: var(--transition); }
.stepper-step.active .stepper-number { background: var(--accent-emerald); border-color: var(--accent-emerald); color: white; }
.stepper-step.completed .stepper-number { background: var(--accent-emerald); border-color: var(--accent-emerald); color: white; }
.stepper-label { font-size: 0.85rem; color: var(--text-muted); }
.stepper-step.active .stepper-label { color: var(--text-primary); font-weight: 500; }
.stepper-step.completed .stepper-label { color: var(--accent-emerald); }
.stepper-line { width: 40px; height: 2px; background: var(--border-color); }
.stepper-line.completed { background: var(--accent-emerald); }

.dropzone { border: 2px dashed var(--border-color); border-radius: var(--radius-lg); padding: 40px; text-align: center; cursor: pointer; transition: var(--transition); }
.dropzone:hover, .dropzone-active { border-color: var(--accent-emerald); background: rgba(16,185,129,0.05); }

.timeline { position: relative; padding-left: 30px; }
.timeline::before { content: ''; position: absolute; left: 11px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
.timeline-item { position: relative; padding-bottom: 24px; }
.timeline-dot { position: absolute; left: -24px; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border-color); background: var(--bg-primary); }
.timeline-dot.approved { border-color: var(--accent-emerald); background: var(--accent-emerald); }
.timeline-dot.rejected { border-color: var(--accent-rose); background: var(--accent-rose); }
.timeline-dot.escalated { border-color: var(--accent-purple); background: var(--accent-purple); }

.kanban-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; min-height: 500px; }
.kanban-column { background: var(--bg-tertiary); border-radius: var(--radius-lg); padding: 16px; }
.kanban-column-header { font-size: 0.9rem; font-weight: 600; padding: 8px 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
.kanban-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px; cursor: pointer; transition: var(--transition); }
.kanban-card:hover { border-color: var(--accent-emerald); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }

.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0a0f1e 0%, #1a1040 50%, #0a0f1e 100%); position: relative; overflow: hidden; }
.login-card { background: rgba(17,24,39,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 48px; width: 440px; box-shadow: var(--shadow-lg); }
.login-logo { text-align: center; font-size: 2rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 8px; }
.login-subtitle { text-align: center; color: var(--text-muted); margin-bottom: 32px; font-size: 0.9rem; }

.dashboard-grid { display: grid; gap: 24px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px; }

.filter-tabs { display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 4px; }
.filter-tab { padding: 8px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: var(--transition); background: var(--bg-tertiary); color: var(--text-secondary); border: none; }
.filter-tab.active { background: var(--accent-emerald); color: white; }

.page-header { margin-bottom: 24px; }
.page-title { font-size: 1.5rem; font-weight: 700; }
.page-subtitle { color: var(--text-secondary); font-size: 0.9rem; margin-top: 4px; }
.flex { display: flex; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.gap-sm { gap: 8px; }
.gap-md { gap: 16px; }
.gap-lg { gap: 24px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.mt-sm { margin-top: 8px; }
.mt-md { margin-top: 16px; }
.mt-lg { margin-top: 24px; }
.text-center { text-align: center; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: var(--text-secondary); }
.text-emerald { color: var(--accent-emerald); }
.text-rose { color: var(--accent-rose); }
.text-amber { color: var(--accent-amber); }
.amount { font-family: 'Inter', monospace; font-weight: 600; }
.spinner { width: 20px; height: 20px; border: 2px solid var(--border-color); border-top-color: var(--accent-emerald); border-radius: 50%; animation: spin 0.6s linear infinite; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 3px; }

.demo-credentials { margin-top: 24px; padding: 16px; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-color); }
.demo-credentials h4 { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
.demo-credentials table { width: 100%; font-size: 0.8rem; }
.demo-credentials td { padding: 4px 8px; }
""",
    "types/index.ts": """export type LoanStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ESCALATED';
export type LoanType = 'PERSONAL' | 'HOME' | 'VEHICLE' | 'BUSINESS';
export type UserRole = 'APPLICANT' | 'LOAN_OFFICER' | 'BRANCH_MANAGER' | 'CREDIT_RISK_OFFICER' | 'ADMIN';
export type DocumentType = 'ID_PROOF' | 'ADDRESS_PROOF' | 'SALARY_SLIP' | 'BANK_STATEMENT';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber: string;
  dateOfBirth: string;
  address: string;
  employmentType: string;
  annualIncome: number;
  monthlyDebt: number;
}

export interface Loan {
  id: number;
  applicationNumber: string;
  applicant: Applicant;
  loanType: LoanType;
  requestedAmount: number;
  approvedAmount?: number;
  tenureMonths: number;
  interestRate?: number;
  status: LoanStatus;
  riskScore?: number;
  riskCategory?: string;
  assignedToName?: string;
  documents: LoanDocument[];
  approvalSteps: ApprovalStep[];
  createdAt: string;
  updatedAt: string;
}

export interface LoanDocument {
  id: number;
  documentType: DocumentType;
  fileName: string;
  fileSize: number;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface ApprovalStep {
  id: number;
  stepOrder: number;
  action: string;
  actorUsername: string;
  comments: string;
  requiredRole: string;
  actionTimestamp: string;
}

export interface DashboardStats {
  totalLoans: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
  escalatedLoans: number;
  approvalRate: number;
  rejectionRate: number;
  avgProcessingDays: number;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: UserRole;
  fullName: string;
}

export interface WizardFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber: string;
  dateOfBirth: string;
  address: string;
  employmentType: string;
  annualIncome: number;
  monthlyDebt: number;
  loanType: LoanType | '';
  requestedAmount: number;
  tenureMonths: number;
  documents: Array<{ file: File; documentType: DocumentType }>;
}
""",
    "api/axiosClient.ts": """import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '/api/v1',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ledger_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ledger_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
""",
    "api/authApi.ts": """import { axiosClient } from './axiosClient';
import { AuthResponse, User } from '../types';

export const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const { data } = await axiosClient.post('/auth/login', { username, password });
    return data;
  },
  register: async (registerData: any): Promise<AuthResponse> => {
    const { data } = await axiosClient.post('/auth/register', registerData);
    return data;
  },
  getMe: async (): Promise<User> => {
    const { data } = await axiosClient.get('/auth/me');
    return data;
  }
};
""",
    "api/loanApi.ts": """import { axiosClient } from './axiosClient';
import { Loan, DashboardStats } from '../types';

export const loanApi = {
  getLoans: async (status?: string): Promise<Loan[]> => {
    const { data } = await axiosClient.get('/loans', { params: { status } });
    return data;
  },
  getLoanById: async (id: number): Promise<Loan> => {
    const { data } = await axiosClient.get(`/loans/${id}`);
    return data;
  },
  createLoan: async (loanData: any): Promise<Loan> => {
    const { data } = await axiosClient.post('/loans', loanData);
    return data;
  },
  submitLoan: async (id: number): Promise<Loan> => {
    const { data } = await axiosClient.put(`/loans/${id}/submit`);
    return data;
  },
  startReview: async (id: number): Promise<Loan> => {
    const { data } = await axiosClient.put(`/loans/${id}/review`);
    return data;
  },
  approveLoan: async (id: number, comments: string): Promise<Loan> => {
    const { data } = await axiosClient.put(`/loans/${id}/approve`, { comments });
    return data;
  },
  rejectLoan: async (id: number, comments: string): Promise<Loan> => {
    const { data } = await axiosClient.put(`/loans/${id}/reject`, { comments });
    return data;
  },
  escalateLoan: async (id: number, comments: string): Promise<Loan> => {
    const { data } = await axiosClient.put(`/loans/${id}/escalate`, { comments });
    return data;
  },
  getMyQueue: async (): Promise<Loan[]> => {
    const { data } = await axiosClient.get('/loans/my-queue');
    return data;
  },
  getLoanAudit: async (id: number): Promise<any[]> => {
    const { data } = await axiosClient.get(`/loans/${id}/audit`);
    return data;
  },
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await axiosClient.get('/dashboard/stats');
    return data;
  }
};
""",
    "api/applicantApi.ts": """import { axiosClient } from './axiosClient';
import { Applicant } from '../types';

export const applicantApi = {
  createApplicant: async (applicantData: any): Promise<Applicant> => {
    const { data } = await axiosClient.post('/applicants', applicantData);
    return data;
  },
  getApplicants: async (): Promise<Applicant[]> => {
    const { data } = await axiosClient.get('/applicants');
    return data;
  }
};
""",
    "api/documentApi.ts": """import { axiosClient } from './axiosClient';
import { LoanDocument, DocumentType } from '../types';

export const documentApi = {
  uploadDocument: async (loanId: number, file: File, documentType: DocumentType): Promise<LoanDocument> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    const { data } = await axiosClient.post(`/loans/${loanId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  getDocuments: async (loanId: number): Promise<LoanDocument[]> => {
    const { data } = await axiosClient.get(`/loans/${loanId}/documents`);
    return data;
  },
  downloadDocument: async (id: number): Promise<Blob> => {
    const { data } = await axiosClient.get(`/documents/${id}/download`, { responseType: 'blob' });
    return data;
  }
};
""",
    "context/AuthContext.tsx": """import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('ledger_token');
      if (token) {
        try {
          const userData = await authApi.getMe();
          setUser(userData);
        } catch {
          localStorage.removeItem('ledger_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await authApi.login(username, password);
    localStorage.setItem('ledger_token', data.token);
    const userData = await authApi.getMe();
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('ledger_token');
    setUser(null);
  };

  const hasRole = (...roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
""",
    "hooks/useAuth.ts": """import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
""",
    "hooks/useMultiStepForm.ts": """import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ledger_loan_draft';

export function useMultiStepForm<T extends Record<string, any>>(steps: string[], defaultValues: T) {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_step');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [formData, setFormData] = useState<T>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_data');
    if (saved) {
      try { return JSON.parse(saved); } catch { return defaultValues; }
    }
    return defaultValues;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_step', String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    const { documents, ...rest } = formData as any;
    localStorage.setItem(STORAGE_KEY + '_data', JSON.stringify(rest));
  }, [formData]);

  const next = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 0));
  const goTo = (step: number) => setCurrentStep(step);
  const updateFields = (fields: Partial<T>) => setFormData(prev => ({ ...prev, ...fields }));
  const clearSaved = () => {
    localStorage.removeItem(STORAGE_KEY + '_step');
    localStorage.removeItem(STORAGE_KEY + '_data');
    setCurrentStep(0);
    setFormData(defaultValues);
  };

  return {
    currentStep, steps, formData, isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    next, prev, goTo, updateFields, clearSaved,
  };
}
""",
    "components/layout/Sidebar.tsx": """import React from 'react';
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
""",
    "components/layout/MainLayout.tsx": """import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
""",
    "components/layout/ProtectedRoute.tsx": """import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { Spinner } from '../ui/Spinner';

export const ProtectedRoute = ({ roles }: { roles?: UserRole[] }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const hasRequiredRole = roles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};
""",
    "components/ui/Badge.tsx": """import React from 'react';
import { LoanStatus } from '../../types';

export const Badge = ({ status, children }: { status: LoanStatus | string, children?: React.ReactNode }) => {
  let statusClass = 'badge-draft';
  if (status === 'SUBMITTED') statusClass = 'badge-submitted';
  else if (status === 'UNDER_REVIEW') statusClass = 'badge-under-review';
  else if (status === 'APPROVED') statusClass = 'badge-approved';
  else if (status === 'REJECTED') statusClass = 'badge-rejected';
  else if (status === 'ESCALATED') statusClass = 'badge-escalated';

  const text = status.replace(/_/g, ' ');

  return (
    <span className={`badge ${statusClass}`}>
      {children || text}
    </span>
  );
};
""",
    "components/ui/Modal.tsx": """import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
""",
    "components/ui/Stepper.tsx": """import React from 'react';
import { Check } from 'lucide-react';

export const Stepper = ({ steps, currentStep, onStepClick }: { steps: string[], currentStep: number, onStepClick?: (i: number) => void }) => {
  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <React.Fragment key={step}>
            <div 
              className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onStepClick && onStepClick(i)}
              style={{ cursor: onStepClick ? 'pointer' : 'default' }}
            >
              <div className="stepper-number">
                {isCompleted ? <Check size={16} /> : (i + 1)}
              </div>
              <div className="stepper-label">{step}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`stepper-line ${isCompleted ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
""",
    "components/ui/StatCard.tsx": """import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ icon, label, value, trend, color = 'var(--accent-emerald)' }: { icon: ReactNode, label: string, value: string | number, trend?: number, color?: string }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color: color }}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend >= 0 ? 'trend-up' : 'trend-down'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}% from last month
          </div>
        )}
      </div>
    </div>
  );
};
""",
    "components/ui/Spinner.tsx": """import React from 'react';

export function Spinner({ size = 20 }: { size?: number }) {
  return <div className="spinner" style={{ width: size, height: size }} />;
}
""",
    "pages/auth/LoginPage.tsx": """import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Ledger</div>
        <div className="login-subtitle">Loan Origination System</div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              className="form-input" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className="form-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials (password: password)</h4>
          <table>
            <tbody>
              <tr><td>john_applicant</td><td>APPLICANT</td></tr>
              <tr><td>sarah_officer</td><td>LOAN_OFFICER</td></tr>
              <tr><td>mike_manager</td><td>BRANCH_MANAGER</td></tr>
              <tr><td>lisa_risk</td><td>CREDIT_RISK</td></tr>
              <tr><td>admin</td><td>ADMIN</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
""",
    "pages/dashboard/DashboardPage.tsx": """import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { StatCard } from '../../components/ui/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { FileText, Clock, CheckCircle, XCircle, TrendingUp, Timer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockTrendData = [
  { name: 'Jan', approvals: 4000, rejections: 2400 },
  { name: 'Feb', approvals: 3000, rejections: 1398 },
  { name: 'Mar', approvals: 2000, rejections: 9800 },
  { name: 'Apr', approvals: 2780, rejections: 3908 },
  { name: 'May', approvals: 1890, rejections: 4800 },
  { name: 'Jun', approvals: 2390, rejections: 3800 },
  { name: 'Jul', approvals: 3490, rejections: 4300 },
];

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#f43f5e', '#8b5cf6'];

export const DashboardPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: loanApi.getDashboardStats,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;

  const pieData = stats ? [
    { name: 'Approved', value: stats.approvedLoans },
    { name: 'Pending', value: stats.pendingLoans },
    { name: 'Submitted', value: stats.totalLoans - stats.approvedLoans - stats.pendingLoans - stats.rejectedLoans - stats.escalatedLoans },
    { name: 'Rejected', value: stats.rejectedLoans },
    { name: 'Escalated', value: stats.escalatedLoans },
  ].filter(d => d.value > 0) : [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="page-subtitle">Overview of loan applications and processing</div>
      </div>

      {stats && (
        <div className="dashboard-grid">
          <div className="stats-grid">
            <StatCard icon={<FileText />} label="Total Loans" value={stats.totalLoans} color="var(--accent-blue)" />
            <StatCard icon={<Clock />} label="Pending" value={stats.pendingLoans} color="var(--accent-amber)" />
            <StatCard icon={<CheckCircle />} label="Approved" value={stats.approvedLoans} color="var(--accent-emerald)" />
            <StatCard icon={<XCircle />} label="Rejected" value={stats.rejectedLoans} color="var(--accent-rose)" />
            <StatCard icon={<TrendingUp />} label="Approval Rate" value={`${stats.approvalRate}%`} color="var(--accent-emerald)" trend={2.5} />
            <StatCard icon={<Timer />} label="Avg Processing" value={`${stats.avgProcessingDays} days`} color="var(--text-secondary)" />
          </div>

          <div className="charts-grid">
            <div className="card">
              <div className="card-header">
                <h3>Application Trends</h3>
              </div>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTrendData}>
                    <defs>
                      <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-emerald)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--accent-emerald)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRej" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-rose)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--accent-rose)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
                    <Area type="monotone" dataKey="approvals" stroke="var(--accent-emerald)" fillOpacity={1} fill="url(#colorApp)" />
                    <Area type="monotone" dataKey="rejections" stroke="var(--accent-rose)" fillOpacity={1} fill="url(#colorRej)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Loans by Status</h3>
              </div>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
""",
    "pages/application/LoanWizard.tsx": """import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { WizardFormData } from '../../types';
import { Stepper } from '../../components/ui/Stepper';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { ReviewStep } from './steps/ReviewStep';
import { applicantApi } from '../../api/applicantApi';
import { loanApi } from '../../api/loanApi';
import { documentApi } from '../../api/documentApi';
import { toast } from 'sonner';

const defaultValues: WizardFormData = {
  firstName: '', lastName: '', email: '', phone: '', panNumber: '', dateOfBirth: '', address: '',
  employmentType: 'SALARIED', annualIncome: 0, monthlyDebt: 0, loanType: 'PERSONAL', requestedAmount: 100000, tenureMonths: 12,
  documents: []
};

export const LoanWizard = () => {
  const { currentStep, steps, formData, isFirstStep, isLastStep, next, prev, goTo, updateFields, clearSaved } = useMultiStepForm([
    'Personal Info', 'Financial Details', 'Documents', 'Review'
  ], defaultValues);
  
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      const applicant = await applicantApi.createApplicant({
        firstName: formData.firstName, lastName: formData.lastName, email: formData.email,
        phone: formData.phone, panNumber: formData.panNumber, dateOfBirth: formData.dateOfBirth,
        address: formData.address, employmentType: formData.employmentType, annualIncome: formData.annualIncome,
        monthlyDebt: formData.monthlyDebt
      });
      
      const loan = await loanApi.createLoan({
        applicantId: applicant.id, loanType: formData.loanType,
        requestedAmount: formData.requestedAmount, tenureMonths: formData.tenureMonths
      });

      if (formData.documents && formData.documents.length > 0) {
        for (const doc of formData.documents) {
          await documentApi.uploadDocument(loan.id, doc.file, doc.documentType);
        }
      }

      await loanApi.submitLoan(loan.id);

      toast.success('Loan application submitted successfully!');
      clearSaved();
      navigate(`/loans/${loan.id}`);
    } catch (err: any) {
      toast.error('Failed to submit application: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={goTo} />
      
      <div className="mt-lg">
        {currentStep === 0 && <PersonalInfoStep formData={formData} updateFields={updateFields} onNext={next} />}
        {currentStep === 1 && <FinancialDetailsStep formData={formData} updateFields={updateFields} onNext={next} onBack={prev} />}
        {currentStep === 2 && <DocumentUploadStep formData={formData} updateFields={updateFields} onNext={next} onBack={prev} />}
        {currentStep === 3 && <ReviewStep formData={formData} onBack={prev} onSubmit={handleFinalSubmit} onEdit={goTo} />}
      </div>
    </div>
  );
};
""",
    "pages/application/steps/PersonalInfoStep.tsx": """import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WizardFormData } from '../../../types';

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone'),
  panNumber: z.string().min(10, 'Invalid PAN'),
  dateOfBirth: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Required'),
});

export const PersonalInfoStep = ({ formData, updateFields, onNext }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    updateFields(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input className="form-input" {...register('firstName')} />
          {errors.firstName && <span className="form-error">{errors.firstName.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="form-input" {...register('lastName')} />
          {errors.lastName && <span className="form-error">{errors.lastName.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" {...register('email')} />
          {errors.email && <span className="form-error">{errors.email.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" {...register('phone')} />
          {errors.phone && <span className="form-error">{errors.phone.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">PAN Number</label>
          <input className="form-input" {...register('panNumber')} />
          {errors.panNumber && <span className="form-error">{errors.panNumber.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-input" {...register('dateOfBirth')} />
          {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth.message as string}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <textarea className="form-input" rows={3} {...register('address')} />
        {errors.address && <span className="form-error">{errors.address.message as string}</span>}
      </div>
      <div className="flex gap-md" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
        <button type="submit" className="btn btn-primary">Next Step</button>
      </div>
    </form>
  );
};
""",
    "pages/application/steps/FinancialDetailsStep.tsx": """import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  employmentType: z.enum(['SALARIED', 'SELF_EMPLOYED']),
  annualIncome: z.coerce.number().min(1, 'Required'),
  monthlyDebt: z.coerce.number().min(0, 'Required'),
  loanType: z.enum(['PERSONAL', 'HOME', 'VEHICLE', 'BUSINESS']),
  requestedAmount: z.coerce.number().min(10000, 'Minimum 10,000'),
  tenureMonths: z.coerce.number().min(12, 'Min 12 months').max(120, 'Max 120 months'),
});

export const FinancialDetailsStep = ({ formData, updateFields, onNext, onBack }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    updateFields(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Employment Type</label>
          <select className="form-select" {...register('employmentType')}>
            <option value="SALARIED">Salaried</option>
            <option value="SELF_EMPLOYED">Self Employed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Loan Type</label>
          <select className="form-select" {...register('loanType')}>
            <option value="PERSONAL">Personal Loan</option>
            <option value="HOME">Home Loan</option>
            <option value="VEHICLE">Vehicle Loan</option>
            <option value="BUSINESS">Business Loan</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Annual Income (₹)</label>
          <input type="number" className="form-input" {...register('annualIncome')} />
          {errors.annualIncome && <span className="form-error">{errors.annualIncome.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Debt (₹)</label>
          <input type="number" className="form-input" {...register('monthlyDebt')} />
          {errors.monthlyDebt && <span className="form-error">{errors.monthlyDebt.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Requested Amount (₹)</label>
          <input type="number" className="form-input" {...register('requestedAmount')} />
          {errors.requestedAmount && <span className="form-error">{errors.requestedAmount.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Tenure (Months)</label>
          <select className="form-select" {...register('tenureMonths')}>
            {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map(m => (
              <option key={m} value={m}>{m} Months</option>
            ))}
          </select>
          {errors.tenureMonths && <span className="form-error">{errors.tenureMonths.message as string}</span>}
        </div>
      </div>
      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="submit" className="btn btn-primary">Next Step</button>
      </div>
    </form>
  );
};
""",
    "pages/application/steps/DocumentUploadStep.tsx": """import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, File } from 'lucide-react';
import { DocumentType } from '../../../types';

export const DocumentUploadStep = ({ formData, updateFields, onNext, onBack }: any) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocs = acceptedFiles.map(file => ({
      file,
      documentType: 'ID_PROOF' as DocumentType
    }));
    updateFields({ documents: [...(formData.documents || []), ...newDocs] });
  }, [formData.documents, updateFields]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5242880
  });

  const removeDoc = (index: number) => {
    const newDocs = [...formData.documents];
    newDocs.splice(index, 1);
    updateFields({ documents: newDocs });
  };

  const updateDocType = (index: number, type: DocumentType) => {
    const newDocs = [...formData.documents];
    newDocs[index].documentType = type;
    updateFields({ documents: newDocs });
  };

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}>
        <input {...getInputProps()} />
        <UploadCloud size={48} className="text-emerald" style={{ margin: '0 auto 16px' }} />
        <p>Drag & drop some files here, or click to select files</p>
        <p className="text-sm text-muted mt-sm">Only PDF, JPG, PNG up to 5MB are supported.</p>
      </div>

      {formData.documents && formData.documents.length > 0 && (
        <div className="mt-lg">
          <h4>Uploaded Files</h4>
          <div className="mt-sm">
            {formData.documents.map((doc: any, index: number) => (
              <div key={index} className="flex-between card" style={{ padding: '12px 16px', marginBottom: 8 }}>
                <div className="flex items-center gap-md">
                  <File size={20} className="text-muted" />
                  <div>
                    <div className="text-sm">{doc.file.name}</div>
                    <div className="text-xs text-muted">{(doc.file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <div className="flex gap-md items-center">
                  <select 
                    className="form-select" 
                    value={doc.documentType} 
                    onChange={e => updateDocType(index, e.target.value as DocumentType)}
                    style={{ width: 150, padding: '4px 8px' }}
                  >
                    <option value="ID_PROOF">ID Proof</option>
                    <option value="ADDRESS_PROOF">Address Proof</option>
                    <option value="SALARY_SLIP">Salary Slip</option>
                    <option value="BANK_STATEMENT">Bank Statement</option>
                  </select>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeDoc(index)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Review Application</button>
      </div>
    </div>
  );
};
""",
    "pages/application/steps/ReviewStep.tsx": """import React from 'react';

export const ReviewStep = ({ formData, onBack, onSubmit, onEdit }: any) => {
  return (
    <div>
      <div className="card mb-lg">
        <div className="flex-between card-header">
          <h3>Personal Information</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(0)}>Edit</button>
        </div>
        <div className="grid-2">
          <div><label className="text-muted text-sm">Name</label><div>{formData.firstName} {formData.lastName}</div></div>
          <div><label className="text-muted text-sm">Email</label><div>{formData.email}</div></div>
          <div><label className="text-muted text-sm">Phone</label><div>{formData.phone}</div></div>
          <div><label className="text-muted text-sm">PAN</label><div>{formData.panNumber}</div></div>
          <div><label className="text-muted text-sm">DOB</label><div>{formData.dateOfBirth}</div></div>
          <div><label className="text-muted text-sm">Address</label><div>{formData.address}</div></div>
        </div>
      </div>

      <div className="card mb-lg">
        <div className="flex-between card-header">
          <h3>Financial Details</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(1)}>Edit</button>
        </div>
        <div className="grid-2">
          <div><label className="text-muted text-sm">Employment</label><div>{formData.employmentType}</div></div>
          <div><label className="text-muted text-sm">Loan Type</label><div>{formData.loanType}</div></div>
          <div><label className="text-muted text-sm">Annual Income</label><div className="amount">₹{formData.annualIncome.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Monthly Debt</label><div className="amount">₹{formData.monthlyDebt.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Requested Amount</label><div className="amount">₹{formData.requestedAmount.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Tenure</label><div>{formData.tenureMonths} Months</div></div>
        </div>
      </div>

      <div className="card">
        <div className="flex-between card-header">
          <h3>Documents</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(2)}>Edit</button>
        </div>
        {formData.documents && formData.documents.length > 0 ? (
          <ul>
            {formData.documents.map((doc: any, i: number) => (
              <li key={i} className="mb-sm">{doc.documentType.replace('_', ' ')} - {doc.file.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No documents uploaded.</p>
        )}
      </div>

      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit Application</button>
      </div>
    </div>
  );
};
""",
    "pages/loans/LoanListPage.tsx": """import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { format } from 'date-fns';

const TABS = ['All', 'Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Escalated'];

export const LoanListPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const statusMap: Record<string, string> = {
    'All': '',
    'Draft': 'DRAFT',
    'Submitted': 'SUBMITTED',
    'Under Review': 'UNDER_REVIEW',
    'Approved': 'APPROVED',
    'Rejected': 'REJECTED',
    'Escalated': 'ESCALATED'
  };

  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans', activeTab],
    queryFn: () => loanApi.getLoans(statusMap[activeTab] || undefined),
  });

  const filteredLoans = loans?.filter(l => 
    l.applicationNumber.toLowerCase().includes(search.toLowerCase()) || 
    `${l.applicant.firstName} ${l.applicant.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Loan Applications</h1>
          <div className="page-subtitle">Manage and track all loan requests</div>
        </div>
        <input 
          type="text" 
          placeholder="Search loans..." 
          className="form-input" 
          style={{ width: 250 }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        {TABS.map(tab => (
          <button 
            key={tab} 
            className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-lg" style={{ padding: 40 }}><Spinner /></div>
        ) : filteredLoans && filteredLoans.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>App #</th>
                <th>Applicant</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Risk Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="table-row-clickable" onClick={() => navigate(`/loans/${loan.id}`)}>
                  <td>{loan.applicationNumber}</td>
                  <td>{loan.applicant.firstName} {loan.applicant.lastName}</td>
                  <td>{loan.loanType}</td>
                  <td className="amount">₹{loan.requestedAmount.toLocaleString()}</td>
                  <td><Badge status={loan.status} /></td>
                  <td>{loan.riskScore ? <span className={loan.riskScore > 70 ? 'text-emerald' : 'text-amber'}>{loan.riskScore}</span> : '-'}</td>
                  <td>{format(new Date(loan.createdAt), 'MMM dd, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted" style={{ padding: 40 }}>No loans found.</div>
        )}
      </div>
    </div>
  );
};
""",
    "pages/loans/LoanDetailPage.tsx": """import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { useAuth } from '../../hooks/useAuth';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const LoanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasRole, user } = useAuth();
  const queryClient = useQueryClient();
  
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | 'ESCALATE' | null>(null);
  const [comments, setComments] = useState('');

  const { data: loan, isLoading } = useQuery({
    queryKey: ['loan', id],
    queryFn: () => loanApi.getLoanById(Number(id)),
    enabled: !!id,
  });

  const actionMutation = useMutation({
    mutationFn: async ({ action, comments }: { action: string, comments?: string }) => {
      const loanId = Number(id);
      if (action === 'submit') return loanApi.submitLoan(loanId);
      if (action === 'review') return loanApi.startReview(loanId);
      if (action === 'approve') return loanApi.approveLoan(loanId, comments || '');
      if (action === 'reject') return loanApi.rejectLoan(loanId, comments || '');
      if (action === 'escalate') return loanApi.escalateLoan(loanId, comments || '');
      throw new Error('Unknown action');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan', id] });
      toast.success('Action successful');
      setModalType(null);
      setComments('');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;
  if (!loan) return <div className="p-lg">Loan not found</div>;

  const handleAction = (action: string) => {
    if (['approve', 'reject', 'escalate'].includes(action)) {
      setModalType(action.toUpperCase() as any);
    } else {
      actionMutation.mutate({ action });
    }
  };

  const submitModalAction = () => {
    actionMutation.mutate({ action: modalType?.toLowerCase() || '', comments });
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <div className="flex items-center gap-md">
            <h1 className="page-title">{loan.applicationNumber}</h1>
            <Badge status={loan.status} />
          </div>
          <div className="page-subtitle">Submitted on {format(new Date(loan.createdAt), 'MMMM dd, yyyy')}</div>
        </div>
        <div className="flex gap-sm">
          {loan.status === 'DRAFT' && hasRole('APPLICANT', 'LOAN_OFFICER') && (
            <button className="btn btn-primary" onClick={() => handleAction('submit')}>Submit for Review</button>
          )}
          {loan.status === 'SUBMITTED' && hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <button className="btn btn-primary" onClick={() => handleAction('review')}>Start Review</button>
          )}
          {loan.status === 'UNDER_REVIEW' && hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <>
              <button className="btn btn-danger" onClick={() => handleAction('reject')}>Reject</button>
              <button className="btn btn-secondary" onClick={() => handleAction('escalate')}>Escalate</button>
              <button className="btn btn-primary" onClick={() => handleAction('approve')}>Approve</button>
            </>
          )}
          {loan.status === 'ESCALATED' && hasRole('BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <>
              <button className="btn btn-danger" onClick={() => handleAction('reject')}>Reject</button>
              <button className="btn btn-primary" onClick={() => handleAction('approve')}>Approve</button>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="flex flex-col gap-md">
          <div className="card">
            <div className="card-header"><h3>Applicant Info</h3></div>
            <div className="grid-2">
              <div><label className="text-muted text-sm">Name</label><div>{loan.applicant.firstName} {loan.applicant.lastName}</div></div>
              <div><label className="text-muted text-sm">Email</label><div>{loan.applicant.email}</div></div>
              <div><label className="text-muted text-sm">Phone</label><div>{loan.applicant.phone}</div></div>
              <div><label className="text-muted text-sm">PAN</label><div>{loan.applicant.panNumber}</div></div>
            </div>
            <div className="mt-md"><label className="text-muted text-sm">Address</label><div>{loan.applicant.address}</div></div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Loan Details</h3></div>
            <div className="grid-2">
              <div><label className="text-muted text-sm">Type</label><div>{loan.loanType}</div></div>
              <div><label className="text-muted text-sm">Amount</label><div className="amount">₹{loan.requestedAmount.toLocaleString()}</div></div>
              <div><label className="text-muted text-sm">Tenure</label><div>{loan.tenureMonths} Months</div></div>
              <div><label className="text-muted text-sm">Interest Rate</label><div>{loan.interestRate ? `${loan.interestRate}%` : 'TBD'}</div></div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header"><h3>Documents</h3></div>
            {loan.documents && loan.documents.length > 0 ? (
              <table className="table">
                <thead><tr><th>Type</th><th>File</th><th>Size</th><th>Status</th></tr></thead>
                <tbody>
                  {loan.documents.map(doc => (
                    <tr key={doc.id}>
                      <td>{doc.documentType.replace('_', ' ')}</td>
                      <td><a href={`/api/v1/documents/${doc.id}/download`} target="_blank" rel="noreferrer">{doc.fileName}</a></td>
                      <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                      <td><Badge status={doc.verificationStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No documents uploaded.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-md">
          <div className="card">
            <div className="card-header"><h3>Risk Assessment</h3></div>
            {loan.riskScore ? (
              <>
                <div className="text-center mb-md">
                  <div className={`amount ${loan.riskScore > 70 ? 'text-emerald' : 'text-amber'}`} style={{ fontSize: '3rem' }}>
                    {loan.riskScore}
                  </div>
                  <div className="text-sm text-muted">Risk Score</div>
                </div>
                <div><label className="text-muted text-sm">Category</label><div>{loan.riskCategory}</div></div>
              </>
            ) : (
              <p className="text-muted">Not assessed yet.</p>
            )}
          </div>

          <div className="card">
            <div className="card-header"><h3>Approval Timeline</h3></div>
            <div className="timeline">
              {loan.approvalSteps && loan.approvalSteps.map(step => (
                <div key={step.id} className="timeline-item">
                  <div className={`timeline-dot ${step.action.toLowerCase()}`} />
                  <div className="text-sm font-semibold">{step.action.replace('_', ' ')}</div>
                  <div className="text-xs text-muted">{format(new Date(step.actionTimestamp), 'MMM dd, h:mm a')} by {step.actorUsername}</div>
                  {step.comments && <div className="text-sm mt-sm" style={{ background: 'var(--bg-tertiary)', padding: 8, borderRadius: 6 }}>{step.comments}</div>}
                </div>
              ))}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="text-sm font-semibold">Application Created</div>
                <div className="text-xs text-muted">{format(new Date(loan.createdAt), 'MMM dd, h:mm a')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)} title={`${modalType} Loan`}>
        <div className="form-group">
          <label className="form-label">Comments (Required for Reject/Escalate)</label>
          <textarea 
            className="form-input" 
            rows={4} 
            value={comments} 
            onChange={e => setComments(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={() => setModalType(null)}>Cancel</button>
          <button 
            className={`btn ${modalType === 'REJECT' ? 'btn-danger' : 'btn-primary'}`} 
            onClick={submitModalAction}
            disabled={actionMutation.isPending || ((modalType === 'REJECT' || modalType === 'ESCALATE') && !comments)}
          >
            {actionMutation.isPending ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
""",
    "pages/approvals/ApprovalQueuePage.tsx": """import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';

export const ApprovalQueuePage = () => {
  const navigate = useNavigate();
  const { data: queue, isLoading } = useQuery({
    queryKey: ['myQueue'],
    queryFn: loanApi.getMyQueue,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;

  const submitted = queue?.filter(l => l.status === 'SUBMITTED') || [];
  const underReview = queue?.filter(l => l.status === 'UNDER_REVIEW') || [];
  const escalated = queue?.filter(l => l.status === 'ESCALATED') || [];

  const KanbanCard = ({ loan }: { loan: any }) => (
    <div className="kanban-card" onClick={() => navigate(`/loans/${loan.id}`)}>
      <div className="flex-between mb-sm">
        <span className="text-xs font-semibold text-muted">{loan.applicationNumber}</span>
        {loan.riskScore && <span className="text-xs font-bold" style={{ color: loan.riskScore > 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>Score: {loan.riskScore}</span>}
      </div>
      <div className="font-semibold mb-sm">{loan.applicant.firstName} {loan.applicant.lastName}</div>
      <div className="flex-between mt-md">
        <span className="badge badge-draft">{loan.loanType}</span>
        <span className="amount text-sm">₹{loan.requestedAmount.toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Approval Queue</h1>
        <div className="page-subtitle">Loans requiring your attention</div>
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Submitted ({submitted.length})</span>
          </div>
          {submitted.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Under Review ({underReview.length})</span>
          </div>
          {underReview.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Escalated ({escalated.length})</span>
          </div>
          {escalated.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
      </div>
    </div>
  );
};
""",
    "pages/audit/AuditLogPage.tsx": """import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { format } from 'date-fns';
import { Spinner } from '../../components/ui/Spinner';

export const AuditLogPage = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/audit/all');
      return data;
    },
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Audit Log</h1>
        <div className="page-subtitle">System-wide activity tracking</div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-lg" style={{ padding: 40 }}><Spinner /></div>
        ) : logs && logs.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Entity Type</th>
                <th>Entity ID</th>
                <th>Action</th>
                <th>Actor</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log.id}>
                  <td className="text-sm">{format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}</td>
                  <td>{log.entityType}</td>
                  <td>{log.entityId}</td>
                  <td><span className="badge badge-submitted">{log.action}</span></td>
                  <td>{log.actorUsername}</td>
                  <td className="text-sm text-muted max-w-xs truncate" title={log.details}>{log.details?.substring(0, 50)}{log.details?.length > 50 ? '...' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted" style={{ padding: 40 }}>No audit logs found.</div>
        )}
      </div>
    </div>
  );
};
""",
    "pages/NotFoundPage.tsx": """import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-md text-center">
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-rose)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="btn btn-primary mt-md">Back to Dashboard</Link>
    </div>
  );
};
""",
    "pages/UnauthorizedPage.tsx": """import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-md text-center">
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-amber)' }}>403</h1>
      <h2>Access Denied</h2>
      <p className="text-muted">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="btn btn-primary mt-md">Back to Dashboard</Link>
    </div>
  );
};
""",
    "App.tsx": """import React from 'react';
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
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files created successfully.")
