"use client";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useApi } from "../hooks/useApi";
import { Debtor } from "../@types/debtor";
import { LoaderCircle } from "lucide-react";
import { Bill } from "../@types/bill";
import { priceFormatter } from "../utils/priceFormatter";
import { sumBills } from "../utils/sumBills";
import { IAllPayments } from "../@types/payment";
import { sumPayments } from "../utils/sumPayments";
import { AlertContext } from "../contexts/alert/AlertContext";
import { Events } from "../contexts/alert/Events.enum";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [debtors, setDebtors] = useState([] as Promise<Debtor>[]);
  const [payments, setPayments] = useState([] as IAllPayments[]);
  const [bills, setBills] = useState([] as Bill[]);
  const auth = useContext(AuthContext);
  const alert = useContext(AlertContext);
  const api = useApi();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      auth.checkToken();
      try {
        const debtors = await api.findDebtorFromUser();
        setDebtors(debtors);
        setBills(debtors.map((debtor: Debtor) => debtor.bills).flat());
      } catch (error) {
        console.error("Error fetching data", error);
        setDebtors([]);
        alert.alertEvent(Events.failedToFetchData);
      }
      try {
        const payments = await api.getAllPayments();
        setPayments(payments);
      } catch (error) {
        console.error("Error fetching data", error);
        setPayments([]);
        alert.alertEvent(Events.failedToFetchPayments);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("Payments \n\n\n\n  " + payments);

  const handleGetActiveBills = (): number => {
    const billsActive = bills.filter((bill) => bill.active === false);
    return sumBills(billsActive);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total In Bills
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      priceFormatter(sumBills(bills))
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Bills
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      priceFormatter(handleGetActiveBills())
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total in payments
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : payments.length >= 1 ? (
                      priceFormatter(sumPayments(payments))
                    ) : (
                      0
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Debtors
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      debtors.length
                    )}
                  </div>{" "}
                  {/* debtors */}
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>
                    You received {payments.length} payments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales payments={payments} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
