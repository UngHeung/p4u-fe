import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { useThanksListStore } from '@/stores/thanks/thanksListTypeStore';
import { useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { ERROR_MESSAGE_ENUM } from '../alert/constants/message.enum';
import { svgIcons } from '../common/functions/getSvg';
import styles from './styles/thanks.module.css';
import { ThanksBoxProps } from './ThanksBox';

const ThanksWriteForm = () => {
  const user = useUserStore(state => state.user);
  const thanksListType = useThanksListStore(state => state.thanksListType);
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  const handlePlaceholderClick = () => {
    textareaRef.current?.focus();
  };

  const thanksWriteMutation = useMutation({
    mutationKey: ['thanks', thanksListType],
    mutationFn: async (data: { content: string }) => {
      await authAxios.post('/thanks/new', data);
    },
    onMutate: async newThanks => {
      setDisabled(true);

      await queryClient.cancelQueries({ queryKey: ['thanks', thanksListType] });

      const previousThanks = queryClient.getQueryData<ThanksBoxProps[]>([
        'thanks',
        thanksListType,
      ]);

      queryClient.setQueryData(['thanks', thanksListType], (old: any) => ({
        ...old,
        pages: [
          {
            list: [
              {
                id: (old && old.pages[0] && old.pages[0].list[0]?.id + 1) ?? 0,
                content: newThanks.content,
                writer: user,
                createdAt: new Date().toISOString(),
                reactions: [],
                reports: [],
                reactionsCount: {
                  smile: 0,
                  heart: 0,
                  thumbsup: 0,
                  clap: 0,
                  party: 0,
                },
              },
              ...(old?.pages[0]?.list || []),
            ],
            cursor: old?.pages[0]?.cursor,
          },
          ...(old?.pages.slice(1) || []),
        ],
        pageParams: old?.pageParams || [],
      }));

      return { previousThanks };
    },
    onError: (error: any, context: any) => {
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
      pushAlertQueue('오늘의 감사메시지를 등록했습니다.', 'success');
      setContent('');

      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleThanksWrite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content) {
      pushAlertQueue('감사메시지를 입력해주세요.', 'failure');
      return;
    }

    if (content.length > 100) {
      pushAlertQueue('감사메시지는 최대 100자입니다.', 'failure');
      return;
    }

    thanksWriteMutation.mutate({ content });
  };

  return (
    <form className={styles.thanksWriteForm} onSubmit={handleThanksWrite}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={event => setContent(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={event => {
          if (!event.target.value) {
            setIsFocused(false);
          }
        }}
      />
      {!isFocused && (
        <span className={styles.placeholder} onClick={handlePlaceholderClick}>
          {'오늘도 하루를 허락해주셔서 감사해요.'}
        </span>
      )}
      <button disabled={disabled}>
        {svgIcons.enter(
          'large',
          isFocused ? '#222222' : 'var(--color-placeholder)',
        )}
      </button>
    </form>
  );
};

export default ThanksWriteForm;
