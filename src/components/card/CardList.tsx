import { CardStore, useCardStore } from '@/stores/card/cardStore';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Card, { CardProps } from './Card';
import style from './styles/card.module.css';

const CardList = ({ isLoading }: { isLoading: boolean }) => {
  const cardListType = useCardStore((state: CardStore) => state.cardListType);
  const cardList = useCardStore((state: CardStore) => state.cardList);
  const keywordCardList = useCardStore(
    (state: CardStore) => state.keywordCardList,
  );
  const tagCardList = useCardStore((state: CardStore) => state.tagCardList);

  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    if (cardListType === 'list') {
      setCards(cardList);
    } else if (cardListType === 'tag') {
      setCards(tagCardList);
    } else if (cardListType === 'keyword') {
      setCards(keywordCardList);
    }
  }, [cardListType, tagCardList, cardList, keywordCardList]);

  return (
    <>
      <section className={style.listWrap}>
        <ul className={style.cardListWrap}>
          {!isLoading ? (
            cards && cards.length > 0 ? (
              cards.map((card, idx) => {
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
            isLoading && (
              <li key={'loadkey'} className={style.loading}>
                <Loading color={'#222222'} />
              </li>
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default CardList;
