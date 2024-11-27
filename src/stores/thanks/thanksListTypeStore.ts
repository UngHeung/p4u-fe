import { create } from 'zustand';

export type ThanksListType = 'all' | 'my';
export type ThanksListOrder = 'DESC' | 'ASC';

export interface ThanksTypeProps {
  thanksListType: ThanksListType;
  setThanksListType: (thanksListType: ThanksListType) => void;

  thanksListOrder: ThanksListOrder;
  setThanksListOrder: (thanksListOrder: ThanksListOrder) => void;
}

export const useThanksTypeStore = create<ThanksTypeProps>(set => ({
  thanksListType: 'all',
  setThanksListType: thanksListType => set({ thanksListType }),

  thanksListOrder: 'DESC',
  setThanksListOrder: thanksListOrder => set({ thanksListOrder }),
}));
