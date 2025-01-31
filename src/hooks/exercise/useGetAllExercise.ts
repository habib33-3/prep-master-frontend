import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { exerciseKey } from "@/constants";
import { getAllExercisesApi } from "@/services/api/exercise";

const useGetAllExercise = () => {
  const [searchParams] = useSearchParams();

  const pageNo = Number(searchParams.get("pageNo")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchText = searchParams.get("searchText") ?? "";

  const {
    data: exercises,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [exerciseKey, pageNo, pageSize, searchText],
    queryFn: async () =>
      await getAllExercisesApi({
        pageNo,
        pageSize,
        searchText,
      }),
  });

  return {
    exercises,
    isError,
    isLoading,
  };
};

export default useGetAllExercise;
