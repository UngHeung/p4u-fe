import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import {
  ThanksListStore,
  useThanksListStore,
} from '@/stores/thanks/thanksListTypeStore';
import { useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { ERROR_MESSAGE_ENUM } from '../alert/constants/message.enum';
import { svgIcons } from '../common/functions/getSvg';
import styles from './styles/thanks.module.css';
import { ThanksBoxProps } from './ThanksBox';

const ThanksBoxMenu = ({
  id,
  isActive,
  writer,
  setIsEdit,
}: ThanksBoxProps & { setIsEdit: Dispatch<SetStateAction<boolean>> }) => {
  const user = useUserStore(state => state.user);
  const thanksListType = useThanksListStore(
    (state: ThanksListStore) => state.thanksListType,
  );
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const handleReportQuery = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      setDisabled(true);
      await authAxios.patch(`/thanks/${id}/report`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
      pushAlertQueue('신고가 완료되었습니다.', 'success');
    },
    onError: (error: any) => {
      if (error.status === 400) {
        pushAlertQueue('이미 신고한 감사메시지입니다.', 'failure');
      } else if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleResetReportMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      setDisabled(true);
      await authAxios.patch(`/thanks/${id}/report/reset`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
      pushAlertQueue('신고가 초기화되었습니다.', 'success');
    },
    onError: (error: any) => {
      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleActivateMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      setDisabled(true);
      await authAxios.patch(`/thanks/${id}/active?isActive=${!isActive}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
      pushAlertQueue(
        `감사메시지가 ${isActive ? '비활성화' : '활성화'}되었습니다.`,
        'success',
      );
    },
    onError: (error: any) => {
      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleDeleteMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      setDisabled(true);
      await authAxios.delete(`/thanks/${id}`);
    },
    onSuccess: () => {
      pushAlertQueue('감사메시지가 삭제되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
    },
    onError: (error: any) => {
      if (error.status === 404) {
        pushAlertQueue('존재하지 않는 감사메시지입니다.', 'failure');
      } else if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  return (
    <article>
      <button
        onClick={event => {
          event.stopPropagation();
          setIsMenuOpen(prev => !prev);
        }}
        className={styles.thanksBoxMenuButton}
      >
        {svgIcons.menu(user && user.id === writer?.id ? '#ffffff' : '#222222')}
      </button>
      {isMenuOpen && (
        <menu className={styles.thanksMenu}>
          <ul className={styles.thanksMenu}>
            {user.role !== 'ROLE_ADMIN' ? (
              user.id !== writer.id ? (
                <li>
                  <button
                    className={styles.thanksMenuReport}
                    onClick={event => {
                      event.stopPropagation();
                      setDisabled(true);
                      handleReportQuery.mutate({ id });
                      setIsMenuOpen(false);
                      setDisabled(false);
                    }}
                    disabled={disabled}
                  >
                    {'신고'}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      onClick={event => {
                        event.stopPropagation();
                        setIsEdit(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {'수정'}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={event => {
                        event.stopPropagation();
                        setDisabled(true);
                        handleDeleteMutation.mutate({ id });
                        setIsMenuOpen(false);
                        setDisabled(false);
                      }}
                      disabled={disabled}
                    >
                      {'삭제'}
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      handleResetReportMutation.mutate({ id });
                      setIsMenuOpen(false);
                    }}
                    disabled={disabled}
                  >
                    {'신고 초기화'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      handleActivateMutation.mutate({ id, isActive });
                      setIsMenuOpen(false);
                    }}
                    disabled={disabled}
                  >
                    {isActive ? '비활성화' : '활성화'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      handleDeleteMutation.mutate({ id });
                      setIsMenuOpen(false);
                    }}
                  >
                    {'삭제'}
                  </button>
                </li>
              </>
            )}
          </ul>
        </menu>
      )}
    </article>
  );
};

export default ThanksBoxMenu;
