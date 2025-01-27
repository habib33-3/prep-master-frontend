import { useQuery } from "@tanstack/react-query";

import { exerciseKey } from "@/constants";
import { getAllExercisesApi } from "@/services/api/exercise";

const useGetAllExercise = () => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [exerciseKey],
    queryFn: async () => await getAllExercisesApi(),
  });

  return {
    exercises,
    isError,
    isLoading,
  };
};

export default useGetAllExercise;
