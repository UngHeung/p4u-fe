'use client';

import { useThanksListQuery } from '@/components/thanks/handlers/useThanksListQuery';
import styles from '@/components/thanks/styles/thanks.module.css';
import ThanksBoxList from '@/components/thanks/ThanksBoxList';
import { useThanksListStore } from '@/stores/thanks/thanksListTypeStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const InactiveThanksList = () => {
  const thanksListType = useThanksListStore(state => state.thanksListType);
  const setThanksListType = useThanksListStore(
    state => state.setThanksListType,
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = useThanksListQuery(
    'inactive',
    'DESC',
  );

  const { ref, inView } = useInView();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (thanksListType !== 'inactive') {
      setThanksListType('inactive');
    }

    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className={styles.thanksMain}>
      <section className={styles.listContainer}>
        <ThanksBoxList
          data={data}
          ref={ref}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
        />
      </section>
    </section>
  );
};

export default InactiveThanksList;
