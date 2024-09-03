"use client";
import { Bill } from "@/app/@types/bill";
import { Payment } from "@/app/@types/payment";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";
import { useApi } from "@/app/hooks/useApi";
import { useRedirect } from "@/app/hooks/useRedirect";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { priceFormatter } from "@/app/utils/priceFormatter";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PageInfoPDF from "./components/PageInfoPDF";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
  const [bills, setBills] = useState([] as Bill[]);
  const [payments, setPayments] = useState([] as Payment[]);
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

      try {
        const payments = await api.findPaymentsFromDebtor(params.id);
        setPayments(payments);
      } catch (error) {
        console.log("error");
        alert.alertEvent(Events.failedToFetchPayments);
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
    payments.forEach((payment) => {
      total -= payment.value;
    });
    return total;
  };

  console.log(payments);

  return loading ? (
    <div className="px-4 py-2">
      <div className="h-[100vh] w-full items-center justify-center">
        <div>
          <LoaderCircle className="animate-spin w-full h-[10vh]" />
        </div>
      </div>
    </div>
  ) : (
    <div className="md:px-4 py-2 h-[100vh] overflow-y-scroll flex flex-col">
      <h1 className="text-center text-2xl">
        Total {priceFormatter(handleCalculateTotal())}
      </h1>

      <Button className="w-min ml-auto">
        <PDFDownloadLink
          document={
            <PageInfoPDF
              bills={bills}
              payments={payments}
              total={priceFormatter(handleCalculateTotal())}
            />
          }
          fileName={`${new Date(Date.now()).toDateString()}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Baixar PDF"
          }
        </PDFDownloadLink>
      </Button>

      <div className="w-full md:w-[80%] mx-auto border-2 px-1 py-2 flex justify-center items-center gap-4 flex-wrap mt-10">
        <h2 className="text-xl">Bills</h2>
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
        </Table>
      </div>
      <div className="w-full md:w-[80%] mx-auto border-2 px-1 py-2 flex justify-center items-center gap-4 flex-wrap mt-10">
        <h2 className="text-xl">Payments</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          {payments.length >= 1 &&
            payments.map((payment) => (
              <TableRow>
                <TableCell>{dateFormatter(payment.created_at)}</TableCell>

                <TableCell className="text-right">
                  {priceFormatter(payment.value)}
                </TableCell>
              </TableRow>
            ))}
        </Table>
      </div>
    </div>
  );
}
