import { create } from "zustand";

export const useSessionStore = create((set) => ({
  sessionId: localStorage.getItem("sessionId") || "",
  updateSessionId: (newSessionId: string) => set({ sessionId: newSessionId }),
}));
