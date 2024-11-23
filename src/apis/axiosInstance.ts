import { getToken } from '@/components/common/constants/accessToken';
import reissueToken from '@/components/common/functions/reissueToken';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const createAxiosInstance = (config: AxiosRequestConfig = {}) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
};

export const baseAxios = createAxiosInstance();
export const authAxios = createAxiosInstance();
export const refreshAxios = createAxiosInstance({
  headers: {
    'Content-Type': undefined,
  },
});

const setAuthAxios = (
  config: InternalAxiosRequestConfig,
  isAccess: boolean,
) => {
  const token = getToken(isAccess);
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

authAxios.interceptors.request.use(
  config => setAuthAxios(config, true),
  error => Promise.reject(error),
);

authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 404) {
      console.log('404 page');
    }

    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await reissueToken(true);

        if (!newToken) {
          throw new Error('토큰 재발급 실패');
        }

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return authAxios.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

refreshAxios.interceptors.request.use(
  config => setAuthAxios(config, false),
  error => Promise.reject(error),
);
