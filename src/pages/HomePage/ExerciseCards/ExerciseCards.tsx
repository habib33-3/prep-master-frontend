import ExerciseCard from "@/components/cards/ExerciseCard";

import { type ExerciseType } from "@/types";

const ExerciseCards = () => {
  const data: ExerciseType = {
    id: "63f9a7d2e3b0c62e1f98d9a1",
    questionText: "What is the difference between JavaScript and TypeScript?",
    answerText:
      "JavaScript is a scripting language, while TypeScript is a superset of JavaScript that adds static typing.",
    difficulty: "MEDIUM",
    topicName: "Programming Languages",
    tagList: ["JavaScript", "TypeScript", "Programming", "Frontend"],
    createdBy: "creator@example.com",
  };

  return (
    <main>
      <div className="">
        <ExerciseCard questionData={data} />
      </div>
    </main>
  );
};
export default ExerciseCards;
