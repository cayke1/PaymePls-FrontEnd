import { IAllPayments } from "@/app/@types/payment";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecentSalesProps {
  payments: IAllPayments[];
}

export function RecentSales({ payments }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {payment.Debtor.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {payment.Debtor.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {payment.Debtor.email || "No email"}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {priceFormatter(payment.value)}
          </div>
        </div>
      ))}
    </div>
  );
}
