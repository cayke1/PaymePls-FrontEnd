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

export function ConfirmDeleteDebtorModal({ id }: { id: string }) {
  const api = useApi();
  const alert = useContext(AlertContext);
  const handleDeleteDebtor = async () => {
    try {
      await api.deleteDebtor(id);
      alert.alertEvent(Events.debtorDeleted);
    } catch (error) {
      alert.alertEvent(Events.failedToDeleteDebtor);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-1 bg-transparent text-purple-700">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this debtor?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-4">
          <DialogClose>
            <Button className="bg-gray-600 hover:bg-gray-700 transition-all text-white">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleDeleteDebtor}
            className="bg-red-600 hover:bg-red-700 transition-all text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
