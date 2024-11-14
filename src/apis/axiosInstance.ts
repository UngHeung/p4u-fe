import { getToken } from "@/components/common/constants/accessToken";
import reissueToken from "@/components/common/functions/reissueToken";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const baseAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use(
  (config) => callbackRequestConfig(config, true),
  (error) => callbackRequestError(error)
);

authAxios.interceptors.response.use(
  (response) => callbackResponse(response),
  (error) => callbackResponseError(error, true)
);

export const refreshAxios = axios.create({});

refreshAxios.interceptors.request.use(
  (config) => callbackRequestConfig(config, false),
  (error) => callbackRequestError(error)
);

export const callbackRequestConfig = (config: InternalAxiosRequestConfig, isAccess: boolean) => {
  if (isAccess) {
    const accessToken = getToken(true);
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    const refreshToken = getToken(false);
    config.headers["Authorization"] = `Bearer ${refreshToken}`;
  }

  return config;
};

export const callbackRequestError = (error: any) => {
  return Promise.reject(error);
};

export const callbackResponse = (response: AxiosResponse) => {
  if (response.status === 404) {
    console.log("404 page");
  }

  return response;
};

export const callbackResponseError = async (error: any, isAccess: boolean) => {
  if (error.response?.status === 401) {
    try {
      const refreshTokenResponse = await reissueToken(isAccess);

      if (!refreshTokenResponse) {
        return refreshTokenResponse;
      }

      console.log(refreshTokenResponse);

      error.config.header = {
        Authorization: `Bearer ${isAccess ? getToken(true) : getToken(false)}`,
      };

      const response = await baseAxios.request(error.config);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};
