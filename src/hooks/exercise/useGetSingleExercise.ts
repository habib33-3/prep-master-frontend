import { useQuery } from "@tanstack/react-query";

import { exerciseKey } from "@/constants";
import { getSingleExercise } from "@/services/api/exercise";

const useGetSingleExercise = (id: string) => {
  const {
    data: exercise,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [exerciseKey, id],
    queryFn: async () => getSingleExercise(id),
  });

  return {
    exercise,
    isFetching,
    isError,
  };
};

export default useGetSingleExercise;
