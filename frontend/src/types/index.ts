export type LoanStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ESCALATED';
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

export interface AuditLog {
  id: number;
  entityType: string;
  entityId: number;
  action: string;
  actorUsername: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}
