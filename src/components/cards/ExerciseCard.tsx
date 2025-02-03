import { type Dispatch, type SetStateAction } from "react";

import Toolbox from "@/pages/HomePage/ExerciseCards/Toolbox";

import { type ExerciseType } from "@/types";

import AnswerModal from "../modal/AnswerModal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  questionData: ExerciseType;
  isModalOpen: boolean;
  setOpenModalId: Dispatch<SetStateAction<string | null>>;
};

const ExerciseCard = ({ questionData, isModalOpen, setOpenModalId }: Props) => {
  const { id, questionText, topicName } = questionData;

  return (
    <div className="relative">
      <Card className="relative mx-auto flex h-[260px] w-full max-w-sm flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        {/* Category Badge - Positioned at top-left */}
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
            {topicName}
          </Badge>
        </div>

        {/* Toolbox for actions */}
        <Toolbox id={id} />

        <CardHeader className="flex flex-col items-center">
          <CardContent className="flex grow items-center justify-center">
            <CardTitle className="line-clamp-3 text-center text-lg font-semibold leading-snug text-gray-900">
              {questionText}
            </CardTitle>
          </CardContent>
        </CardHeader>

        {/* Footer with "View Answer" Button */}
        <CardFooter className="mt-2 flex justify-center">
          <Button
            onClick={() => setOpenModalId(id)}
            variant="outline"
            className="border-blue-600 text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            View Answer
          </Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <AnswerModal
          answer={questionData}
          setIsModalOpen={() => setOpenModalId(null)}
        />
      )}
    </div>
  );
};

export default ExerciseCard;
