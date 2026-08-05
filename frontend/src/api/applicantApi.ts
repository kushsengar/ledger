import { axiosClient } from './axiosClient';
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
