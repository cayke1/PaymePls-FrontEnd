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

  const handleSetPaid = async (billId: string | undefined) => {
    if (!billId) return console.error("Bill ID not found");
    const response = await api.setBillPaid(billId);
    if (response) {
      alert.alertEvent(Events.billPaid);
      findBills();
    }
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
      <div className="w-full">
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
                  <SelectItem key={debtor.id} value={debtor.id}>
                    {debtor.name}
                  </SelectItem>
                ))
              ) : (
                <div>Not found</div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex justify-normal items-center gap-4 flex-wrap mt-10">
        {bills.length
          ? bills.map((bill) => (
              <Card className="w-[350px]" key={bill.id}>
                <CardHeader>
                  <CardTitle>{priceFormatter(bill.value)}</CardTitle>
                  <CardDescription>{bill.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Bill created at {dateFormatter(bill.created_at)}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col justify-center gap-4">
                      <h4 className="font-bold text-xl">Status</h4>
                      {bill.active ? (
                        <div title="Not paid">
                          <XCircle className="text-red-500" />
                        </div>
                      ) : (
                        <div title="Paid">
                          <CheckCircle className="text-green-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 justify-center">
                      <h4 className="font-bold text-xl">Actions</h4>
                      <div className="flex gap-4">
                        <Button className="bg-gray-500 hover:bg-gray-700 text-white">
                          Edit
                        </Button>
                        {bill.active && (
                          <Button
                            onClick={() => handleSetPaid(bill.id)}
                            className="bg-green-500 hover:bg-green-700 text-white"
                          >
                            Mark as Paid
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          : ""}

        <Card className="">
          <CardHeader>
            <CardTitle>New</CardTitle>
            <CardDescription>
              Create new Bill for {selectedDebtor?.name}?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateBillModal debtorId={selectedOption} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
