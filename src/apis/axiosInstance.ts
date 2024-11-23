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
    withCredentials: true,
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

  if (!token) {
    console.log('token is null', { isAccess });
    return config;
  }

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
    console.log('Error response:', error.response);
    console.log('Original request:', error.config);

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
          window.location.href = '/auth/logout';
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

// baseAxios.interceptors.request.use(
//   config => callbackRequestConfig(config, false),
//   error => callbackRequestError(error),
// );

// authAxios.interceptors.request.use(
//   config => callbackRequestConfig(config, true),
//   error => callbackRequestError(error),
// );

// authAxios.interceptors.response.use(
//   response => callbackResponse(response),
//   error => callbackResponseError(error, true),
// );

// export const refreshAxios = axios.create({});

// refreshAxios.interceptors.request.use(
//   config => callbackRequestConfig(config, false),
//   error => callbackRequestError(error),
// );

// export const callbackRequestConfig = (
//   config: InternalAxiosRequestConfig,
//   isAccess: boolean,
// ) => {
//   if (isAccess) {
//     const accessToken = getToken(true);
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   } else {
//     const refreshToken = getToken(false);
//     config.headers['Authorization'] = `Bearer ${refreshToken}`;
//   }

//   return config;
// };

// export const callbackRequestError = (error: any) => {
//   return Promise.reject(error);
// };

// export const callbackResponse = (response: AxiosResponse) => {
//   if (response.status === 404) {
//     console.log('404 page');
//   }

//   return response;
// };

// export const callbackResponseError = async (error: any, isAccess: boolean) => {
//   const originalRequest = error.config;

//   if (error.response?.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;

//     try {
//       const refreshTokenResponse = await reissueToken(isAccess);

//       if (!refreshTokenResponse) {
//         return Promise.reject(refreshTokenResponse);
//       }

//       originalRequest.headers['Authorization'] =
//         `Bearer ${refreshTokenResponse}`;

//       return authAxios.request(originalRequest);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }
//   return Promise.reject(error);
// };
