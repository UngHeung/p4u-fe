import { authAxios } from '@/apis/axiosInstance';
import { ERROR_MESSAGE_ENUM } from '@/components/alert/constants/message.enum';
import { ThanksListType } from '@/stores/thanks/thanksListTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { ReactionType } from '../Reaction';

const useReactionQuery = (
  queryType: 'new' | 'update',
  pushAlertQueue: (message: string, type: 'success' | 'failure') => void,
  thanksListType: ThanksListType,
  thanksId: number,
  reactionId: number,
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  const reactionMutation = useMutation({
    mutationKey: ['thanks', thanksListType],
    mutationFn: async ({ type }: { type: ReactionType }) => {
      if (queryType === 'new') {
        const url = `/thanks/reactions/${thanksId}`;
        await authAxios.post(url, { type });
      } else {
        const url = `/thanks/reactions/${reactionId}`;
        await authAxios.put(url, { type });
      }
    },
    onMutate: ({ type }) => {
      setIsDisabled(true);

      queryClient.cancelQueries({ queryKey: ['thanks', thanksListType] });

      const previousData = queryClient.getQueryData(['thanks', thanksListType]);

      queryClient.setQueryData(['thanks', thanksListType], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          reactions: [type],
        };
      });

      return { previousData };
    },
    onError: (error: any, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['thanks', thanksListType],
          context.previousData,
        );
      }

      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSuccess: () => {
      pushAlertQueue('이모지로 공감을 표시했습니다.', 'success');

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
      }, 100);
    },
    onSettled: () => {
      setIsDisabled(false);
    },
  });

  return reactionMutation;
};

export default useReactionQuery;
