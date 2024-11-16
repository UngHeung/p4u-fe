'use client';

import { authAxios } from '@/apis/axiosInstance';
import { CardStore, useCardStore } from '@/stores/card/cardStore';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../common/constants/baseUrl';
import CardList from './CardList';
import CardSearch from './CardSearch';

const CardMain = () => {
  const setCardList = useCardStore((state: CardStore) => state.setCardList);
  const setCardListType = useCardStore(
    (state: CardStore) => state.setCardListType,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCardListType('list');
    handleInitialCardList();
  }, []);

  const handleInitialCardList = async () => {
    setIsLoading(true);

    try {
      const response = await authAxios.get(`${BASE_URL}/card`);

      if (response.status === 200) {
        setCardList(response.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <CardSearch setIsLoading={setIsLoading} />
      <CardList isLoading={isLoading} />
    </section>
  );
};

export default CardMain;
