import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { exerciseKey, SEARCH_PARAMS } from "@/constants";
import { getAllExercisesApi } from "@/services/api/exercise";

const useGetAllExercise = () => {
  const [searchParams] = useSearchParams();

  const pageNo = Number(searchParams.get(SEARCH_PARAMS.PAGE_NO)) || 1;
  const pageSize = Number(searchParams.get(SEARCH_PARAMS.PAGE_SIZE)) || 10;
  const searchText = searchParams.get(SEARCH_PARAMS.SEARCH_TEXT)?.trim() ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: [exerciseKey, pageNo, pageSize, searchText],
    queryFn: () => getAllExercisesApi({ pageNo, pageSize, searchText }),
    staleTime: 5000,
  });

  return {
    items: data?.items || [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    isError,
  };
};

export default useGetAllExercise;
