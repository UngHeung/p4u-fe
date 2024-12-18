import { create } from 'zustand';

export type CardListType = 'all' | 'keyword' | 'tag' | 'my' | 'inactive';

export interface CardTypeStore {
  cardListType: CardListType;
  setCardListType: (type: CardListType) => void;

  currCardList: CardListType;
  setCurrCardList: (type: CardListType) => void;
}

export const useCardTypeStore = create<CardTypeStore>(set => ({
  cardListType: 'all',
  setCardListType: (cardListType: CardListType) => set({ cardListType }),

  currCardList: 'all',
  setCurrCardList: (currCardList: CardListType) => set({ currCardList }),
}));
