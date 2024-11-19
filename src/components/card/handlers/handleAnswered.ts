import { authAxios } from '@/apis/axiosInstance';
import { AlertTypes } from '@/stores/alert/alertStore';
import { SetStateAction } from 'react';

export const handleAnswered = async ({
  cardId,
  answered,
  setAnswered,
  setDisabled,
  pushAlertQueue,
}: {
  cardId: number;
  answered: boolean;
  setAnswered: React.Dispatch<SetStateAction<boolean>>;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
  pushAlertQueue: (message: string, type: AlertTypes) => void;
}) => {
  setDisabled(true);

  const data = {
    isAnswered: !answered,
  };

  try {
    const url = `/card/${cardId}/answered`;
    const response = await authAxios.patch(url, data);
    const isAnswered = response.data.isAnswered;

    pushAlertQueue(
      `기도제목이 ${isAnswered ? '-응답받았음-' : '-아직 응답받지 못했음-'}\n으로 표시되었습니다.`,
      'success',
    );

    setAnswered(isAnswered);
  } catch (error: any) {
    console.error(error);
    if (error.status === 401) {
      pushAlertQueue('권한이 없습니다.', 'failure');
    } else {
      pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
    }
  } finally {
    setDisabled(false);
  }
};
