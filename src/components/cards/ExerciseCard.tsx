import { type Dispatch, type SetStateAction } from "react";

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
      <Card className="mx-auto w-full max-w-sm p-4">
        <CardHeader>
          <Badge className="w-max text-sm">{topicName}</Badge>
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-justify text-lg font-medium">
            {questionText}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => setOpenModalId(id)}
            variant="outline"
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
