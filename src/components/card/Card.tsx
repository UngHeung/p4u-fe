'use client';

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

        <pre className={style.cardContent}>{content}</pre>
      </section>
    </article>
  );
};

export default Card;
