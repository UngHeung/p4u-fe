import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { useMutation } from '@tanstack/react-query';
import React, { SetStateAction } from 'react';
import { CardProps } from '../Card';

const usePickedMutation = ({
  card,
  isPicker,
  setIsPicker,
  pickersState,
  setPickersState,
  setDisabled,
}: {
  card: CardProps;
  isPicker: boolean;
  setIsPicker: React.Dispatch<SetStateAction<boolean>>;
  pickersState: Pick<UserProps, 'id'>[];
  setPickersState: React.Dispatch<SetStateAction<Pick<UserProps, 'id'>[]>>;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore((state: UserStore) => state.user);
  const { pushAlert } = useAlert();

  return useMutation({
    mutationFn: () => {
      setDisabled(true);

      const existPicker = pickersState.some(picker => picker.id === user.id);

      if (existPicker) {
        setIsPicker(false);
        setPickersState(prev => prev.filter(picker => picker.id !== user.id));
      } else {
        setIsPicker(true);
        setPickersState(prev => [...prev, { id: user.id }]);
      }

      return authAxios.patch(`/card/${card.id}/pick`);
    },
    onSuccess: () => {
      pushAlert({
        target: isPicker ? 'CARD_PICK' : 'CARD_UNPICK',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      const existPicker = pickersState.some(picker => picker.id === user.id);

      if (existPicker) {
        setIsPicker(false);
        setPickersState(prev => prev.filter(picker => picker.id !== user.id));
      } else {
        setIsPicker(true);
        setPickersState(prev => [...prev, { id: user.id }]);
      }

      pushAlert({
        target: isPicker ? 'CARD_PICK' : 'CARD_UNPICK',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });
};

export default usePickedMutation;
