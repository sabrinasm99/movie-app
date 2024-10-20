import { create } from "zustand";

export const useAccountStore = create((set) => ({
  accountId: localStorage.getItem("accountId") || "",
  updateAccountId: (newAccountId: string) => set({ accountId: newAccountId }),
}));
