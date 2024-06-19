import { createContext } from "react";

export type AuthContextType = {
  signin: (email: string, password: string) => Promise<Boolean>;
  checkToken: () => void;
  signout: () => void;
  token: string | null;
};
export const AuthContext = createContext<AuthContextType>(null!);