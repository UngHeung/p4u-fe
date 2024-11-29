import { useThanksListStore } from '@/stores/thanks/thanksListTypeStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../common/Loading';
import ThanksBox from './ThanksBox';
import { useThanksListQuery } from './handlers/useThanksListQuery';
import styles from './styles/thanks.module.css';

const ThanksBoxList = () => {
  const thanksListType = useThanksListStore(state => state.thanksListType);
  const thanksListOrder = useThanksListStore(state => state.thanksListOrder);

  const { data, fetchNextPage, hasNextPage, isLoading } = useThanksListQuery(
    thanksListType,
    thanksListOrder,
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <ul className={styles.thanksBoxList}>
      {hasNextPage && (
        <li key={'moreFetch'}>
          <div ref={ref} />
        </li>
      )}
      {isLoading ? (
        <Loading color={'#222222'} />
      ) : data && data?.items.length > 0 ? (
        data?.items.map((thanksBox, index) => (
          <li key={index}>
            <ThanksBox {...thanksBox} />
          </li>
        ))
      ) : (
        <li className={styles.empty}>{'감사 목록이 없습니다.'}</li>
      )}
    </ul>
  );
};

export default ThanksBoxList;
