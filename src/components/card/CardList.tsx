import Loading from '../common/Loading';
import Card, { CardProps } from './Card';
import style from './styles/card.module.css';

const CardList = ({
  postList,
  isLoading,
  ref,
  isFetchingNextPage,
  hasNextPage,
}: {
  postList: CardProps[];
  isLoading: boolean;
  ref: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}) => {
  return (
    <>
      <section className={style.listWrap}>
        <ul className={style.cardListWrap}>
          {!isLoading ? (
            postList && postList.length > 0 ? (
              postList.map((card, idx) => {
                return (
                  <li key={idx}>
                    <Card {...card} />
                  </li>
                );
              })
            ) : (
              <li className={style.empty}>{'검색된 카드가 없습니다.'}</li>
            )
          ) : (
            <li key={'loadkey'} className={style.loading}>
              {isFetchingNextPage && <Loading color={'#222222'} />}
            </li>
          )}
          {hasNextPage && (
            <li key={'moreFetch'}>
              <div ref={ref}></div>
            </li>
          )}
        </ul>
      </section>
    </>
  );
};

export default CardList;
