import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

const useWriteCardMutation = ({
  setDisabled,
}: {
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { pushAlert } = useAlert();

  const cardListType = useCardTypeStore(state => state.cardListType);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      keywords: string[];
      isAnonymity: boolean;
    }) => {
      setDisabled(true);

      return authAxios.post(`/card/new`, data);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_WRITE',
        type: 'SUCCESS',
        status: 200,
      });

      queryClient.invalidateQueries({
        queryKey: ['cards', cardListType],
      });

      router.push('/card/list');
    },
    onError: (error: any) => {
      pushAlert({
        target: 'CARD_WRITE',
        type: 'FAILURE',
        status: error.status,
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });
};

export default useWriteCardMutation;
