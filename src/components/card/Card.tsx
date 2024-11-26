'use client';

import { useCardSearchStore } from '@/stores/card/cardSearchStore';
import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserProps, useUserStore } from '@/stores/user/userStore';
import { useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import { TagProps } from '../tag/Tag';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardMenu from './CardMenu';
import style from './styles/card.module.css';

export interface CardProps {
  id: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  title: string;
  content: string;
  pickers: Pick<UserProps, 'id'>[];
  tags: TagProps[];
  isAnswered: boolean;
  isActive: boolean;
  isAnonymity: boolean;
}

const Card = ({ card }: { card: CardProps }) => {
  const user = useUserStore(state => state.user);
  const cardListType = useCardTypeStore(state => state.cardListType);
  const searchKeyword = useCardSearchStore(state => state.searchKeyword);

  const [isFliped, setIsFliped] = useState(false);
  const [answered, setAnswered] = useState<boolean>(card.isAnswered);
  const [isActive, setIsActive] = useState<boolean>(card.isActive);
  const [isPicker, setIsPicker] = useState<boolean>(
    card.pickers.some(picker => picker.id === user.id),
  );
  const [pickersState, setPickersState] = useState(card.pickers);
  const [disabled, setDisabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <article
      className={`${style.cardWrap}${answered ? ' ' + style.answered : ''}`}
      onClick={() => {
        if (isDragging) return;
        setIsFliped(prev => !prev);
      }}
      style={{ transform: `rotateY(${isFliped ? 180 : 0}deg)` }}
    >
      <section className={style.cardFront}>
        <CardHeader
          card={card}
          answered={answered}
          setAnswered={setAnswered}
          isPicker={isPicker}
          setIsPicker={setIsPicker}
          pickersState={pickersState}
          setPickersState={setPickersState}
          disabled={disabled}
          setDisabled={setDisabled}
        />

        <CardContent
          card={card}
          answered={answered}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      </section>

      <section className={style.cardBack}>
        <CardHeader
          card={card}
          answered={answered}
          setAnswered={setAnswered}
          isPicker={isPicker}
          setIsPicker={setIsPicker}
          pickersState={pickersState}
          setPickersState={setPickersState}
          disabled={disabled}
          setDisabled={setDisabled}
        />

        {cardListType === 'keyword' ? (
          findKeywordFromContent(card.content, searchKeyword)
        ) : (
          <pre key={'content'} className={style.cardContent}>
            {card.content}
          </pre>
        )}
      </section>

      {!isFliped && (
        <section className={style.cardMenuWrap}>
          {isMenuOpen && (
            <CardMenu
              card={card}
              setIsMenuOpen={setIsMenuOpen}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          )}
          <button
            id={''}
            type={'button'}
            className={style.cardMenuButton}
            onClick={event => {
              event.stopPropagation();
              setIsMenuOpen(prev => !prev);
            }}
          >
            {svgIcons.menu('#ffffff')}
          </button>
        </section>
      )}
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
