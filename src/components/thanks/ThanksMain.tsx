'use client';

import { useThanksListStore } from '@/stores/thanks/thanksListTypeStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useThanksListQuery } from './handlers/useThanksListQuery';
import styles from './styles/thanks.module.css';
import ThanksBoxList from './ThanksBoxList';
import ThanksWriteForm from './ThanksWriteForm';

const ThanksMain = () => {
  const thanksListType = useThanksListStore(state => state.thanksListType);
  const setThanksListType = useThanksListStore(
    state => state.setThanksListType,
  );
  const thanksListOrder = useThanksListStore(state => state.thanksListOrder);

  const { data, fetchNextPage, hasNextPage, isLoading } = useThanksListQuery(
    thanksListType,
    thanksListOrder,
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (thanksListType !== 'all') {
      setThanksListType('all');
    }

    if (inView && hasNextPage && !isLoading) {
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
      <section className={styles.writeFormContainer}>
        <ThanksWriteForm />
      </section>
    </section>
  );
};

export default ThanksMain;
