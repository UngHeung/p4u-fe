import { create } from 'zustand';

export type AlertTypes = 'success' | 'failure' | 'notification';

export interface AlertProps {
  message: string;
  index?: number;
  type: AlertTypes;
  isExiting?: boolean;
}

export interface AlertStore {
  alertQueue: AlertProps[];
  pushAlertQueue: (message: string, type: AlertTypes) => void;
  shiftAlertQueue: () => void;
  deleteAlertQueue: (idx: number) => void;
  resetAlertQueue: () => void;
}

export const useAlertStore = create<AlertStore>(set => ({
  alertQueue: [],
  pushAlertQueue: (message: string, type: AlertTypes) => {
    set(state => ({
      alertQueue: [...state.alertQueue, { message, type }],
    }));
  },

  shiftAlertQueue: () => {
    set(state => ({
      alertQueue: state.alertQueue.filter((item, idx) =>
        idx !== 0 ? item : null,
      ),
    }));
  },

  deleteAlertQueue: (index: number) => {
    set(state => ({
      alertQueue: state.alertQueue.filter((item, idx) =>
        idx !== index ? item : null,
      ),
    }));
  },

  resetAlertQueue: () => {
    set({ alertQueue: [] });
  },
}));
