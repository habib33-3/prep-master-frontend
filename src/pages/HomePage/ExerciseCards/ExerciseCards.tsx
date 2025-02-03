import { useState } from "react";

import { useSearchParams } from "react-router";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import Pagination from "@/shared/Pagination";

import ExerciseCard from "@/cards/ExerciseCard";

import type { ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    items: exercises,
    totalPages,
    isError,
    isLoading,
  } = useGetAllExercise();

  const pageNo = Number(searchParams.get("pageNo")) || 1;

  // Function to update URL params and ensure pagination works correctly
  const updateSearchParams = (key: string, value: string | number) => {
    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams);

        if (value) {
          newParams.set(key, value.toString());
        } else {
          newParams.delete(key);
        }

        // Ensure page number is always present
        if (!newParams.has("pageNo")) {
          newParams.set("pageNo", "1");
        }

        return newParams;
      },
      { replace: true }
    );
  };

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

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={pageNo}
          onPageChange={(newPage: number) =>
            updateSearchParams("pageNo", newPage)
          }
        />
      </div>
    </main>
  );
};

export default ExerciseCards;
