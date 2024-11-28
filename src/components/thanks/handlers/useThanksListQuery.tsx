import { authAxios } from '@/apis/axiosInstance';
import {
  ThanksListOrder,
  ThanksListType,
} from '@/stores/thanks/thanksListTypeStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useThanksListQuery = (
  thanksListType: ThanksListType,
  thanksListOrder: ThanksListOrder,
) => {
  const take = 10;

  return useInfiniteQuery({
    queryKey: ['thanks', thanksListType],
    queryFn: async ({ pageParam }) => {
      if (pageParam === null) {
        return {
          pages: [],
          pageParams: [],
          items: [],
        };
      }

      const url = `/thanks/list?type=${thanksListType}&take=${take}&cursor=${pageParam}&order=${thanksListOrder}`;

      const { data } = await authAxios.get(url);

      return data;
    },
    staleTime: 0,
    getNextPageParam: lastPage => {
      return lastPage.cursor > -1 ? lastPage.cursor : undefined;
    },
    select: data => ({
      pages: data.pages,
      pageParams: data.pageParams,
      items: data.pages.flatMap(page => page.list),
    }),
    initialPageParam: -1,
  });
};
