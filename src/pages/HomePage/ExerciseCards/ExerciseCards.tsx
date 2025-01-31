import { useState } from "react";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import ExerciseCard from "@/cards/ExerciseCard";

import type { ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const { exercises, isError, isLoading } = useGetAllExercise();

  if (isError) {
    return <p>error</p>;
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  const exerciseList = (exercises as ExerciseType[]) || [];

  if (exerciseList.length === 0) {
    return <p className="text-center text-gray-500">No exercises available</p>;
  }

  return (
    <main>
      <div className="grid grid-cols-3 items-center justify-center">
        {exerciseList.map((exercise: ExerciseType) => (
          <ExerciseCard
            key={exercise.id}
            questionData={exercise}
            isModalOpen={openModalId === exercise.id}
            setOpenModalId={setOpenModalId}
          />
        ))}
      </div>
    </main>
  );
};

export default ExerciseCards;
