import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  CreateExerciseFormSchema,
  type CreateExerciseFormValues,
} from "@/types/validation-schema";

import { useCreateExerciseMutation } from "./useCreateExerciseMutation";

const useCreateExerciseForm = () => {
  const navigate = useNavigate();

  const form = useForm<CreateExerciseFormValues>({
    resolver: zodResolver(CreateExerciseFormSchema),
    defaultValues: {
      questionText: "",
      answerText: "",
      difficulty: "EASY",
      topicName: "",
      tagList: [],
    },
  });

  const { mutate, isPending, isError, isSuccess, error, data } =
    useCreateExerciseMutation(() => {
      form.reset();
      navigate("/");
    });

  const handleCreateExercise = (values: CreateExerciseFormValues) => {
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
