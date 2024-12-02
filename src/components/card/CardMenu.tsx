import { authAxios } from '@/apis/axiosInstance';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useUserStore } from '@/stores/user/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import useAlert from '../common/alert/useAlert';
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

  const { pushAlert } = useAlert();

  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const handleReportMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.patch(`/card/${card.id}/report`);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_REPORT',
        type: 'SUCCESS',
        status: 200,
      });
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

  const handleResetReportMutation = useMutation({
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

  const handleActivateMutation = useMutation({
    mutationFn: async () => {
      const url = `/card/${card.id}/activate`;
      setIsActive(prev => !prev);

      return await authAxios.patch(url);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_ACTIVATE',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      setIsActive(prev => !prev);
      pushAlert({
        target: 'CARD_ACTIVATE',
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

  const handleDeleteMutation = useMutation({
    mutationFn: async () => {
      return await authAxios.delete(`/card/${card.id}/delete`);
    },
    onSuccess: () => {
      pushAlert({
        target: 'CARD_DELETE',
        type: 'SUCCESS',
        status: 200,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', cardListType] });
    },
    onError: (error: any) => {
      pushAlert({
        target: 'CARD_DELETE',
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

  return (
    <ul className={style.cardMenu}>
      {user.userRole !== 'ROLE_ADMIN' ? (
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
                event.stopPropagation();
                setDisabled(true);
                handleActivateMutation.mutate();
                setIsMenuOpen(false);
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
