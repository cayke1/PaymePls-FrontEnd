"use client";
import { AlertContext } from "./AlertContext";
import { Toast } from "@/components/Toast";
import { Events } from "./Events.enum";
import Swal from "sweetalert2";

const alerts: {[key: string]: any} = {
  loggedIn: {
    icon: "success",
    title: "Bem vindo!",
  },
  sessionExpired: {
    icon: "warning",
    title: "Sessão expirada",
  },
  loggedOut: {
    icon: "info",
    title: "Deslogado",
  },
  invalidCredentials: {
    icon: "error",
    title: "Credenciais inválidas",
  },
  billPaid: {
    icon: "success",
    title: "Conta paga",
  },
  billCreated: {
    icon: "success",
    title: "Conta criada",
  },
  failedToCreateBill: {
    icon: "error",
    title: "Falha ao criar conta",
  },
  billUpdated: {
    icon: "success",
    title: "Conta atualizada",
  },
  debtorCreated: {
    icon: "success",
    title: "Devedor criado",
  },
  failedToCreateDebtor: {
    icon: "error",
    title: "Falha ao criar devedor",
  },
  failedToFetchBills: {
    icon: "error",
    title: "Falha ao buscar contas",
  },
  failedToDeleteDebtor: {
    icon: "error",
    title: "Falha ao deletar devedor",
  },
  debtorDeleted: {
    icon: "success",
    title: "Devedor deletado",
  },
  failedToFetchPayments: {
    icon: "error",
    title: "Falha ao buscar pagamentos",
  },
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
