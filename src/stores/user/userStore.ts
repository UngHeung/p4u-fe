import { create } from 'zustand';

export interface UserProps {
  id: number;
  name: string;
  account: string;
}

export interface UserStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
  deleteUser: () => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const initialUser = {
  id: -1,
  name: '',
  account: '',
};

export const useUserStore = create<UserStore>(set => ({
  user: initialUser,
  setUser: (user: UserProps) => set({ user }),
  deleteUser: () => set({ user: initialUser }),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));
