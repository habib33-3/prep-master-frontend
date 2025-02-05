import { useState } from "react";

import CreateExerciseForm from "../forms/exercise/CreateExerciseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CreateExerciseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger className="my-6 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 font-medium text-white shadow-lg transition duration-300 hover:opacity-90 hover:shadow-xl">
        Add Question
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Exercise</DialogTitle>
          <DialogDescription>
            Add a new exercise to your collection.
          </DialogDescription>
        </DialogHeader>
        <CreateExerciseForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateExerciseModal;
