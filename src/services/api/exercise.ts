import { axiosProtectedInstance } from "@/lib/axios/axios-protected";

import type { ExerciseType } from "@/types";

export const createExerciseApi = async (
  exerciseData: Omit<ExerciseType, "id">
) => await axiosProtectedInstance.post("/exercise", exerciseData);
