import { IAllPayments, Payment } from "../@types/payment";

export function sumPayments(payments: IAllPayments[] | Payment[]): number {
  return payments.reduce((acc, payment) => acc + payment.value, 0);
}
