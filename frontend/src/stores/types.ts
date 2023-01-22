interface UserStore {
  email: string | null;
  id: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setId: (id: string) => void;
  setAuthToken: (token: string) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export type { UserStore };
