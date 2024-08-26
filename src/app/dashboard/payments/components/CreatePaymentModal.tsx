import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ValueInput } from "../../bills/components/ValueInput";
import { useForm } from "react-hook-form";
import { useApi } from "@/app/hooks/useApi";
import { useContext, useState } from "react";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";
import { Payment } from "@/app/@types/payment";

interface CreatePaymentModalProps {
  debtorId: string | undefined;
}

export function CreatePaymentModal({ debtorId }: CreatePaymentModalProps) {
  const alert = useContext(AlertContext);
  const [valueInput, setValueInput] = useState<string>("");
  const {
    handleSubmit,
  } = useForm();
  const api = useApi();

  const onSubmit = async () => {
    if (!debtorId) return;
    const newData: Omit<Payment, "created_at"> = {
      value: parseFloat(valueInput.replace(/\./g, "").replace(",", ".")),
      debtorId,
    };
    try {
      await api.registerPayment(newData);
      alert.alertEvent(Events.billCreated);
    } catch (error) {
      alert.alertEvent(Events.failedToCreateBill);
    }
  };

  return debtorId ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Payment</DialogTitle>
            <DialogDescription>
              Fill the form to create a new payment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <div className="rounded-md border border-input flex justify-normal items-center gap-4 px-4 col-span-3">
                <span className="text-gray-500">R$</span>
                <ValueInput
                  id="value"
                  type="number"
                  className="w-[100%]"
                  onChangeFunction={(e) => {
                    setValueInput(e);
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    <Button disabled>Create Payment</Button>
  );
}
