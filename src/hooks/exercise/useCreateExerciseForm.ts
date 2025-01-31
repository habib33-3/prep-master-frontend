import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { exerciseKey } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";
import { createExerciseApi } from "@/services/api/exercise";

const CreateExerciseFormSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  answerText: z.string().min(1, "Answer text is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  topicName: z.string().min(1, "Topic name is required"),
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
    ),
});

const useCreateExerciseForm = () => {
  const navigator = useNavigate();

  const form = useForm<z.infer<typeof CreateExerciseFormSchema>>({
    resolver: zodResolver(CreateExerciseFormSchema),
    defaultValues: {
      questionText: "",
      answerText: "",
      difficulty: "EASY",
      topicName: "",
      tagList: [],
    },
  });

  const { user } = useAuth();

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async (values: z.infer<typeof CreateExerciseFormSchema>) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      await createExerciseApi({ ...values, createdBy: user?.email! }),
    mutationKey: [exerciseKey],
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      // Optionally handle success logic here (like clearing form or showing success message)
      toast.success("Exercise created successfully");

      form.reset(); // Clear the form after successful submission
      navigator("/");
    },
  });

  const handleCreateExercise = (
    values: z.infer<typeof CreateExerciseFormSchema>
  ) => {
    mutate(values);
  };

  return {
    form,
    handleCreateExercise,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
};

export default useCreateExerciseForm;
