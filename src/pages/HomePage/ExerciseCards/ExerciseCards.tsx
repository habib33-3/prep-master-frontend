import { useCallback, useEffect } from "react";

import { useSearchParams } from "react-router";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import ErrorPage from "@/shared/Error/ErrorPage";
import LoadingPage from "@/shared/LoadingPage/LoadingPage";
import Pagination from "@/shared/Pagination";

import ExerciseCard from "@/cards/ExerciseCard";

import { SEARCH_PARAMS } from "@/constants";

const ExerciseCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(SEARCH_PARAMS.PAGE_NO)) || 1;

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
    const pageFromParams = Number(searchParams.get(SEARCH_PARAMS.PAGE_NO)) || 1;
    if (pageFromParams !== currentPage) {
      updateSearchParams(SEARCH_PARAMS.PAGE_NO, pageFromParams);
    }
  }, [searchParams, currentPage, updateSearchParams]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <LoadingPage />;
  if (exercises.length === 0)
    return (
      <div className="flex items-center justify-center text-gray-500">
        <p>No exercises available</p>
      </div>
    );

  return (
    <main className="space-y-8 p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            questionData={exercise}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(newPage: number) =>
            updateSearchParams(SEARCH_PARAMS.PAGE_NO, newPage)
          }
        />
      </div>
    </main>
  );
};

export default ExerciseCards;
