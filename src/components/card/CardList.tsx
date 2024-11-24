import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import Loading from '../common/Loading';
import Card, { CardProps } from './Card';
import style from './styles/card.module.css';

const CardList = ({
  postList,
  ref,
  isLoading,
  hasNextPage,
}: {
  postList: CardProps[];
  ref: (node?: Element | null) => void;
  isLoading: boolean;
  hasNextPage: boolean;
}) => {
  const isLoadingTagSearch = useCardSearchStore(
    state => state.isLoadingTagSearch,
  );

  return (
    <>
      <section className={style.listWrap}>
        <ul className={style.cardListWrap}>
          {!isLoadingTagSearch ? (
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
            <li key={'loadkey1'} className={style.loading}>
              <Loading color={'#222222'} />
            </li>
          )}
          {hasNextPage && (
            <li key={'moreFetch'}>
              <div ref={ref}></div>
            </li>
          )}
          {isLoading && (
            <li key={'loadkey2'} className={style.loading}>
              <Loading color={'#222222'} />
            </li>
          )}
        </ul>
      </section>
    </>
  );
};

export default CardList;
