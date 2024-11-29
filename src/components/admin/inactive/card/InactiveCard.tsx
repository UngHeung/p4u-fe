import CardList from '@/components/card/CardList';
import { useCardListQuery } from '@/components/card/handlers/useCardListQuery';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const InactiveCardList = () => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const setCardListType = useCardTypeStore(state => state.setCardListType);

  const { data, fetchNextPage, hasNextPage, isLoading } = useCardListQuery(
    'inactive',
    '',
    '',
  );

  console.log(data);

  const { ref, inView } = useInView();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (cardListType !== 'inactive') {
      setCardListType('inactive');
      queryClient.invalidateQueries({ queryKey: ['cardList'] });
    }

    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section>
      <CardList
        postList={data?.pages.flatMap(page => page.list) ?? []}
        ref={ref}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
      />
    </section>
  );
};

export default InactiveCardList;
