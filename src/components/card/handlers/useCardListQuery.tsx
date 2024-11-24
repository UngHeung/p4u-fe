import { authAxios, baseAxios } from '@/apis/axiosInstance';
import { CardListType } from '@/stores/card/cardTypeStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCardListQuery = (
  cardListType: CardListType,
  searchKeyword: string = '',
  tagKeywords: string = '',
) => {
  const take = 10;

  return useInfiniteQuery({
    queryKey: ['cards', cardListType, searchKeyword, tagKeywords],
    queryFn: async ({ pageParam }) => {
      if (!cardListType) {
        return {
          pages: [],
          pageParams: [],
          items: [],
        };
      }

      const axiosInstance = cardListType === 'my' ? authAxios : baseAxios;

      let query = '/card';

      if (cardListType === 'my') {
        query += `/my?take=${take}&cursor=${pageParam}`;
      } else if (cardListType === 'tag') {
        query += `/search/tag?keyword=${tagKeywords}&take=${take}&cursor=${pageParam}`;
      } else if (cardListType === 'keyword') {
        query += `/search?keyword=${searchKeyword}&take=${take}&cursor=${pageParam}`;
      } else {
        query += `?take=${take}&cursor=${pageParam}`;
      }

      const { data } = await axiosInstance.get(query);

      return data;
    },
    getNextPageParam: lastPage =>
      lastPage.cursor > -1 ? lastPage.cursor : undefined,
    select: data => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: data.pages.flatMap(page => page.list),
    }),
    initialPageParam: -1,
  });
};
