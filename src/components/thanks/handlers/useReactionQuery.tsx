import { authAxios } from '@/apis/axiosInstance';
import { ERROR_MESSAGE_ENUM } from '@/components/alert/constants/message.enum';
import { ThanksListType } from '@/stores/thanks/thanksListTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { ReactionType } from '../Reaction';
import { ThanksBoxProps } from '../ThanksBox';

interface CurrentDataProps {
  pageParams: number | undefined;
  pages: [
    {
      list: ThanksBoxProps[];
      cursor: number;
    },
  ];
}

const reactionMutationState: {
  isOnReaction: boolean;
  previousData: CurrentDataProps | undefined;
} = {
  isOnReaction: true,
  previousData: undefined,
};

const useReactionMutation = (
  queryType: 'new' | 'update',
  pushAlertQueue: (message: string, type: 'success' | 'failure') => void,
  thanksListType: ThanksListType,
  thanksId: number,
  reactionId: number,
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
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
    onMutate: async ({ type }: { type: ReactionType }) => {
      setIsDisabled(true);
      reactionMutationState.isOnReaction = true;

      reactionMutationState.previousData = queryClient.getQueryData([
        'thanks',
        thanksListType,
      ]);

      await queryClient.cancelQueries({ queryKey: ['thanks', thanksListType] });

      console.log('previousData : ', reactionMutationState.previousData);

      queryClient.setQueryData(
        ['thanks', thanksListType],
        (currentData: CurrentDataProps) => {
          if (!currentData) return currentData;

          const newPages = currentData.pages.map(page => ({
            ...page,
            list: page.list.map((item: ThanksBoxProps) => {
              if (queryType === 'new' && item.id === thanksId) {
                const newItem = {
                  ...item,
                  reactions: [{ type, id: reactionId }],
                  reactionsCount: {
                    ...item.reactionsCount,
                    [type]: item.reactionsCount[type] + 1,
                  },
                };

                return newItem;
              } else if (queryType === 'update' && item.id === thanksId) {
                const currReactionType: ReactionType = item.reactions[0].type;

                if (currReactionType === type) {
                  reactionMutationState.isOnReaction = false;
                  return {
                    ...item,
                    reactions: [],
                    reactionsCount: {
                      ...item.reactionsCount,
                      [type]: item.reactionsCount[type] - 1,
                    },
                  };
                } else {
                  return {
                    ...item,
                    reactions: [{ type, id: reactionId }],
                    reactionsCount: {
                      ...item.reactionsCount,
                      [currReactionType]:
                        item.reactionsCount[currReactionType] - 1,
                      [type]: item.reactionsCount[type] + 1,
                    },
                  };
                }
              }
              return item;
            }),
          }));

          return {
            ...currentData,
            pages: newPages,
          };
        },
      );

      return reactionMutationState.previousData;
    },
    onError: async (error: any) => {
      console.log('previousData : ', reactionMutationState.previousData);

      if (reactionMutationState.previousData) {
        await queryClient.setQueryData(
          ['thanks', thanksListType],
          reactionMutationState.previousData,
        );
      }

      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSuccess: () => {
      pushAlertQueue(
        `이모지로 공감을 ${reactionMutationState.isOnReaction ? '표시' : '취소'}했습니다.`,
        'success',
      );

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
      }, 100);
    },
    onSettled: () => {
      setIsDisabled(false);
    },
  });
};

export default useReactionMutation;
