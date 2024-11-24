import { create } from 'zustand';

export interface CardSearchStore {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;

  tagKeywords: string;
  setTagKeywords: (keyword: string) => void;

  isLoadingTagSearch: boolean;
  setIsLoadingTagSearch: (isLoading: boolean) => void;
}

export const useCardSearchStore = create<CardSearchStore>(set => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),

  tagKeywords: '',
  setTagKeywords: (keyword: string) => set({ tagKeywords: keyword }),

  isLoadingTagSearch: false,
  setIsLoadingTagSearch: (isLoading: boolean) =>
    set({ isLoadingTagSearch: isLoading }),
}));
