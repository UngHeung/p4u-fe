import { getToken, setToken } from '@/components/common/constants/accessToken';
import reissueToken from '@/components/common/functions/reissueToken';
import { useUserStore } from '@/stores/user/userStore';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const createAxiosInstance = (config: AxiosRequestConfig = {}) => {
  return axios.create({
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

authAxios.interceptors.request.use(
  config => setAuthAxios(config, true),
  error => Promise.reject(error),
);

authAxios.interceptors.response.use(
  response => callbackResponse(response),
  error => callbackResponseError(error, true),
);

refreshAxios.interceptors.request.use(
  config => setAuthAxios(config, false),
  error => Promise.reject(error),
);

export const setAuthAxios = async (
  config: InternalAxiosRequestConfig,
  isAccess: boolean,
) => {
  const token = getToken(isAccess);

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

export const callbackResponse = (response: AxiosResponse) => {
  if (response.status === 404) {
    console.log('404 page');
  }

  return response;
};

export const callbackResponseError = async (error: any, isAccess: boolean) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newToken = await reissueToken(isAccess);

      console.log('newToken', newToken);

      if (newToken.status === 401) {
        handleLogout();
        return Promise.reject(newToken);
      }

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      return authAxios.request(originalRequest);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

export const handleLogout = () => {
  console.log('로그아웃');
  setToken({ accessToken: '', refreshToken: '' });
  localStorage.clear();

  window.location.href = '/';
};
