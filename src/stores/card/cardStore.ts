import { CardProps } from '@/components/card/Card';
import { create } from 'zustand';

export type CardListType = 'list' | 'keyword' | 'tag' | 'my';

export interface CardListProps {
  myCardList: CardProps[];
  baseCardList: CardProps[];
  tagCardList: CardProps[];
  keywordCardList: CardProps[];
}

export interface CardStore {
  card: CardProps;
  setCard: (card: CardProps) => void;
  resetCard: () => void;

  cardListType: CardListType;
  setCardListType: (type: CardListType) => void;

  cardList: CardListProps;
  setCardList: (cardList: CardProps[], type: CardListType) => void;
  resetCardList: (type: CardListType) => void;

  addCard: (card: CardProps, type: CardListType) => void;
  updateCard: (id: number, card: CardProps) => void;
  removeCard: (id: number) => void;
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

const initialCardList = {
  baseCardList: [],
  myCardList: [],
  keywordCardList: [],
  tagCardList: [],
};

export const useCardStore = create<CardStore>(set => ({
  card: initialCard,
  setCard: (card: CardProps) => set({ card }),
  resetCard: () => set({ card: initialCard }),

  cardListType: 'list',
  setCardListType: (cardListType: CardListType) => set({ cardListType }),

  cardList: initialCardList,

  setCardList: (cardList: CardProps[], type: CardListType) =>
    set(state => ({
      cardList: mappedCardList(type, state.cardList, cardList),
    })),
  resetCardList: (type: CardListType) =>
    set(state => ({
      cardList: mappedCardList(type, state.cardList, []),
    })),

  addCard: (card: CardProps) =>
    set(state => ({
      cardList: addCard(state.cardList, card),
    })),
  updateCard: (id: number, card: CardProps) =>
    set(state => ({
      cardList: changeCard(id, state.cardList, card),
    })),
  removeCard: (id: number) =>
    set(state => ({
      cardList: removeCard(id, state.cardList),
    })),
}));

const mappedCardList = (
  type: CardListType,
  currCardLists: CardListProps,
  cardList: CardProps[],
) => {
  const mappedlist = {
    baseCardList: type === 'list' ? cardList : currCardLists.baseCardList,
    myCardList: type === 'my' ? cardList : currCardLists.myCardList,
    keywordCardList:
      type === 'keyword' ? cardList : currCardLists.keywordCardList,
    tagCardList: type === 'tag' ? cardList : currCardLists.tagCardList,
  };

  return mappedlist;
};

const addCard = (currCardLists: CardListProps, newCard: CardProps) => {
  currCardLists = {
    baseCardList: [newCard, ...currCardLists.baseCardList],
    myCardList: [newCard, ...currCardLists.myCardList],
    keywordCardList: currCardLists.keywordCardList,
    tagCardList: currCardLists.tagCardList,
  };

  return currCardLists;
};

const changeCard = (
  id: number,
  currCardLists: CardListProps,
  newCard: CardProps,
) => {
  currCardLists = {
    baseCardList: currCardLists.baseCardList.map(currCard =>
      currCard.id === id ? newCard : currCard,
    ),
    myCardList: currCardLists.myCardList.map(currCard =>
      currCard.id === id ? newCard : currCard,
    ),
    keywordCardList: currCardLists.keywordCardList.map(currCard =>
      currCard.id === id ? newCard : currCard,
    ),
    tagCardList: currCardLists.tagCardList.map(currCard =>
      currCard.id === id ? newCard : currCard,
    ),
  };

  return currCardLists;
};

const removeCard = (id: number, currCardLists: CardListProps) => {
  currCardLists = {
    baseCardList: currCardLists.baseCardList.filter(
      card => card.id !== id && card,
    ),
    myCardList: currCardLists.myCardList.filter(card => card.id !== id && card),
    keywordCardList: currCardLists.keywordCardList.filter(
      card => card.id !== id && card,
    ),
    tagCardList: currCardLists.tagCardList.filter(
      card => card.id !== id && card,
    ),
  };

  return currCardLists;
};
