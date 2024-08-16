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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValueInput } from "./ValueInput";
import { Bill } from "@/app/@types/bill";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { Events } from "@/app/contexts/alert/Events.enum";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { useApi } from "@/app/hooks/useApi";
import { format } from "date-fns";

const EditBillSchema = z.object({
  description: z.string().optional(),
  next_charge: z.string().optional(),
});

type EditBillSchemaType = z.infer<typeof EditBillSchema>;

export function EditBillModal({ bill }: { bill: Bill }) {
  const alert = useContext(AlertContext);
  const api = useApi();
  const [valueInput, setValueInput] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBillSchemaType>({
    resolver: zodResolver(EditBillSchema),
  });

  const onSubmit = async (data: EditBillSchemaType) => {
    const newData = {
      ...data,
      next_charge: data.next_charge
        ? new Date(data.next_charge)
        : bill.next_charge,
      value:
        valueInput != ""
          ? parseFloat(valueInput.replace(/\./g, "").replace(",", "."))
          : bill.value,
    };

    const response = await api.updateBill(bill.id!, newData);
    if (response) {
      alert.alertEvent(Events.billUpdated);
    }
  };

  const handleSetPaid = async (billId: string | undefined) => {
    if (!billId) return console.error("Bill ID not found");
    const response = await api.setBillPaid(billId);
    if (response) {
      alert.alertEvent(Events.billPaid);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-transparent hover:bg-transparent text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Bill</DialogTitle>
            <DialogDescription>Fill the form to edit bill</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={bill.description}
                className="col-span-3"
                {...register("description")}
              />
            </div>
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
                  defaultValue={bill.value}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="next_charge" className="text-right">
                Next charge
              </Label>
              <Input
                id="next_charge"
                type="date"
                defaultValue={format(bill.next_charge, "dd-MM-yyyy")}
                className="col-span-3"
                {...register("next_charge")}
              />
            </div>
          </div>
          <DialogFooter>
            {bill.active && (
              <Button
                onClick={() => handleSetPaid(bill.id)}
                className="bg-green-500 hover:bg-green-700 text-white"
              >
                Mark as Paid
              </Button>
            )}
            <Button type="submit">Save Bill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
