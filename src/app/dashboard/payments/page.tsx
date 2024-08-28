"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { LoaderCircle, Trash } from "lucide-react";
import { Debtor } from "@/app/@types/debtor";
import { Bill } from "@/app/@types/bill";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { dateFormatter } from "@/app/utils/dateFormatter";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreatePaymentModal } from "./components/CreatePaymentModal";
import { Payment } from "@/app/@types/payment";
import { Button } from "@/components/ui/button";
import { ConfirmDeletePaymentModal } from "./components/ConfirmDeletePaymentModal";

export default function Payments() {
  const [loading, setLoading] = useState(true);
  const [debtors, setDebtors] = useState([] as Debtor[]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);
  const [payments, setPayments] = useState([] as Payment[]);
  const api = useApi();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const debtors = await api.findDebtorFromUser();
      setDebtors(debtors);
    };
    if (loading) fetchData();
    if (selectedOption) findPayments();
    setLoading(false);
  });

  const handleChangeValue = (value: any) => {
    setSelectedOption(value);
    const selected = debtors.find((debtor) => debtor.id === value);
    if (selected) setSelectedDebtor(selected);
  };

  const findPayments = async () => {
    const query_payments = await api.findPaymentsFromDebtor(selectedOption);
    setPayments(query_payments);
  };

  return loading ? (
    <ScrollArea className="px-4 py-2">
      <div className="h-[100vh] w-full items-center justify-center">
        <div>
          <LoaderCircle className="animate-spin w-full h-[10vh]" />
        </div>
      </div>
    </ScrollArea>
  ) : (
    <ScrollArea className="px-4 py-2">
      <div className="w-full flex">
        <Select
          value={selectedOption ? selectedOption : undefined}
          onValueChange={(value: any) => handleChangeValue(value)}
        >
          <SelectTrigger className=" w-[30%] mx-auto">
            <SelectValue placeholder="Select a Debtor" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Debtors</SelectLabel>
              {debtors.length >= 1 ? (
                debtors.map((debtor) => (
                  <SelectItem key={debtor.id} value={debtor.id!}>
                    {debtor.name}
                  </SelectItem>
                ))
              ) : (
                <div>Not found</div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <CreatePaymentModal debtorId={selectedOption} />
      </div>

      <div className="w-full flex justify-normal items-center gap-4 flex-wrap mt-10">
        <Table>
          <TableCaption>Invoices from {selectedDebtor?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {payments.length >= 1 &&
            payments.map((payment) => (
              <TableRow>
                <TableCell>{dateFormatter(payment.created_at)}</TableCell>
                <TableCell className="text-right">
                  {priceFormatter(payment.value)}
                </TableCell>
                <TableCell>
                  <ConfirmDeletePaymentModal id={payment.id!} />
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </div>
    </ScrollArea>
  );
}
