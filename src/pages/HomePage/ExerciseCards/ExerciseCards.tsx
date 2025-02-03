import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import Pagination from "@/shared/Pagination";

import ExerciseCard from "@/cards/ExerciseCard";

import { SEARCH_PARAMS } from "@/constants";
import type { ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
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
    return <p className="text-center">Loading...</p>;
  }

  if (exercises.length === 0) {
    return <p className="text-center text-gray-500">No exercises available</p>;
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col flex-wrap items-center justify-center gap-5 sm:flex-row">
        {exercises.map((exercise: ExerciseType) => (
          <ExerciseCard
            key={exercise.id}
            questionData={exercise}
            isModalOpen={openModalId === exercise.id}
            setOpenModalId={setOpenModalId}
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
    </main>
  );
};

export default ExerciseCards;
