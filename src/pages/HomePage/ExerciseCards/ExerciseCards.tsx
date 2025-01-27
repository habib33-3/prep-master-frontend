import { useState } from "react";

import useGetAllExercise from "@/hooks/exercise/useGetAllExercise";

import ExerciseCard from "@/components/cards/ExerciseCard";

import { type ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const { exercises, isError, isLoading } = useGetAllExercise();

  if (isError) {
    return <p>error</p>;
  }

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <main>
      <div className="grid grid-cols-3 items-center justify-center">
        {exercises?.map((exercise: ExerciseType) => (
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
