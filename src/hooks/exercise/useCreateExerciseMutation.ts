import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { CreateExerciseFormValues } from "@/types/validation-schema";

import { exerciseKey } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";
import { createExerciseApi } from "@/services/api/exercise";

export const useCreateExerciseMutation = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateExerciseFormValues) => {
      if (!user?.email) {
        throw new Error("User email is required");
      }
      return createExerciseApi({ ...values, createdBy: user.email });
    },
    mutationKey: [exerciseKey],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [exerciseKey],
      });
      toast.success("Exercise created successfully");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Something went wrong");
      onError?.();
    },
  });
};
