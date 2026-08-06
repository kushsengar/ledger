import axios from 'axios';

const backendUrl = (window as any).__ENV__?.BACKEND_URL || '/api/v1';
const baseURL = backendUrl.endsWith('/api/v1') ? backendUrl : `${backendUrl}/api/v1`;

export const axiosClient = axios.create({
  baseURL,
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
