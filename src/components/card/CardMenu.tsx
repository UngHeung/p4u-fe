import { authAxios } from '@/apis/axiosInstance';
import { useAlertStore } from '@/stores/alert/alertStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import { CardProps } from './Card';
import style from './styles/card.module.css';

const CardMenu = ({
  card,
  setIsMenuOpen,
  isActive,
  setIsActive,
}: {
  card: CardProps;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const user = useUserStore(state => state.user);
  const pushAlertQueue = useAlertStore(state => state.pushAlertQueue);

  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const handleReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${card.id}/report`);
    },
    onSuccess: () => {
      pushAlertQueue('신고가 완료되었습니다.', 'success');
    },
    onError: (error: any) => {
      console.error(error);
      if (error.status === 409) {
        pushAlertQueue('이미 신고한 기도제목입니다.', 'failure');
      } else if (error.status === 403 || error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    },
    onSettled: () => {},
  });

  const handleResetReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${card.id}/reporter/reset`);
    },
    onSuccess: () => {
      pushAlertQueue('신고 초기화가 완료되었습니다.', 'success');
    },
    onError: (error: any) => {
      console.error(error);
      if (error.status === 403 || error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    },
    onSettled: () => {},
  });

  const handleActivateMutation = useMutation({
    mutationFn: async () => {
      const url = `/card/${card.id}/activate`;
      setIsActive(prev => !prev);

      return await authAxios.patch(url);
    },
    onSuccess: (data: any) => {
      pushAlertQueue(
        `${data.data.isActive ? '활성화' : '비활성화'}가 완료되었습니다.`,
        'success',
      );
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      setIsActive(prev => !prev);
      console.error(error);
      if (error.status === 403 || error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    },
    onSettled: () => {},
  });

  const handleDeleteMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.delete(`/card/${card.id}/delete`);
    },
    onSuccess: () => {
      pushAlertQueue('삭제가 완료되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      console.error(error);
      if (error.status === 403 || error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    },
    onSettled: () => {},
  });

  return (
    <ul className={style.cardMenu}>
      {user.role !== 'ROLE_ADMIN' ? (
        user.id !== card.writer.id ? (
          <li>
            <button
              className={style.cardMenuReport}
              type={'button'}
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleReportMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
              disabled={disabled}
            >
              {'신고'}
            </button>
          </li>
        ) : (
          <li>
            <button
              type={'button'}
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleDeleteMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
              disabled={disabled}
            >
              {'삭제'}
            </button>
          </li>
        )
      ) : (
        <>
          <li>
            <button
              type={'button'}
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleResetReportMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
              disabled={disabled}
            >
              {'신고 초기화'}
            </button>
          </li>
          <li>
            <button
              type={'button'}
              onClick={event => {
                setDisabled(true);
                event.stopPropagation();
                handleActivateMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
              disabled={disabled}
            >
              {isActive ? '비활성화' : '활성화'}
            </button>
          </li>
          <li>
            <button
              type={'button'}
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleDeleteMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
            >
              {'삭제'}
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default CardMenu;
