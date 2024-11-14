"use client";

import { authAxios } from "@/apis/axiosInstance";
import { useEffect, useState } from "react";
import { BASE_URL } from "../common/constants/baseUrl";
import Loading from "../common/Loading";
import Card, { CardProps } from "./Card";
import CardSearch from "./CardSearch";
import style from "./styles/card.module.css";

const CardList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    handleCardList();
  }, []);

  const handleCardList = async () => {
    setIsLoading(true);

    try {
      const response = await authAxios.get(`${BASE_URL}/card/my`);

      if (response.status === 200) {
        setCards(response.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={style.searchWrap}>
        <CardSearch setIsLoading={setIsLoading} />
      </section>
      <section className={style.listWrap}>
        <ul className={style.cardListWrap}>
          {!isLoading ? (
            cards && cards.length > 0 ? (
              cards.map((card, idx) => {
                return (
                  <li key={idx}>
                    <Card {...card} />
                  </li>
                );
              })
            ) : (
              <li className={style.empty}>{"작성된 카드가 없습니다."}</li>
            )
          ) : (
            isLoading && (
              <li key={"loadkey"} className={style.loading}>
                <Loading color={"#222222"} />
              </li>
            )
          )}
        </ul>
      </section>
    </>
  );
};

export default CardList;
