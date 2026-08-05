import axios from 'axios';

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
