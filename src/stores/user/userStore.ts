import { create } from "zustand";

export interface UserProps {
  id: number;
  name: string;
  account: string;
}

export interface UserStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: -1,
    name: "",
    account: "",
  },

  setUser: (user: UserProps) => {
    set({ user });
  },

  deleteUser: () => {
    set({
      user: {
        id: -1,
        name: "",
        account: "",
      },
    });
  },
}));
