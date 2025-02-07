import { useState } from "react";

import Toolbox from "@/pages/HomePage/ExerciseCards/Toolbox";

import { type ExerciseType } from "@/types";

import AnswerModal from "../modal/AnswerModal";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  questionData: ExerciseType;
};

const ExerciseCard = ({ questionData }: Props) => {
  const { id, questionText, topicName, difficulty } = questionData;
  const [modal, setModal] = useState(false);

  return (
    <div className="relative">
      <Card className="relative mx-auto flex h-auto w-full max-w-md flex-col rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
        {/* Topic Badge */}
        <div className="flex items-center justify-between">
          <Badge className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 shadow-md">
            {topicName}
          </Badge>
          <Toolbox id={id} />
        </div>

        <CardHeader className="mt-4 text-center">
          {/* Question Text */}
          <CardTitle className="line-clamp-3 text-lg font-semibold leading-snug text-gray-900">
            {questionText}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-3 flex flex-col items-center gap-3">
          {/* Difficulty Badge */}
          <Badge className="bg-purple-100 px-4 py-1 font-medium text-purple-700 shadow-sm">
            {difficulty}
          </Badge>
        </CardContent>

        <CardFooter className="mt-4 flex justify-center">
          <AnswerModal
            answer={questionData}
            isModalOpen={modal}
            setIsModalOpen={setModal}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExerciseCard;
