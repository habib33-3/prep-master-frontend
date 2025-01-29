import { axiosProtectedInstance } from "@/lib/axios/axios-protected";
import { axiosPublicInstance } from "@/lib/axios/axios-public";

import type { ExerciseType, PaginationInput } from "@/types";

export const createExerciseApi = async (
  exerciseData: Omit<ExerciseType, "id">
) => await axiosProtectedInstance.post("/exercise", exerciseData);

export const getAllExercisesApi = async ({
  pageNo = 1,
  pageSize = 10,
  searchText = "",
}: PaginationInput): Promise<{ data: ExerciseType[] }> => {
  try {
    const res = await axiosPublicInstance.get("/exercise", {
      params: {
        page: pageNo,
        pageSize,
        search: searchText,
      },
    });

    return {
      data: res.data.data.data,
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};

export const updateExerciseApi = async (
  id: string,
  exercise: Partial<ExerciseType>
) => await axiosProtectedInstance.put(`/exercise/${id}`, exercise);

export const getSingleExercise = async (id: string): Promise<ExerciseType> => {
  const res = await axiosProtectedInstance.get(`/exercise/${id}`);

  return res.data.data;
};

export const deleteExercise = async (id: string) =>
  await axiosProtectedInstance.delete(`/exercise/${id}`);
