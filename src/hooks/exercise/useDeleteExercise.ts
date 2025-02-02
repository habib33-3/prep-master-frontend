import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { exerciseKey } from "@/constants";
import { deleteExercise } from "@/services/api/exercise";

const useDeleteExercise = (id: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => await deleteExercise(id),
    onError: () => {
      toast.error("Failed to delete exercise");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [exerciseKey] });
      toast.success("Exercise deleted successfully");
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
