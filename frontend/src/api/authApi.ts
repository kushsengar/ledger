import { axiosClient } from './axiosClient';
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
