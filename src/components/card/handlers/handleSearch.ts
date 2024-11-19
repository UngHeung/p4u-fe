import { baseAxios } from '@/apis/axiosInstance';
import { CardListType } from '@/stores/card/cardStore';
import React, { FormEvent, SetStateAction } from 'react';
import { CardProps } from '../Card';

export const handleSearch = async (
  {
    setIsLoading,
    setCardListType,
    setCardList,
    selectTagList,
  }: {
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
    setCardListType: (type: CardListType) => void;
    setCardList: (cardList: CardProps[], type: CardListType) => void;
    selectTagList: string[];
  },
  event?: FormEvent<HTMLFormElement>,
) => {
  setIsLoading(true);

  if (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get('keyword');

    try {
      const query = `?keyword=${keyword}`;
      const url = `/card/search${query}`;
      const response = await baseAxios.get(url);

      setCardListType('keyword');
      setCardList(response.data, 'keyword');
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  } else {
    if (!selectTagList.length) {
      setCardListType('list');
      setIsLoading(false);
      return;
    }

    const query = `?keywords=${selectTagList.join('_')}`;
    const url = `/card/search/tag${query}`;

    try {
      const response = await baseAxios.get(url);

      setCardListType('tag');
      setCardList(response.data, 'tag');
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
};
