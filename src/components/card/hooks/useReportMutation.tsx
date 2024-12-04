import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { CardProps } from '../Card';

const useReportMutation = ({
  card,
  setDisabled,
}: {
  card: CardProps;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pushAlert } = useAlert();
  const queryClient = useQueryClient();
  const cardListType = useCardTypeStore(state => state.cardListType);

  const setReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${card.id}/report`);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_REPORT',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'CARD_REPORT',
        type: 'FAILURE',
        status: error.status,
        reason:
          error.status === 409
            ? 'ALREADY_REPORTED'
            : error.status === 403 || error.status === 401
              ? 'UNAUTHORIZED'
              : 'INTERNAL_SERVER_ERROR',
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const resetReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${card.id}/reporter/reset`);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_REPORT_RESET',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'CARD_REPORT_RESET',
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

  return { setReportMutation, resetReportMutation };
};

export default useReportMutation;
