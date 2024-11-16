'use client';

import { authAxios } from '@/apis/axiosInstance';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { useState } from 'react';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import Tag from '../tag/Tag';
import style from './styles/card.module.css';

export interface CardProps {
  id: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  title: string;
  content: string;
  pickers: Pick<UserProps, 'id'>[];
  tags: any[];
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
  const user = useUserStore((state: UserStore) => state.user);

  const [isFliped, setIsFliped] = useState(false);
  const [answered, setIsAnswered] = useState<boolean>(isAnswered);
  const [disabled, setDisabled] = useState(false);

  const handleAnswered = async () => {
    setIsAnswered(prev => !prev);
    setDisabled(true);

    const data = {
      isAnswered: !answered,
    };

    try {
      const url = `${BASE_URL}/card/${id}/answered`;
      const response = await authAxios.patch(url, data);

      setIsAnswered(response.data.isAnswered);
    } catch (error: any) {
    } finally {
      setDisabled(false);
    }
  };

  return (
    <article
      className={`${style.cardWrap}${answered ? ' ' + style.answered : ''}`}
      onClick={() => setIsFliped(prev => !prev)}
      style={{ transform: `rotateY(${isFliped ? 180 : 0}deg)` }}
    >
      <section className={style.cardFront}>
        <header className={style.cardHeader}>
          <span className={style.cardInfo}>
            {svgIcons.heart()}
            <strong>{`${pickers ? pickers.length : 0}명`}</strong>
            <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
          </span>

          <span>
            {user.id === writer.id ? (
              <button
                type="button"
                name="isAnswered"
                onClick={event => {
                  event.stopPropagation();
                  handleAnswered();
                }}
                disabled={disabled}
              >
                {svgIcons.answered()}
              </button>
            ) : answered ? (
              svgIcons.answered()
            ) : (
              svgIcons.checked(false)
            )}
          </span>
        </header>
        <strong className={style.cardTitle}>{title}</strong>
        <span className={style.cardWriter}>
          {isAnonymity ? '익명' : writer.name}
        </span>
        <section className={style.cardTagWrap}>
          <ul className={style.cardTagList}>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, idx) => {
                return (
                  <li key={idx}>
                    <Tag keyword={tag.keyword} answered={answered} />
                  </li>
                );
              })}
          </ul>
        </section>
      </section>

      <section className={style.cardBack}>
        <header className={style.cardHeader}>
          <span className={style.cardInfo}>
            {svgIcons.heart()}
            <strong>{`${pickers ? pickers.length : 0}명`}</strong>
            <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
          </span>
          <span>
            {user.id === writer.id ? (
              <button
                type="button"
                name="isAnswered"
                onClick={event => {
                  event.stopPropagation();
                  handleAnswered();
                }}
                disabled={disabled}
              >
                {svgIcons.answered()}
              </button>
            ) : answered ? (
              svgIcons.answered()
            ) : (
              svgIcons.checked(false)
            )}
          </span>
        </header>

        <pre className={style.cardContent}>{content}</pre>
      </section>
    </article>
  );
};

export default Card;
