'use client';

import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserProps } from '@/stores/user/userStore';
import { useState } from 'react';
import { TagProps } from '../tag/Tag';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import style from './styles/card.module.css';

export interface CardProps {
  id: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  title: string;
  content: string;
  pickers: Pick<UserProps, 'id'>[];
  tags: TagProps[];
  isAnswered: boolean;
  isAnonymity: boolean;
}

const Card = ({
  id,
  writer,
  title,
  content,
  pickers,
  tags,
  isAnswered,
  isAnonymity,
}: CardProps) => {
  const cardListType = useCardTypeStore(state => state.cardListType);
  const searchKeyword = useCardSearchStore(state => state.searchKeyword);

  const [isFliped, setIsFliped] = useState(false);
  const [answered, setAnswered] = useState<boolean>(isAnswered);
  const [disabled, setDisabled] = useState(false);

  return (
    <article
      className={`${style.cardWrap}${answered ? ' ' + style.answered : ''}`}
      onClick={() => setIsFliped(prev => !prev)}
      style={{ transform: `rotateY(${isFliped ? 180 : 0}deg)` }}
    >
      <section className={style.cardFront}>
        <CardHeader
          id={id}
          writer={writer}
          answered={answered}
          setAnswered={setAnswered}
          pickers={pickers}
          disabled={disabled}
          setDisabled={setDisabled}
        />

        <CardContent
          title={title}
          writer={writer}
          tags={tags}
          isAnonymity={isAnonymity}
          answered={answered}
        />
      </section>

      <section className={style.cardBack}>
        <CardHeader
          id={id}
          writer={writer}
          answered={answered}
          setAnswered={setAnswered}
          pickers={pickers}
          disabled={disabled}
          setDisabled={setDisabled}
        />

        {cardListType === 'keyword' ? (
          findKeywordFromContent(content, searchKeyword)
        ) : (
          <pre key={'content'} className={style.cardContent}>
            {content}
          </pre>
        )}
      </section>
    </article>
  );
};

export default Card;

const findKeywordFromContent = (content: string, searchKeyword: string) => {
  const contentArr = content.split(searchKeyword);

  return (
    <pre key={'contentBySearchKeyword'} className={style.cardContent}>
      {contentArr.map((text, idx) => (
        <span key={idx}>
          {text}
          {idx === contentArr.length - 1 && text !== ' ' ? null : (
            <span className={style.keyword}>{searchKeyword}</span>
          )}
        </span>
      ))}
    </pre>
  );
};
