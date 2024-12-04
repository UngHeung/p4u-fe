import { useUserStore } from '@/stores/user/userStore';
import { SetStateAction, useState } from 'react';
import { CardProps } from './Card';
import useActivateCardMutation from './hooks/useActivateCardMutation';
import useDeleteCardMutation from './hooks/useDeleteCardMutation';
import useReportMutation from './hooks/useReportMutation';
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
  const user = useUserStore(state => state.user);

  const [disabled, setDisabled] = useState(false);

  const { setReportMutation, resetReportMutation } = useReportMutation({
    card,
    setDisabled,
  });

  const handleActivateMutation = useActivateCardMutation({
    card,
    setIsActive,
    setDisabled,
  });

  const handleDeleteMutation = useDeleteCardMutation({
    card,
    setDisabled,
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
                setReportMutation.mutate();
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
                resetReportMutation.mutate();
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
