import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { exerciseKey } from "@/constants";
import { deleteExercise } from "@/services/api/exercise";

const useDeleteExercise = (id: string) => {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => await deleteExercise(id),
    mutationKey: [exerciseKey, id],
    onError: () => {
      toast.error("Failed to update exercise");
    },
    onSuccess: () => {
      toast.success("Exercise updated successfully");
    },
  });

  const handleDeleteExercise = () => {
    mutate();
  };

  return {
    isPending,
    handleDeleteExercise,
  };
};

export default useDeleteExercise;
