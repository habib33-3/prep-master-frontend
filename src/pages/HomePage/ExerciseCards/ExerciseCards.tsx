import { useCallback, useEffect } from "react";

import { useSearchParams } from "react-router";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import Pagination from "@/shared/Pagination";

import ExerciseCard from "@/cards/ExerciseCard";

import { SEARCH_PARAMS } from "@/constants";
import type { ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = Number(searchParams.get(SEARCH_PARAMS.PAGE_NO)) || 1;

  const {
    items: exercises,
    totalPages,
    isError,
    isLoading,
  } = useGetAllExercise();

  const updateSearchParams = useCallback(
    (key: string, value: string | number) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(key, value.toString());
        return newParams;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    const newPageNo = Number(searchParams.get(SEARCH_PARAMS.PAGE_NO)) || 1;
    if (newPageNo !== pageNo) {
      updateSearchParams(SEARCH_PARAMS.PAGE_NO, newPageNo);
    }
  }, [searchParams, pageNo, updateSearchParams]);

  if (isError) {
    return <p className="text-center text-red-500">Error loading exercises</p>;
  }

  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (exercises.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        No exercises available
      </p>
    );
  }

  return (
    <main className="space-y-8 p-4 md:p-6">
      {/* Loading State */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex h-64 flex-col items-center justify-center space-y-4 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-xl font-medium">Failed to load exercises</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && exercises.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center space-y-4 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl font-medium">No exercises found</p>
        </div>
      )}

      {/* Success State */}
      {!isLoading && exercises.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exercises.map((exercise: ExerciseType) => (
              <ExerciseCard
                key={exercise.id}
                questionData={exercise}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={pageNo}
              onPageChange={(newPage: number) =>
                updateSearchParams(SEARCH_PARAMS.PAGE_NO, newPage)
              }
            />
          </div>
        </>
      )}
    </main>
  );
};

export default ExerciseCards;
