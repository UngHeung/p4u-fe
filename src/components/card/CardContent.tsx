import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import React from 'react';
import { CardProps } from './Card';
import CardTagList from './CardTagList';
import style from './styles/card.module.css';

const CardContent = ({
  card,
  answered,
  isDragging,
  setIsDragging,
}: {
  card: CardProps;
  answered: boolean;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const searchKeyword = useCardSearchStore(state => state.searchKeyword);
  const tagKeywords = useCardSearchStore(state => state.tagKeywords);

  const tagKeywordsArr = tagKeywords.split('_');

  return (
    <>
      <strong className={style.cardTitle}>
        {cardListType === 'keyword'
          ? findKeywordFromTitle(card.title, searchKeyword)
          : card.title}
      </strong>

      <span className={style.cardWriter}>
        {card.isAnonymity
          ? '익명'
          : card.writer.isShowNickname
            ? (card.writer.nickname ?? card.writer.name)
            : card.writer.name}
      </span>
      <section className={style.cardTagWrap}>
        <CardTagList
          card={card}
          answered={answered}
          tagKeywordsArr={tagKeywordsArr}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      </section>
    </>
  );
};

export default CardContent;

const findKeywordFromTitle = (title: string, searchKeyword: string) => {
  const titleArr = title.split(searchKeyword);

  return titleArr.map((text, idx) => (
    <React.Fragment key={idx}>
      {text}
      {idx === titleArr.length - 1 && text !== ' ' ? null : (
        <span className={style.keyword}>{searchKeyword}</span>
      )}
    </React.Fragment>
  ));
};
