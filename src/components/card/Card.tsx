"use client";

import { useState } from "react";
import { svgIcons } from "../common/functions/getSvg";
import Tag from "../tag/Tag";
import style from "./styles/card.module.css";

export interface CardProps {
  writer: any;
  title: string;
  content: string;
  intercessors: any[];
  tags: any[];
  answered: boolean;
}

const Card = ({ writer, title, content, intercessors, tags, answered }: CardProps) => {
  const [isFliped, setIsFliped] = useState(false);

  return (
    <article
      className={`${style.cardWrap}${answered ? " " + style.answered : ""}`}
      onClick={() => setIsFliped((prev) => !prev)}
      style={{ transform: `rotateY(${isFliped ? 180 : 0}deg)` }}
    >
      <section className={style.cardFront}>
        <header className={style.cardHeader}>
          <span className={style.cardInfo}>
            {svgIcons.heart()}
            <strong>{`${intercessors.length}명`}</strong>
            <span>{"이 이 기도제목을 위해 기도하고있습니다."}</span>
          </span>

          <span>{answered ? svgIcons.answered() : svgIcons.checked(false)}</span>
        </header>
        <strong className={style.cardTitle}>{title}</strong>
        <span className={style.cardWriter}>{writer.name}</span>
        <section className={style.cardTagWrap}>
          <ul className={style.cardTagList}>
            {tags.length > 0 &&
              tags.map((item, idx) => {
                return (
                  <li key={idx}>
                    <Tag keyword={item} answered={answered} />
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
            <strong>{`${intercessors.length}명`}</strong>
            <span>{"이 이 기도제목을 위해 기도하고있습니다."}</span>
          </span>
          <span>{answered ? svgIcons.answered() : svgIcons.checked(false)}</span>
        </header>

        <pre className={style.cardContent}>{content}</pre>
      </section>
    </article>
  );
};

export default Card;
