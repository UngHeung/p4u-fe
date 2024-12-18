import { refreshAxios } from '@/apis/axiosInstance';
import { setToken } from '../constants/accessToken';

const reissueToken = async (isAccess: boolean) => {
  try {
    if (isAccess) {
      const accessToken = await reissueAccessToken();
      setToken({ isAccess, accessToken });
      return accessToken;
    } else {
      const refreshToken = await reissueRefreshToken();
      setToken({ isAccess, refreshToken });
      return refreshToken;
    }
  } catch (error: any) {
    return error;
  }
};

export default reissueToken;

const accessReissueUrl = `/auth/reissue/access`;
const refreshReissueUrl = `/auth/reissue/refresh`;

/**
 * Reissue access token
 */
export const reissueAccessToken = async () => {
  const response = await refreshAxios.post(accessReissueUrl);
  const accessToken = response.data.accessToken;
  return accessToken;
};

/**
 * Reissue refresh token
 */
export const reissueRefreshToken = async () => {
  const response = await refreshAxios.post(refreshReissueUrl);
  const refreshToken = response.data.refreshToken;
  return refreshToken;
};
