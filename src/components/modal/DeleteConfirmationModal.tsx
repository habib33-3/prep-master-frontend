import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";

type Props = {
  handleDelete: () => void;
};

const DeleteConfirmationModal = ({ handleDelete }: Props) => (
  <AlertDialog>
    <AlertDialogTrigger className="">
      <Trash2
        className="cursor-pointer text-red-700"
        size={20}
      />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this exercise?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Once deleted, the exercise and all
          associated data will be permanently removed.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-secondary-foreground text-primary-foreground">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="bg-destructive text-primary-foreground"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteConfirmationModal;
