import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { exerciseKey } from "@/constants";
import { updateExerciseApi } from "@/services/api/exercise";

// Update the schema to make fields optional
const UpdateExerciseFormSchema = z.object({
  questionText: z.string().min(1, "Question text is required").optional(), // Optional
  answerText: z.string().min(1, "Answer text is required").optional(), // Optional
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(), // Optional
  topicName: z.string().min(1, "Topic name is required").optional(), // Optional
  tagList: z
    .union([
      z.string(), // Allow a string (comma-separated)
      z.array(z.string()), // Or an array of strings
    ])
    .transform(
      (tagList) =>
        // Normalize into an array of trimmed strings
        typeof tagList === "string"
          ? tagList
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "") // Filter out empty strings
          : tagList.map((tag) => tag.trim()) // For array, just trim each element
    )
    .optional(), // Optional
});

const useUpdateExerciseForm = (
  existingExercise?: z.infer<typeof UpdateExerciseFormSchema>
) => {
  const navigator = useNavigate();

  const form = useForm<z.infer<typeof UpdateExerciseFormSchema>>({
    resolver: zodResolver(UpdateExerciseFormSchema),
    defaultValues: existingExercise || {
      questionText: "",
      answerText: "",
      difficulty: "EASY",
      topicName: "",
      tagList: [],
    },
  });

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async ({
      id,
      ...values
    }: z.infer<typeof UpdateExerciseFormSchema> & { id: string }) =>
      await updateExerciseApi(id, values), // Use update API
    mutationKey: [exerciseKey],
    onError: () => {
      toast.error("Failed to update exercise");
    },
    onSuccess: () => {
      toast.success("Exercise updated successfully");

      form.reset(); // Clear the form after successful submission
      navigator("/");
    },
  });

  const handleUpdateExercise = (
    id: string,
    values: z.infer<typeof UpdateExerciseFormSchema>
  ) => {
    mutate({ id, ...values }); // Include id in the payload
  };

  return {
    form,
    handleUpdateExercise,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
};

export default useUpdateExerciseForm;
