import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { exerciseKey } from "@/constants";
import { getAllExercisesApi } from "@/services/api/exercise";

const useGetAllExercise = () => {
  const [searchParams] = useSearchParams();

  // Apply defaults if search params are missing or invalid
  const pageNo = Number(searchParams.get("pageNo")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchText = searchParams.get("searchText")?.trim() ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: [exerciseKey, pageNo, pageSize, searchText],
    queryFn: () => getAllExercisesApi({ pageNo, pageSize, searchText }),
    // Ensures smooth pagination
    staleTime: 5000,
  });

  return {
    items: data?.items || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError,
  };
};

export default useGetAllExercise;
