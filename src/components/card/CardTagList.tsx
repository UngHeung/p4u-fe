import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useRef } from 'react';
import useMouseDragAndTouchScroll from '../common/hooks/useMouseDragScroll';
import Tag from '../tag/Tag';
import { CardProps } from './Card';
import style from './styles/card.module.css';

const CardTagList = ({
  card,
  answered,
  tagKeywordsArr,
  isDragging,
  setIsDragging,
}: {
  card: CardProps;
  answered: boolean;
  tagKeywordsArr: string[];
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const ulRef = useRef<HTMLUListElement>(null);

  const { handleStart, handleMove, handleEnd } = useMouseDragAndTouchScroll(
    ulRef,
    isDragging,
    setIsDragging,
  );

  return (
    <ul
      ref={ulRef}
      className={`${style.cardTagList} ${isDragging ? style.grabbing : style.grab}`}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {card.tags &&
        card.tags.length > 0 &&
        card.tags.map((tag, idx) => {
          if (cardListType === 'tag' && tagKeywordsArr.includes(tag.keyword)) {
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
  );
};

export default CardTagList;
