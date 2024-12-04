import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { CardProps } from '../Card';

const useDeleteCardMutation = ({
  card,
  setDisabled,
}: {
  card: CardProps;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pushAlert } = useAlert();
  const queryClient = useQueryClient();
  const cardListType = useCardTypeStore(state => state.cardListType);

  return useMutation({
    mutationFn: async () => {
      return await authAxios.delete(`/card/${card.id}/delete`);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_DELETE',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'CARD_DELETE',
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

export default useDeleteCardMutation;
