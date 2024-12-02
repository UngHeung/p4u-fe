import { authAxios } from '@/apis/axiosInstance';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction } from 'react';
import useAlert from '../common/alert/useAlert';
import { svgIcons } from '../common/functions/getSvg';
import { CardProps } from './Card';
import style from './styles/card.module.css';

const CardHeader = ({
  card,
  answered,
  setAnswered,
  isPicker,
  setIsPicker,
  pickersState,
  setPickersState,
  disabled,
  setDisabled,
}: {
  card: CardProps;
  answered: boolean;
  setAnswered: React.Dispatch<SetStateAction<boolean>>;
  isPicker: boolean;
  setIsPicker: React.Dispatch<SetStateAction<boolean>>;
  pickersState: Pick<UserProps, 'id'>[];
  setPickersState: React.Dispatch<SetStateAction<Pick<UserProps, 'id'>[]>>;
  disabled: boolean;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore((state: UserStore) => state.user);
  const { pushAlert } = useAlert();

  const handleAnsweredOnMutation = useMutation({
    mutationFn: () => {
      setDisabled(true);
      setAnswered(prev => !prev);
      return authAxios.patch(`/card/${card.id}/answered`, {
        isAnswered: !answered,
      });
    },
    onSuccess: () => {
      pushAlert({
        target: answered ? 'CARD_ANSWERED' : 'CARD_ANSWERED_CANCEL',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      setAnswered(prev => !prev);

      pushAlert({
        target: 'CARD_ANSWERED',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handlePickedOnMutation = useMutation({
    mutationFn: () => {
      setDisabled(true);
      const existPicker = pickersState.some(picker => picker.id === user.id);
      if (existPicker) {
        setIsPicker(false);
        setPickersState(prev => prev.filter(picker => picker.id !== user.id));
      } else {
        setIsPicker(true);
        setPickersState(prev => [...prev, { id: user.id }]);
      }
      return authAxios.patch(`/card/${card.id}/pick`);
    },
    onSuccess: () => {
      pushAlert({
        target: isPicker ? 'CARD_PICK' : 'CARD_UNPICK',
        type: 'SUCCESS',
        status: 200,
      });
    },
    onError: (error: any) => {
      const existPicker = pickersState.some(picker => picker.id === user.id);
      if (existPicker) {
        setIsPicker(false);
        setPickersState(prev => prev.filter(picker => picker.id !== user.id));
      } else {
        setIsPicker(true);
        setPickersState(prev => [...prev, { id: user.id }]);
      }

      pushAlert({
        target: isPicker ? 'CARD_PICK' : 'CARD_UNPICK',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  return (
    <header className={style.cardHeader}>
      <span className={style.cardInfo}>
        {svgIcons.heart()}
        <strong>{`${pickersState.length}명`}</strong>
        <span>{`이 이 기도제목을 위해 기도${card.isAnswered ? '했습니다.' : '하고있습니다.'}`}</span>
      </span>

      <span>
        {user.id === card.writer.id ? (
          <button
            type={'button'}
            name={'isAnswered'}
            onClick={event => {
              event.stopPropagation();
              handleAnsweredOnMutation.mutate();
            }}
            disabled={disabled}
          >
            {svgIcons.answered()}
          </button>
        ) : card.isAnswered ? (
          svgIcons.answered()
        ) : (
          <button
            type={'button'}
            name={'pick'}
            onClick={event => {
              event.stopPropagation();
              handlePickedOnMutation.mutate();
            }}
          >
            {svgIcons.checked(isPicker)}
          </button>
        )}
      </span>
    </header>
  );
};

export default CardHeader;
