import { create } from "zustand";

export interface AlertProps {
  message: string;
}

export interface AlertStore {
  alertQueue: AlertProps[];
  pushAlertQueue: (message: string) => void;
  shiftAlertQueue: () => void;
  deleteAlertQueue: (idx: number) => void;
  emptyAlertQueue: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alertQueue: [],
  pushAlertQueue: (message: string) => {
    set((state) => ({
      alertQueue: [{ message }, ...state.alertQueue],
    }));
  },

  shiftAlertQueue: () =>
    set((state) => ({
      alertQueue: state.alertQueue.filter((item, idx) => (idx !== state.alertQueue.length - 1 ? item : null)),
    })),

  deleteAlertQueue: (index: number) =>
    set((state) => ({
      alertQueue: state.alertQueue.filter((item, idx) => (idx !== index ? item : null)),
    })),

  emptyAlertQueue: () => set({ alertQueue: [] }),
}));
