import { authAxios } from '@/apis/axiosInstance';
import { Dispatch, SetStateAction, useState } from 'react';
import { CardProps } from '../card/Card';
import useAlert from '../common/alert/useAlert';
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
  const { pushAlert } = useAlert();

  const [disabled, setDisabled] = useState(false);

  const handlePickCard = async () => {
    try {
      const response = await authAxios.get('/card/random');

      if (response.status === 200 || response.status === 201) {
        setCard(response.data);
        pushAlert({
          target: 'CARD_PICK',
          type: 'SUCCESS',
          status: 200,
        });
      }
    } catch (error: any) {
      pushAlert({
        target: 'CARD_TODAY',
        type: 'FAILURE',
        status: error.status,
        reason:
          error.status === 401
            ? 'UNAUTHORIZED'
            : error.status === 404
              ? 'NOT_FOUND'
              : 'INTERNAL_SERVER_ERROR',
      });
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
