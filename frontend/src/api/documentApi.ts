import { axiosClient } from './axiosClient';
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
