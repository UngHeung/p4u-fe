import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { SetStateAction, useEffect, useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
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

  useEffect(() => {
    const exist = pickers.find(picker => picker.id === user.id);
    if (exist) {
      setIsPicker(true);
    }
  }, []);

  const handleAnswered = async () => {
    setDisabled(true);

    const data = {
      isAnswered: !answered,
    };

    try {
      const url = `/card/${id}/answered`;
      const response = await authAxios.patch(url, data);
      const isAnswered = response.data.isAnswered;

      pushAlertQueue(
        `기도제목이 ${isAnswered ? '-응답받았음-' : '-아직 응답받지 못했음-'}\n으로 표시되었습니다.`,
        'success',
      );

      setAnswered(isAnswered);
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    } finally {
      setDisabled(false);
    }
  };

  const handlePicked = async () => {
    setDisabled(true);

    try {
      const url = `/card/${id}/pick`;
      const response = await authAxios.patch(url);
      const pickers: Pick<UserProps, 'id'>[] = response.data.pickers;
      const isToggled = pickers.find(picker => picker.id === user.id)
        ? true
        : false;

      pushAlertQueue(
        `기도대상${isToggled ? '으로 선택' : '에서 제외'}되었습니다.`,
        'success',
      );

      setIsPicker(isToggled);
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        pushAlertQueue('로그인이 필요합니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    } finally {
      setDisabled(false);
    }
    console.log('pick~!');
  };

  return (
    <header className={style.cardHeader}>
      <span className={style.cardInfo}>
        {svgIcons.heart()}
        <strong>{`${pickers ? pickers.length : 0}명`}</strong>
        <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
      </span>

      <span>
        {user.id === writer.id ? (
          <button
            type={'button'}
            name={'isAnswered'}
            onClick={event => {
              event.stopPropagation();
              handleAnswered();
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
              handlePicked();
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
