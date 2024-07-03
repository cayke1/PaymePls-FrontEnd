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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/app/hooks/useApi";
import { useContext } from "react";
import { AlertContext } from "@/app/contexts/alert/AlertContext";

interface CreateBillModalProps {
  debtorId: string | undefined;
}
const CreateBillSchema = z.object({
  description: z.string(),
  value: z.string(),
  next_charge: z.string(),
});

type CreateBillSchemaType = z.infer<typeof CreateBillSchema>;

export function CreateBillModal({ debtorId }: CreateBillModalProps) {
  const alert = useContext(AlertContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBillSchemaType>({
    resolver: zodResolver(CreateBillSchema),
  });
  const api = useApi();

  const onSubmit = async (data: CreateBillSchemaType) => {
    const newData = {
        ...data,
        next_charge: new Date(data.next_charge),
        value: parseFloat(data.value),
        debtorId,
    }
  };

  return debtorId ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Bill</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Bill</DialogTitle>
            <DialogDescription>
              Fill the form to create a new bill
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue="Electricity Bill"
                className="col-span-3"
                {...register("description")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <div className="rounded-md border border-input flex justify-normal items-center gap-4 px-4 col-span-3">
                <span className="text-gray-500">$</span>
                <ValueInput
                  id="value"
                  type="number"
                  defaultValue="100"
                  className="w-[100%]"
                  {...register("value")}
                />
              </div>
              {errors.value && (
                <span className="text-red-500">{errors.value.message}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="next_charge" className="text-right">
                Next charge
              </Label>
              <Input
                id="next_charge"
                type="date"
                defaultValue="2021-09-15"
                className="col-span-3"
                {...register("next_charge")}
              />
              {errors.next_charge && (
                <span className="text-red-500">
                  {errors.next_charge.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Bill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    <Button disabled>Create Bill</Button>
  );
}
