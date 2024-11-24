'use client';

import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CardList from './CardList';
import CardSearch from './CardSearch';
import { useCardListQuery } from './handlers/useCardListQuery';

const CardMain = () => {
  const cardListType = useCardTypeStore(state => state.cardListType);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [tagKeywords, setTagKeywords] = useState('');
  const [tagSearchLoading, setTagSearchLoading] = useState(false);

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
      <CardSearch
        setTagKeywords={setTagKeywords}
        setSearchKeyword={setSearchKeyword}
        setTagSearchLoading={setTagSearchLoading}
      />

      <CardList
        postList={data?.pages.flatMap(page => page.list) ?? []}
        ref={ref}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        tagSearchLoading={tagSearchLoading}
      />
    </>
  );
};

export default CardMain;
