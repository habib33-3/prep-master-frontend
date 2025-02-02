import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  UpdateExerciseFormSchema,
  type UpdateExerciseFormValues,
} from "@/types/validation-schema";

import useGetSingleExercise from "./useGetSingleExercise";
import { useUpdateExerciseMutation } from "./useUpdateExerciseMutation";

const useUpdateExerciseForm = (id: string) => {
  const navigate = useNavigate();
  const { exercise } = useGetSingleExercise(id);

  // Use optional chaining and default values directly
  const form = useForm<UpdateExerciseFormValues>({
    resolver: zodResolver(UpdateExerciseFormSchema),
    defaultValues: {
      questionText: exercise?.questionText ?? "",
      answerText: exercise?.answerText ?? "",
      difficulty: exercise?.difficulty ?? "EASY",
      topicName: exercise?.topicName ?? "",
      tagList: exercise?.tagList ?? [],
    },
  });

  const { mutate, isPending, isError, isSuccess, error, data } =
    useUpdateExerciseMutation(() => {
      navigate("/"); // Navigate after successful mutation
    });

  const handleUpdateExercise = (values: UpdateExerciseFormValues) => {
    const updatedValues = {
      questionText: values.questionText ?? exercise?.questionText,
      answerText: values.answerText ?? exercise?.answerText,
      difficulty: values.difficulty ?? exercise?.difficulty,
      topicName: values.topicName ?? exercise?.topicName,
      tagList: values.tagList?.length ? values.tagList : exercise?.tagList,
    };

    mutate({ id, ...updatedValues });
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
