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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/app/hooks/useApi";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";

const CreateDebtorSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional(),
});

type CreateDebtorSchemaType = z.infer<typeof CreateDebtorSchema>;

export function CreateDebtorModal() {
  const alert = useContext(AlertContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDebtorSchemaType>({
    resolver: zodResolver(CreateDebtorSchema),
  });
  const api = useApi();

  const onSubmit = async (data: CreateDebtorSchemaType) => {
    try {
      const debtor = await api.registerDebtor(data);
      alert.alertEvent(Events.debtorCreated);
      console.log(debtor);
    } catch (error) {
      console.log(error);
      alert.alertEvent(Events.failedToCreateDebtor);
    }
  };

  useEffect(() => {
    if (errors.name || errors.phone || errors.email) {
      alert.alertEvent(Events.failedToCreateDebtor);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Debtor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Debtor</DialogTitle>
            <DialogDescription>
              Fill the form to create a new debtor
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Jhon Doe"
                className="col-span-3"
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                defaultValue="+55 11 99999-9999"
                className="col-span-3"
                {...register("phone")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue="john@doe.com"
                className="col-span-3"
                {...register("email")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Debtor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
