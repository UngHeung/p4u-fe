// 토큰에서 유저 정보 추출
export const getUserByPayload = (accessToken: string) => {
  const payload = accessToken.split('.')[1];
  const buffer = Buffer.from(payload, 'base64');
  const dataString = buffer.toString().replaceAll(/['"]/g, '');
  const dataParts = dataString.split(',');

  const user = {
    id: +dataParts[0].split(':')[1],
    name: dataParts[1].split(':')[1],
    account: dataParts[2].split(':')[1],
    role: dataParts[3].split(':')[1],
  };

  return user;
};

// 로그인을 위한 basic token 생성
export const generateBasicToken = (account: string, password: string) => {
  const prefix = 'Basic';
  const base64String = Buffer.from(`${account}:${password}`).toString('base64');
  const basicToken = `${prefix} ${base64String}`;

  return basicToken;
};
