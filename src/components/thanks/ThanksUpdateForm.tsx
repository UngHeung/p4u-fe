import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { useThanksListStore } from '@/stores/thanks/thanksListTypeStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { ERROR_MESSAGE_ENUM } from '../alert/constants/message.enum';
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import { ThanksBoxProps } from './ThanksBox';
import styles from './styles/thanks.module.css';
const ThanksUpdateForm = ({
  id,
  currentContent,
  setIsEdit,
}: {
  id: number;
  currentContent: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const thanksListType = useThanksListStore(state => state.thanksListType);
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [content, setContent] = useState(currentContent);
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();

  const thanksUpdateMutation = useMutation({
    mutationKey: ['thanks', thanksListType],
    mutationFn: async (data: { content: string }) => {
      await authAxios.put(`/thanks/${id}`, data);
    },
    onMutate: async () => {
      setIsDisabled(true);

      await queryClient.cancelQueries({ queryKey: ['thanks', thanksListType] });

      const previousThanks = queryClient.getQueryData<ThanksBoxProps[]>([
        'thanks',
        thanksListType,
      ]);

      queryClient.setQueryData(
        ['thanks', thanksListType],
        (old: {
          pages: { list: ThanksBoxProps[]; cursor: number }[];
          pageParams: number[];
        }) => ({
          ...old,
          pages: [
            {
              list: [...old?.pages[0]?.list],
              cursor: old?.pages[0]?.cursor,
            },
            ...(old?.pages.slice(1) || []),
          ],
          pageParams: old?.pageParams || [],
        }),
      );

      return { previousThanks };
    },
    onError: async (error: any, context: any) => {
      queryClient.setQueryData(
        ['thanks', thanksListType],
        context?.previousThanks,
      );

      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSuccess: () => {
      pushAlertQueue('감사메시지를 수정했습니다.', 'success');

      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
    },
    onSettled: () => {
      setIsEdit(false);
      setIsDisabled(false);
    },
  });

  const handleThanksUpdate = () => {
    if (!content) {
      pushAlertQueue('감사메시지를 입력해주세요.', 'failure');
      return;
    }

    if (content.length > 100) {
      pushAlertQueue('감사메시지는 최대 100자입니다.', 'failure');
      return;
    }

    thanksUpdateMutation.mutate({ content });
  };

  return (
    <div className={styles.thanksUpdateCover} onClick={() => setIsEdit(false)}>
      <section
        className={styles.thanksUpdateWrap}
        onClick={event => event.stopPropagation()}
      >
        <textarea
          className={styles.thanksUpdate}
          value={content}
          onChange={event => setContent(event.target.value)}
          aria-label="감사메시지 수정"
        />
        <section className={styles.thanksUpdateButtonWrap}>
          <MainButton
            id={'submitButton'}
            className={`${styles.thanksUpdateButton} ${styles.submit}`}
            value={{
              text: '수정하기',
              icon: svgIcons.enter('medium'),
            }}
            onClick={handleThanksUpdate}
            disabled={isDisabled}
          />
          <MainButton
            id={'cancelButton'}
            type="button"
            onClick={() => setIsEdit(false)}
            className={styles.thanksUpdateButton}
            value={{
              text: '취소',
            }}
            disabled={isDisabled}
          />
        </section>
      </section>
    </div>
  );
};

export default ThanksUpdateForm;
