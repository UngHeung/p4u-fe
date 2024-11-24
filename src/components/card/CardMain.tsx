'use client';

import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CardList from './CardList';
import CardSearch from './CardSearch';
import { useCardListQuery } from './handlers/useCardListQuery';

const CardMain = () => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const searchKeyword = useCardSearchStore(state => state.searchKeyword);
  const tagKeywords = useCardSearchStore(state => state.tagKeywords);

  const { data, fetchNextPage, hasNextPage, isLoading } = useCardListQuery(
    cardListType,
    searchKeyword,
    tagKeywords,
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <CardSearch />

      <CardList
        postList={data?.pages.flatMap(page => page.list) ?? []}
        ref={ref}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </>
  );
};

export default CardMain;
