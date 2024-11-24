import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserProps } from '@/stores/user/userStore';
import Tag, { TagProps } from '../tag/Tag';
import style from './styles/card.module.css';

const CardContent = ({
  title,
  writer,
  tags,
  isAnonymity,
  answered,
}: {
  title: string;
  writer: Pick<UserProps, 'id' | 'name'>;
  tags: TagProps[];
  isAnonymity: boolean;
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
          ? findKeywordFromTitle(title, searchKeyword)
          : title}
      </strong>

      <span className={style.cardWriter}>
        {isAnonymity ? '익명' : writer.name}
      </span>
      <section className={style.cardTagWrap}>
        <ul className={style.cardTagList}>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, idx) => {
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
