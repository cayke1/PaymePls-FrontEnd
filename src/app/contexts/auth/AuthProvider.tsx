"use client";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import { useRedirect } from "../../hooks/useRedirect";
import React, { useContext, useState } from "react";
import { Events } from "../alert/Events.enum";

interface AuthProviderProps {
  children: any;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const api = useApi();
  const [token, setToken] = useState<string | null>(null);
  const { to } = useRedirect();

  const signin = async (email: string, password: string) => {
    try {
      const data = await api.signIn({ email, password });
      persistToken(data.token);
      setToken(data.token);
      registerEvent(Events.loggedIn);
      return true;
    } catch (error) {
      return false;
    }
  };

  const persistToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    setToken(token);
  };

  const checkToken = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          const check = api.checkToken();
          if (!check) {
            localStorage.removeItem("token");
            registerEvent(Events.sessionExpired);
            setToken(null);
            to("/login");
          }
        } else {
          registerEvent(Events.sessionExpired);
          setToken(null);
          to("/login");
        }
      }
    } catch (error) {}
  };

  const signout = () => {
    registerEvent(Events.loggedOut);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    to("/");
  };

  const registerEvent = (event: Events) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eventAlert", event);
    }
  };

  return (
    <AuthContext.Provider value={{ signin, checkToken, signout, token }}>
      {children}
    </AuthContext.Provider>
  );
};