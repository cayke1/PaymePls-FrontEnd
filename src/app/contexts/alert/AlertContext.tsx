import { createContext } from "react";
import { Events } from "./Events.enum";

export type AlertContextType = {
  registerEvent: (event: Events) => void;
  alertEvent: (event: Events) => void;
  getEvent: () => Events | undefined;
  confirm: (message: string) => Promise<boolean>;
};
export const AlertContext = createContext<AlertContextType>(null!);