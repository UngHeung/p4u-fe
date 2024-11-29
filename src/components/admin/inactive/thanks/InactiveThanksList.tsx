'use client';

import { useThanksListQuery } from '@/components/thanks/handlers/useThanksListQuery';
import styles from '@/components/thanks/styles/thanks.module.css';
import ThanksBoxList from '@/components/thanks/ThanksBoxList';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const InactiveThanksList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useThanksListQuery(
    'inactive',
    'DESC',
  );

  const { ref, inView } = useInView();

  useEffect(() => {
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
