import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  UpdateExerciseFormSchema,
  type UpdateExerciseFormValues,
} from "@/types/validation-schema";

import { useUpdateExerciseMutation } from "./useUpdateExerciseMutation";

const useUpdateExerciseForm = (id: string) => {
  const navigate = useNavigate();

  const form = useForm<UpdateExerciseFormValues>({
    resolver: zodResolver(UpdateExerciseFormSchema),
    defaultValues: {
      questionText: "",
      answerText: "",
      difficulty: "EASY",
      topicName: "",
      tagList: [],
    },
  });

  const { mutate, isPending, isError, isSuccess, error, data } =
    useUpdateExerciseMutation(() => {
      form.reset();
      navigate("/");
    });

  const handleUpdateExercise = (values: UpdateExerciseFormValues) => {
    mutate({ id, ...values });
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
