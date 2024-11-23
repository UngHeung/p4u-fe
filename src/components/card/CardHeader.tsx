import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { useMutation } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
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

  const [isPicker, setIsPicker] = useState(
    pickers.some(picker => picker.id === user.id),
  );
  const [pickersState, setPickersState] = useState(pickers);

  const handleAnsweredOnMutation = useMutation({
    mutationFn: () => {
      setDisabled(true);
      return authAxios.patch(`/card/${id}/answered`, {
        isAnswered: !answered,
      });
    },
    onSuccess: () => {
      pushAlertQueue(
        `기도제목이 ${!answered ? '-응답받았음-' : '-아직 응답받지 못했음-'}\n으로 표시되었습니다.`,
        'success',
      );
      setAnswered(prev => !prev);
    },
    onError: (error: any) => {
      if (error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handlePickedOnMutation = useMutation({
    mutationFn: () => {
      setDisabled(true);
      return authAxios.patch(`/card/${id}/pick`);
    },
    onSuccess: () => {
      const existPicker = pickersState.some(picker => picker.id === user.id);
      if (existPicker) {
        setIsPicker(false);
        setPickersState(prev => prev.filter(picker => picker.id !== user.id));
      } else {
        setIsPicker(true);
        setPickersState(prev => [...prev, { id: user.id }]);
      }

      pushAlertQueue(
        `기도대상${!isPicker ? '으로 선택' : '에서 제외'}되었습니다.`,
        'success',
      );
    },
    onError: (error: any) => {
      if (error.status === 401) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
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
        <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
      </span>

      <span>
        {user.id === writer.id ? (
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
        ) : answered ? (
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
