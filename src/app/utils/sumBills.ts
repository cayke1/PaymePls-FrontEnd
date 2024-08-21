import { Bill } from "../@types/bill";

export function sumBills(bills: Bill[]): number {
  return bills.reduce((acc, bill) => acc + bill.value, 0);
}
