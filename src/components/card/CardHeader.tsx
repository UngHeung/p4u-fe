import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { SetStateAction } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import { CardProps } from './Card';
import useAnsweredMutation from './hooks/useAnsweredMutation';
import usePickedMutation from './hooks/usePickedMutation';
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

  const handleAnsweredOnMutation = useAnsweredMutation({
    card,
    answered,
    setAnswered,
    setDisabled,
  });

  const handlePickedOnMutation = usePickedMutation({
    card,
    isPicker,
    setIsPicker,
    pickersState,
    setPickersState,
    setDisabled,
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
