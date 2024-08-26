import { Debtor } from "./debtor";

export interface Payment {
  id?: string;
  value: number;
  created_at: Date;
  debtorId: string;
}

export interface IAllPayments {
  id: string;
  value: number;
  created_at: Date;
  debtorId: string;
  Debtor: Debtor; 
}