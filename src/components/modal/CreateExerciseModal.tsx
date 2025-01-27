import { useState } from "react";

import CreateExerciseForm from "../forms/CreateExerciseForm";
import { Button } from "../ui/button";
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
      <DialogTrigger className="my-6">
        <Button variant={"secondary"}> Add Question</Button>
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
