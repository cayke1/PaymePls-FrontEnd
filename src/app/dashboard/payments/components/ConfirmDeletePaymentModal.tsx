import { AlertContext } from "@/app/contexts/alert/AlertContext";
import { Events } from "@/app/contexts/alert/Events.enum";
import { useApi } from "@/app/hooks/useApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useContext } from "react";

export function ConfirmDeletePaymentModal({ id }: { id: string }) {
  const api = useApi();
  const alert = useContext(AlertContext);
  const handleDeletePayment = async () => {
    try {
      await api.deletePayment(id);
      alert.alertEvent(Events.paymentDeleted);
    } catch (error) {
      alert.alertEvent(Events.failedToDeletePayment);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-1 bg-transparent hover:bg-slate-600 text-white-700">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this payment?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-4">
          <DialogClose>
            <Button className="bg-gray-600 hover:bg-gray-700 transition-all text-white">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleDeletePayment}
            className="bg-red-600 hover:bg-red-700 transition-all text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
