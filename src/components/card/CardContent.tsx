import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import Tag from '../tag/Tag';
import { CardProps } from './Card';
import style from './styles/card.module.css';

const CardContent = ({
  card,
  answered,
}: {
  card: CardProps;
  answered: boolean;
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
        {card.isAnonymity ? '익명' : card.writer.name}
      </span>
      <section className={style.cardTagWrap}>
        <ul className={style.cardTagList}>
          {card.tags &&
            card.tags.length > 0 &&
            card.tags.map((tag, idx) => {
              if (
                cardListType === 'tag' &&
                tagKeywordsArr.includes(tag.keyword)
              ) {
                return (
                  <li key={idx} className={style.searchTag}>
                    <Tag keyword={tag.keyword} answered={answered} />
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    <Tag keyword={tag.keyword} answered={answered} />
                  </li>
                );
              }
            })}
        </ul>
      </section>
    </>
  );
};

export default CardContent;

const findKeywordFromTitle = (title: string, searchKeyword: string) => {
  const titleArr = title.split(searchKeyword);

  return titleArr.map((text, idx) => (
    <>
      {text}
      {idx === titleArr.length - 1 && text !== ' ' ? null : (
        <span className={style.keyword}>{searchKeyword}</span>
      )}
    </>
  ));
};
