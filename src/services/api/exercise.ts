import { axiosProtectedInstance } from "@/lib/axios/axios-protected";
import { axiosPublicInstance } from "@/lib/axios/axios-public";

import type { ExerciseType } from "@/types";

export const createExerciseApi = async (
  exerciseData: Omit<ExerciseType, "id">
) => await axiosProtectedInstance.post("/exercise", exerciseData);

export const getAllExercisesApi = async (): Promise<ExerciseType[]> => {
  const res = axiosPublicInstance.get("/exercise");

  return (await res).data.data.data;
};

export const updateExerciseApi = async (
  id: string,
  exercise: Partial<ExerciseType>
) => await axiosProtectedInstance.put(`/exercise/${id}`, exercise);

export const getSingleExercise = async (id: string): Promise<ExerciseType> => {
  const res = await axiosProtectedInstance.get(`/exercise/${id}`);

  return await res.data.data;
};
