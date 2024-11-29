import Loading from '../common/Loading';
import ThanksBox, { ThanksBoxProps } from './ThanksBox';
import styles from './styles/thanks.module.css';

interface ThanksBoxListProps {
  data: any;
  ref: any;
  hasNextPage: boolean;
  isLoading: boolean;
}

const ThanksBoxList = ({
  data,
  ref,
  hasNextPage,
  isLoading,
}: ThanksBoxListProps) => {
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
        data?.items.map((thanksBox: ThanksBoxProps, index: number) => (
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
