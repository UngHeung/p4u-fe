"use client";

import { authAxios } from "@/apis/axiosInstance";
import { useEffect, useState } from "react";
import { BASE_URL } from "../common/constants/baseUrl";
import Loading from "../common/Loading";
import Card, { CardProps } from "./Card";

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
    <ul>
      {cards && cards.length > 0 ? (
        cards.map((card, idx) => {
          return (
            <li key={idx}>
              <Card {...card} />
            </li>
          );
        })
      ) : (
        <li>{"작성된 카드가 없습니다."}</li>
      )}
      {isLoading && (
        <li key={"loadkey"}>
          <Loading />
        </li>
      )}
    </ul>
  );
};

export default CardList;
