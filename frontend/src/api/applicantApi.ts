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
  },
  getApplicantById: async (id: number): Promise<Applicant> => {
    const { data } = await axiosClient.get(`/applicants/${id}`);
    return data;
  },
  updateApplicant: async (id: number, applicantData: any): Promise<Applicant> => {
    const { data } = await axiosClient.put(`/applicants/${id}`, applicantData);
    return data;
  }
};
