import { authAxios } from '@/apis/axiosInstance';
import { CardListType } from '@/stores/card/cardStore';
import { SetStateAction } from 'react';
import { CardProps } from '../Card';

export const handleInitialCardList = async ({
  setIsLoading,
  setCardList,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setCardList: (cardList: CardProps[], type: CardListType) => void;
}) => {
  setIsLoading(true);

  try {
    const response = await authAxios.get(`/card`);

    if (response.status === 200) {
      setCardList(response.data, 'list');
    }
  } catch (error: any) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
