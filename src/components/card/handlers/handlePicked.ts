import { authAxios } from '@/apis/axiosInstance';
import { AlertTypes } from '@/stores/alert/alertStore';
import { UserProps } from '@/stores/user/userStore';
import { SetStateAction } from 'react';

export const handlePicked = async ({
  user,
  cardId,
  setDisabled,
  setIsPicker,
  setPickCount,
  pushAlertQueue,
}: {
  user: UserProps;
  cardId: number;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
  setIsPicker: React.Dispatch<SetStateAction<boolean>>;
  setPickCount: React.Dispatch<SetStateAction<number>>;
  pushAlertQueue: (message: string, type: AlertTypes) => void;
}) => {
  setDisabled(true);

  try {
    const url = `/card/${cardId}/pick`;
    const response = await authAxios.patch(url);
    const pickers: Pick<UserProps, 'id'>[] = response.data.pickers;
    const isToggled = pickers.find(picker => picker.id === user.id)
      ? true
      : false;

    setPickCount(prev => (isToggled ? ++prev : --prev));

    pushAlertQueue(
      `기도대상${isToggled ? '으로 선택' : '에서 제외'}되었습니다.`,
      'success',
    );

    setIsPicker(isToggled);
  } catch (error: any) {
    console.error(error);
    if (error.status === 401) {
      pushAlertQueue('로그인이 필요합니다.', 'failure');
    } else {
      pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
    }
  } finally {
    setDisabled(false);
  }
};
