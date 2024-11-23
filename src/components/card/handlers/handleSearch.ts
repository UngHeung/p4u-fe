import { baseAxios } from '@/apis/axiosInstance';
import { CardListType } from '@/stores/card/cardTypeStore';
import { FormEvent } from 'react';
import { CardProps } from '../Card';

export const handleSearch = async (
  {
    setCardListType,
    setCardList,
    selectTagList,
  }: {
    setCardListType: (type: CardListType) => void;
    setCardList: (cardList: CardProps[], type: CardListType) => void;
    selectTagList: string[];
  },
  event?: FormEvent<HTMLFormElement>,
) => {
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
    }
  } else {
    if (!selectTagList.length) {
      setCardListType('all');
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
    }
  }
};
