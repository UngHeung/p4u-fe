import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { Dispatch, SetStateAction, useState } from 'react';
import { CardProps } from '../card/Card';
import { svgIcons } from '../common/functions/getSvg';

const TodayCardPick = ({
  setCard,
  setIsLoading,
  setIsShowGuide,
}: {
  setCard: Dispatch<SetStateAction<CardProps | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsShowGuide: Dispatch<SetStateAction<boolean>>;
}) => {
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [disabled, setDisabled] = useState(false);

  const handlePickCard = async () => {
    try {
      const response = await authAxios.get('/card/random');

      if (response.status === 200 || response.status === 201) {
        setCard(response.data);
        pushAlertQueue('오늘의 카드를 찾았습니다.', 'success');
      }
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        pushAlertQueue('로그인이 필요합니다.', 'failure');
      } else if (error.status === 404) {
        pushAlertQueue('오늘의 카드를 찾을 수 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    }
  };

  return (
    <button
      type={'button'}
      onClick={() => {
        setDisabled(true);
        setIsLoading(true);
        setIsShowGuide(false);
        setTimeout(() => {
          handlePickCard();

          setDisabled(false);
          setIsLoading(false);
        }, 1000);
      }}
      disabled={disabled}
    >
      {'오늘의 카드 찾기'}
      {svgIcons.enter('large')}
    </button>
  );
};

export default TodayCardPick;
