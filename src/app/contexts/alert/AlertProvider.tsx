"use client";
import { AlertContext } from "./AlertContext";
import { Toast } from "@/components/Toast";
import { Events } from "./Events.enum";
import Swal from "sweetalert2";

const alerts: {[key: string]: any} = {
  loggedIn: {
    icon: "success",
    title: "Bem vindo!",
  }
} as const;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const registerEvent = (event: string) => {
    persistEvent(event);
  };

  const alertEvent = (event: string) => {
    Toast.fire(alerts[event]);
    clearEvent();
  };

  const confirm = async (message: string) => {
    return Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      return result.isConfirmed;
    });
  };

  const persistEvent = (event: string) => {
    if (window) {
      localStorage.setItem("eventAlert", event);
    }
  };

  const getEvent = (): Events | undefined => {
    if (window) {
      const event = localStorage.getItem("eventAlert");
      return event as Events;
    }
    return undefined;
  };

  const clearEvent = () => {
    if (window) {
      localStorage.removeItem("eventAlert");
    }
  };
  return (
    <AlertContext.Provider
      value={{ registerEvent, alertEvent, getEvent, confirm }}
    >
      {children}
    </AlertContext.Provider>
  );
};
