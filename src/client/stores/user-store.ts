import { create } from 'zustand';

interface UserState {
  userName: string | null;
  setUserName: (name: string) => void;
  clearUserName: () => void;
}

export const useUserStore = create<UserState>(set => ({
  userName: null,
  setUserName: name => set({ userName: name }),
  clearUserName: () => set({ userName: null }),
}));
