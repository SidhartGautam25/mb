// utils/axiosConfig.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { logout } from '../context/user/userSlice';
import { useAppDispatch } from '../context/hooks';

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null): void => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Attempting to refresh token...');
        const response = await axios.post('/api/v1/refresh-token', {}, {
          withCredentials: true,
        });

        if (response.data.success) {
          console.log('Token refreshed successfully');
          processQueue(null);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError: any) {
        console.error('Token refresh failed:', refreshError.response?.data?.message);
        processQueue(refreshError, null);

        // Dispatch logout using redux store directly since we're outside React components
        const dispatch=useAppDispatch();
        dispatch(logout());

        // Redirect
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
