import React, { useEffect, useState } from 'react';
import TodayCard from './TodayCard';
import TodayCardPick from './TodayCardPick';
import style from './styles/today.module.css';
import { CardProps } from '../card/Card';
import Guide from '../guide/Guide';

const TodayMain = () => {
  const [card, setCard] = useState<CardProps | undefined>(undefined);
  const [isShowGuide, setIsShowGuide] = useState(false);

  useEffect(() => {
    if (card) {
      setTimeout(() => {
        setIsShowGuide(true);
      }, 500);
    }
  }, [card]);

  return (
    <section className={style.todayPickWrap}>
      <Guide
        content="기도 후 하트를 눌러주세요!"
        className={`${style.todayGuide}${isShowGuide ? ' ' + style.show : ''}`}
      />

      {card ? (
        <TodayCard card={card} />
      ) : (
        <span className={style.todayCardNotFound}>
          {'오늘의 카드를 찾아보세요!'}
        </span>
      )}
      <TodayCardPick setCard={setCard} />
    </section>
  );
};

export default TodayMain;
