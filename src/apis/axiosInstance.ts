import { getToken } from '@/components/common/constants/accessToken';
import reissueToken from '@/components/common/functions/reissueToken';
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

  if (!token) {
    //
  }

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

    console.log('originalRequest', originalRequest._retry);

    try {
      const newToken = await reissueToken(isAccess);

      if (!newToken) {
        return Promise.reject(newToken);
      }

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      return authAxios.request(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};
