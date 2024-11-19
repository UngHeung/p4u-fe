'use client';

import { CardStore, useCardStore } from '@/stores/card/cardStore';
import { useEffect, useState } from 'react';
import CardList from './CardList';
import CardSearch from './CardSearch';
import { handleInitialCardList } from './handlers/handleInitialCardList';

const CardMain = () => {
  const setCardList = useCardStore((state: CardStore) => state.setCardList);
  const setCardListType = useCardStore(
    (state: CardStore) => state.setCardListType,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCardListType('list');
    handleInitialCardList({
      setIsLoading,
      setCardList,
    });
  }, []);

  return (
    <>
      <CardSearch setIsLoading={setIsLoading} />
      <CardList isLoading={isLoading} />
    </>
  );
};

export default CardMain;
