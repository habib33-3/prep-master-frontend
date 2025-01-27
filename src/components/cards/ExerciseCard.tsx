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
      <Card className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 p-4 shadow-lg">
        <Toolbox id={id} />

        <CardHeader>
          <Badge className="w-max bg-green-100 text-sm text-green-700">
            {topicName}
          </Badge>
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-justify text-lg font-medium text-gray-800">
            {questionText}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => setOpenModalId(id)}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
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
