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
import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { CheckCircle, LoaderCircle, X, XCircle } from "lucide-react";
import { Debtor } from "@/app/@types/debtor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bill } from "@/app/@types/bill";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { Button } from "@/components/ui/button";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";
import { CreateBillModal } from "./components/CreateBillModal";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditBillModal } from "./components/EditBillModal";

export default function Bills() {
  const alert = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [debtors, setDebtors] = useState([] as Debtor[]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);
  const [bills, setBills] = useState([] as Bill[]);
  const api = useApi();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const debtors = await api.findDebtorFromUser();
      setDebtors(debtors);
    };
    if (loading) fetchData();
    if (selectedOption) findBills();
    setLoading(false);
  });

  const handleChangeValue = (value: any) => {
    setSelectedOption(value);
    const selected = debtors.find((debtor) => debtor.id === value);
    if (selected) setSelectedDebtor(selected);
  };

  const findBills = async () => {
    const query_bills = await api.findBillsFromDebtor(selectedOption);
    setBills(query_bills);
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
        <CreateBillModal debtorId={selectedOption} />
      </div>

      <div className="w-full flex justify-normal items-center gap-4 flex-wrap mt-10">
        <Table>
          <TableCaption>Invoices from {selectedDebtor?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="max-w-[300px]">Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {bills.length >= 1 &&
            bills.map((bill) => (
              <TableRow>
                <TableCell>{dateFormatter(bill.created_at)}</TableCell>
                <TableCell
                  className="line-clamp-1 max-w-[300px]"
                  title={bill.description}
                >
                  {bill.description}
                </TableCell>
                <TableCell className="text-right">
                  {priceFormatter(bill.value)}
                </TableCell>
                <TableCell>{bill.active ? "Pending" : "Paid"}</TableCell>
                <TableCell>
                  <EditBillModal bill={bill}/>
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </div>
    </ScrollArea>
  );
}
