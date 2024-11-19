import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { SetStateAction, useEffect, useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import { handleAnswered } from './handlers/handleAnswered';
import { handlePicked } from './handlers/handlePicked';
import style from './styles/card.module.css';

const CardHeader = ({
  id,
  writer,
  pickers,
  answered,
  setAnswered,
  disabled,
  setDisabled,
}: {
  id: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  pickers: Pick<UserProps, 'id'>[];
  answered: boolean;
  setAnswered: React.Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore((state: UserStore) => state.user);
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [isPicker, setIsPicker] = useState(false);
  const [pickCount, setPickCount] = useState(pickers ? pickers.length : 0);

  useEffect(() => {
    const exist = pickers.find(picker => picker.id === user.id);
    if (exist) {
      setIsPicker(true);
    }
  }, []);

  return (
    <header className={style.cardHeader}>
      <span className={style.cardInfo}>
        {svgIcons.heart()}
        <strong>{`${pickCount}명`}</strong>
        <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
      </span>

      <span>
        {user.id === writer.id ? (
          <button
            type={'button'}
            name={'isAnswered'}
            onClick={event => {
              event.stopPropagation();
              handleAnswered({
                cardId: id,
                answered,
                setAnswered,
                setDisabled,
                pushAlertQueue,
              });
            }}
            disabled={disabled}
          >
            {svgIcons.answered()}
          </button>
        ) : answered ? (
          svgIcons.answered()
        ) : (
          <button
            type={'button'}
            name={'pick'}
            onClick={event => {
              event.stopPropagation();
              handlePicked({
                user,
                cardId: id,
                setDisabled,
                setIsPicker,
                setPickCount,
                pushAlertQueue,
              });
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
