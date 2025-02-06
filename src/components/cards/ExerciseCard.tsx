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
  const { id, questionText, topicName } = questionData;

  const [modal, setModal] = useState(false);

  return (
    <div className="relative">
      <Card className="relative mx-auto flex h-[260px] w-full max-w-sm flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <Badge className="absolute left-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
          {topicName}
        </Badge>

        <Toolbox id={id} />

        <CardHeader className="flex flex-col items-center">
          <CardContent className="flex grow items-center justify-center">
            <CardTitle className="line-clamp-3 text-center text-lg font-semibold leading-snug text-gray-900">
              {questionText}
            </CardTitle>
          </CardContent>
        </CardHeader>

        <CardFooter className="mt-2 flex justify-center">
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
