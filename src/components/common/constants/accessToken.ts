export const token = {
  access: '',
};

export const setToken = ({
  isAccess,
  accessToken,
  refreshToken,
}: {
  isAccess?: boolean;
  accessToken?: string;
  refreshToken?: string;
}) => {
  if (isAccess === undefined || isAccess) {
    token.access = accessToken!;
  }

  if (isAccess === undefined || !isAccess) {
    localStorage.setItem('refreshToken', refreshToken!);
  }
};

export const getToken = (isAccess: boolean) => {
  if (isAccess) {
    return token.access;
  }

  return localStorage.getItem('refreshToken');
};
