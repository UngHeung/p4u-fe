import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;
}

const initialUser = {
  id: -1,
  name: '',
  account: '',
};

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      user: initialUser,
      setUser: (user: UserProps) => set({ user }),
      deleteUser: () => set({ user: initialUser }),

      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),

      setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),
      isHydrated: false,
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
