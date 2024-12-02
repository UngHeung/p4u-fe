import { authAxios } from '@/apis/axiosInstance';
import {
  ThanksListStore,
  useThanksListStore,
} from '@/stores/thanks/thanksListTypeStore';
import { useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import useAlert from '../common/alert/useAlert';
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

  const { pushAlert } = useAlert();

  const thanksListType = useThanksListStore(
    (state: ThanksListStore) => state.thanksListType,
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
      pushAlert({
        target: 'THANKS_REPORT',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'THANKS_REPORT',
        type: 'FAILURE',
        status: error.status,
        reason:
          error.status === 400
            ? 'BAD_REQUEST'
            : error.status === 401
              ? 'UNAUTHORIZED'
              : 'INTERNAL_SERVER_ERROR',
      });
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
      pushAlert({
        target: 'THANKS_REPORT_RESET',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'THANKS_REPORT_RESET',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
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
      pushAlert({
        target: 'THANKS_ACTIVATE',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'THANKS_ACTIVATE',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
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
      pushAlert({
        target: 'THANKS_DELETE',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['thanks', thanksListType] });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'THANKS_DELETE',
        type: 'FAILURE',
        status: error.status,
        reason:
          error.status === 404
            ? 'NOT_FOUND'
            : error.status === 401
              ? 'UNAUTHORIZED'
              : 'INTERNAL_SERVER_ERROR',
      });
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
            {user.userRole !== 'ROLE_ADMIN' ? (
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
