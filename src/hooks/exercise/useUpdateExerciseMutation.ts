import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type UpdateExerciseFormValues } from "@/types/validation-schema";

import { exerciseKey } from "@/constants";
import { updateExerciseApi } from "@/services/api/exercise";

export const useUpdateExerciseMutation = (
  onSuccess?: () => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: async ({
      id,
      ...values
    }: UpdateExerciseFormValues & { id: string }) => {
      await updateExerciseApi(id, values);
    },
    mutationKey: [exerciseKey],
    onSuccess: () => {
      toast.success("Exercise updated successfully");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to update exercise");
      onError?.();
    },
  });
