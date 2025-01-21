import { useState } from "react";

import ExerciseCard from "@/components/cards/ExerciseCard";

import { type ExerciseType } from "@/types";

const ExerciseCards = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const data: ExerciseType[] = [
    {
      id: "63f9a7d2e3b0c62e1f98d9a1",
      questionText: "What is the difference between JavaScript and TypeScript?",
      answerText:
        "JavaScript is a scripting language, while TypeScript is a superset of JavaScript that adds static typing.",
      difficulty: "MEDIUM",
      topicName: "Programming Languages",
      tagList: ["JavaScript", "TypeScript", "Programming", "Frontend"],
      createdBy: "creator@example.com",
    },
    {
      id: "63f9a7d2e3b0c62e1f98d9a2",
      questionText: "What is the purpose of the `useState` hook in React?",
      answerText:
        "`useState` is a React hook that allows you to add state to a functional component.",
      difficulty: "EASY",
      topicName: "React",
      tagList: ["React", "Frontend", "Hooks"],
      createdBy: "creator@example.com",
    },
    {
      id: "63f9a7d2e3b0c62e1f98d9a3",
      questionText: "Explain the difference between SQL and NoSQL databases.",
      answerText:
        "SQL databases use structured query language and are table-based, while NoSQL databases are schema-less and can store data as key-value pairs, documents, or graphs.",
      difficulty: "MEDIUM",
      topicName: "Databases",
      tagList: ["SQL", "NoSQL", "Backend", "Databases"],
      createdBy: "creator@example.com",
    },
    {
      id: "63f9a7d2e3b0c62e1f98d9a4",
      questionText: "What is the difference between `let`, `const`, and `var`?",
      answerText:
        "`let` and `const` are block-scoped, while `var` is function-scoped. `const` is used for constants and cannot be reassigned, whereas `let` can be.",
      difficulty: "EASY",
      topicName: "JavaScript",
      tagList: ["JavaScript", "Variables", "Programming"],
      createdBy: "creator@example.com",
    },
    {
      id: "63f9a7d2e3b0c62e1f98d9a5",
      questionText: "What is the role of middleware in Express.js?",
      answerText:
        "Middleware in Express.js are functions that execute during the lifecycle of a request to the server. They can modify the request and response objects or end the request-response cycle.",
      difficulty: "MEDIUM",
      topicName: "Node.js",
      tagList: ["Node.js", "Express", "Backend"],
      createdBy: "creator@example.com",
    },
  ];

  return (
    <main>
      <div className="grid grid-cols-3 items-center justify-center">
        {data.map((exercise) => (
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
