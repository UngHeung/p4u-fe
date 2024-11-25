import { useEffect, useState } from 'react';
import { CardProps } from '../card/Card';
import Loading from '../common/Loading';
import Guide from '../guide/Guide';
import TodayCard from './TodayCard';
import TodayCardPick from './TodayCardPick';
import style from './styles/today.module.css';

const TodayMain = () => {
  const [card, setCard] = useState<CardProps | undefined>(undefined);
  const [isShowGuide, setIsShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (card) {
        setIsShowGuide(true);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [card]);

  return (
    <section className={style.todayPickWrap}>
      <Guide
        content="기도 후 하트를 눌러주세요!"
        className={`${style.todayGuide}${isShowGuide ? ' ' + style.show : ''}`}
      />

      {isLoading ? (
        <Loading color={'#111111'} />
      ) : card ? (
        <TodayCard card={card} />
      ) : (
        <span className={style.todayCardNotFound}>
          {'오늘의 카드를 찾아보세요!'}
        </span>
      )}
      <TodayCardPick
        setCard={setCard}
        setIsLoading={setIsLoading}
        setIsShowGuide={setIsShowGuide}
      />
    </section>
  );
};

export default TodayMain;
