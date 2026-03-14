import axios from 'axios';
import { authService } from '@/auth/FirebaseAuthService';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080',
});

apiClient.interceptors.request.use(async (config) => {
  const token = await authService.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const tokenPreview = token ? `...${token.substring(token.length - 12)}` : 'MISSING';
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  console.log(`[API Auth] Using token: ${tokenPreview}`);
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.response?.status || 'Network Error'} ${error.config?.url}`);
    if (error.response?.data) {
      console.error(`[API Error Data]`, JSON.stringify(error.response.data));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
