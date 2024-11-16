import { CardProps } from '@/components/card/Card';
import { create } from 'zustand';

export type CardListType = 'list' | 'keyword' | 'tag';

export interface CardStore {
  card: CardProps;
  setCard: (card: CardProps) => void;
  resetCard: () => void;

  cardListType: CardListType;
  setCardListType: (type: CardListType) => void;

  cardList: CardProps[];
  setCardList: (cardList: CardProps[]) => void;
  resetCardList: () => void;

  keywordCardList: CardProps[];
  setKeywordCardList: (cardList: CardProps[]) => void;
  resetKeywordCardList: () => void;

  tagCardList: CardProps[];
  setTagCardList: (cardList: CardProps[]) => void;
  resetTagCardList: () => void;

  addCard: (card: CardProps, type: CardListType) => void;
  removeCard: (id: number, type: CardListType) => void;
}

const initialCard = {
  id: -1,
  writer: {
    id: -1,
    name: '',
  },
  title: '',
  content: '',
  isAnonymity: false,
  isAnswered: false,
  pickers: [],
  tags: [],
};

export const useCardStore = create<CardStore>(set => ({
  card: initialCard,
  setCard: (card: CardProps) => set({ card }),
  resetCard: () => set({ card: initialCard }),

  cardListType: 'list',
  setCardListType: (cardListType: CardListType) => set({ cardListType }),

  cardList: [],
  setCardList: (cardList: CardProps[]) => set({ cardList }),
  resetCardList: () =>
    set({
      cardList: [],
    }),

  keywordCardList: [],
  setKeywordCardList: (keywordCardList: CardProps[]) =>
    set({ keywordCardList }),
  resetKeywordCardList: () =>
    set({
      keywordCardList: [],
    }),

  tagCardList: [],
  setTagCardList: (tagCardList: CardProps[]) => set({ tagCardList }),
  resetTagCardList: () =>
    set({
      tagCardList: [],
    }),

  addCard: (card: CardProps, type: CardListType) => {
    if (type === 'list') {
      return set(state => ({
        cardList: [card, ...state.cardList],
      }));
    } else if (type === 'keyword') {
      return set(state => ({
        keywordCardList: [card, ...state.keywordCardList],
      }));
    } else if (type === 'tag') {
      return set(state => ({
        tagCardList: [card, ...state.tagCardList],
      }));
    }
  },

  removeCard: (id: number, type: CardListType) => {
    if (type === 'list') {
      return set(state => ({
        cardList: state.cardList.filter(item => item.id !== id),
      }));
    } else if (type === 'keyword') {
      return set(state => ({
        keywordCardList: state.keywordCardList.filter(item => item.id !== id),
      }));
    } else if (type === 'tag') {
      return set(state => ({
        tagCardList: state.tagCardList.filter(item => item.id !== id),
      }));
    }
  },
}));
