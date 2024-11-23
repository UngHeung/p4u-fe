import { baseAxios } from '@/apis/axiosInstance';
import { CardListType } from '@/stores/card/cardTypeStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const CreateCardListQuery = (
  activeTab: CardListType,
  searchKeyword?: string,
) => {
  const take = 10;

  return useInfiniteQuery({
    queryKey: [activeTab],
    queryFn: async ({ pageParam }) => {
      const { data } = await baseAxios.get(
        activeTab === 'tag'
          ? `/card/search/tag?keyword=${searchKeyword}&take=${take}&cursor=${pageParam}`
          : activeTab === 'keyword'
            ? `/card/search?keyword=${searchKeyword}&take=${take}&cursor=${pageParam}`
            : activeTab === 'my'
              ? `/card/my?take=${take}&cursor=${pageParam}`
              : `/card?take=${take}&cursor=${pageParam}`,
      );
      return {
        list: data.list,
        nextCursor: data.cursor,
      };
    },
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    enabled: !!activeTab,
    initialData: undefined,
  });
};
