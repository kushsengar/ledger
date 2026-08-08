import { axiosClient } from './axiosClient';
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
    const { data } = await axiosClient.get(`/audit?entityType=LOAN&entityId=${id}`);
    return data;
  },
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await axiosClient.get('/dashboard/stats');
    return data;
  }
};
