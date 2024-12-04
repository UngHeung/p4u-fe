import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';
import { CardProps } from '../Card';

const useAnsweredMutation = ({
  card,
  answered,
  setAnswered,
  setDisabled,
}: {
  card: CardProps;
  answered: boolean;
  setAnswered: React.Dispatch<SetStateAction<boolean>>;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { pushAlert } = useAlert();

  return useMutation({
    mutationFn: () => {
      setDisabled(true);
      setAnswered(prev => !prev);

      return authAxios.patch(`/card/${card.id}/answered`, {
        isAnswered: !answered,
      });
    },
    onSuccess: () => {
      pushAlert({
        target: answered ? 'CARD_ANSWERED' : 'CARD_ANSWERED_CANCEL',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      setAnswered(prev => !prev);

      pushAlert({
        target: 'CARD_ANSWERED',
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

export default useAnsweredMutation;
