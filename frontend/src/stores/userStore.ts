import create from "zustand";

import { UserStore } from "./types";

let store = (set) => ({
  email: localStorage.getItem("email") || null,
  id: localStorage.getItem("userId") || null,
  authToken: localStorage.getItem("authToken") || null,
  isAuthenticated: localStorage.getItem("authToken") ? true : false,
  setEmail: (email) => set((state) => ({ email: email })),
  setId: (id) => set((state) => ({ id: id })),
  setAuthToken: (token) => set((state) => ({ authToken: token })),
  setIsAuthenticated: (value) => set((state) => ({ isAuthenticated: value })),
});

export const useUserStore = create<UserStore>()(store);
