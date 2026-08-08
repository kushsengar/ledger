import { axiosClient } from './axiosClient';
import { AuditLog } from '../types';

export const auditApi = {
  getAllAuditLogs: async (): Promise<AuditLog[]> => {
    const { data } = await axiosClient.get('/audit/all');
    return data;
  }
};
