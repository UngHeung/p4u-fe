import { authAxios } from '@/apis/axiosInstance';
import { useAlertStore } from '@/stores/alert/alertStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserProps, useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import style from './styles/card.module.css';

const CardMenu = ({
  cardId,
  writer,
  setIsMenuOpen,
}: {
  cardId: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const user = useUserStore(state => state.user);
  const pushAlertQueue = useAlertStore(state => state.pushAlertQueue);

  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const handleReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${cardId}/report`);
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
      return await authAxios.patch(`/card/${cardId}/reporter/reset`);
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
      const url = `/card/${cardId}/activate`;
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
      return await authAxios.delete(`/card/${cardId}/delete`);
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
        user.id !== writer.id ? (
          <li>
            <button
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleReportMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
            >
              {'신고'}
            </button>
          </li>
        ) : (
          <li>
            <button
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
        )
      ) : (
        <>
          <li>
            <button
              onClick={event => {
                event.stopPropagation();
                setDisabled(true);
                handleResetReportMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
            >
              {'신고 초기화'}
            </button>
          </li>
          <li>
            <button
              onClick={event => {
                setDisabled(true);
                event.stopPropagation();
                handleActivateMutation.mutate();
                setIsMenuOpen(false);
                setDisabled(false);
              }}
            >
              {'비활성화'}
            </button>
          </li>
          <li>
            <button
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
