'use client';

import { CardTypeStore, useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CardList from './CardList';
import CardSearch from './CardSearch';
import { CreateCardListQuery } from './handlers/createCardListQuery';

const CardMain = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  const { cardListType, setCardListType } = useCardTypeStore(
    (state: CardTypeStore) => state,
  );

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    CreateCardListQuery(cardListType, searchKeyword);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['list', ''],
      exact: true,
    });
  }, [cardListType]);

  return (
    <>
      <CardSearch
        keyword={keyword}
        setKeyword={setKeyword}
        setSearchKeyword={setSearchKeyword}
        setActiveTab={setCardListType}
      />

      <CardList
        postList={data?.pages.flatMap(page => page.list) ?? []}
        isLoading={false}
        ref={ref}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
};

export default CardMain;
