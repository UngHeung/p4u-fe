import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { CardProps } from '../Card';

const useActivateCardMutation = ({
  card,
  setIsActive,
  setDisabled,
}: {
  card: CardProps;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pushAlert } = useAlert();
  const queryClient = useQueryClient();
  const cardListType = useCardTypeStore(state => state.cardListType);

  return useMutation({
    mutationFn: async () => {
      const url = `/card/${card.id}/activate`;
      setIsActive(prev => !prev);

      return await authAxios.patch(url);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_ACTIVATE',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      setIsActive(prev => !prev);
      pushAlert({
        target: 'CARD_ACTIVATE',
        type: 'FAILURE',
        status: error.status,
        reason:
          error.status === 403 || error.status === 401
            ? 'UNAUTHORIZED'
            : 'INTERNAL_SERVER_ERROR',
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });
};

export default useActivateCardMutation;
