import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserProps {
  id: number;
  name: string;
  account: string;
  role: string;
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
  role: '',
  createdAt: '',
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
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error(error, '아직 정보를 불러오지 못했습니다.');
        } else {
          state?.setIsHydrated(true);
        }
      },
    },
  ),
);
