"use client";
import { Bill } from "@/app/@types/bill";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";
import { useApi } from "@/app/hooks/useApi";
import { useRedirect } from "@/app/hooks/useRedirect";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [bills, setBills] = useState([] as Bill[]);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const alert = useContext(AlertContext);
  const redirect = useRedirect();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const bills = await api.findBillsFromDebtor(params.id);
        setBills(bills);
      } catch (error) {
        alert.alertEvent(Events.failedToFetchBills);
        redirect.to("/login");
      }
    };
    if (loading) fetchData();
    setLoading(false);
  });

  const handleCalculateTotal = () => {
    let total = 0;
    bills.forEach((bill) => {
      if (bill.active) total += bill.value;
    });
    return total;
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
    <ScrollArea className="md:px-4 py-2">
      <div className=" w-full h-full md:w-[80%] mx-auto border-2 px-1 py-2 flex justify-normal items-center gap-4 flex-wrap mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="max-w-[300px]">Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
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
              </TableRow>
            ))}

          <TableCaption>
            Total {priceFormatter(handleCalculateTotal())}
          </TableCaption>
        </Table>
      </div>
    </ScrollArea>
  );
}
