import type { Dispatch, SetStateAction } from "react";

import { XIcon } from "lucide-react";

import { type ExerciseType } from "@/types";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  answer: ExerciseType;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AnswerModal = ({ answer, setIsModalOpen }: Props) => {
  const { answerText, questionText, topicName, tagList: tags } = answer;

  const onDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="mx-auto max-w-md rounded-lg border shadow-lg">
        <CardHeader className="flex items-start justify-between border-b p-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {topicName}
          </CardTitle>
          <Button
            variant="ghost"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={onDelete}
          >
            <XIcon className="size-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          <div className="mb-4">
            <p className="font-medium text-gray-700">Question:</p>
            <p className="text-gray-900">{questionText}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Answer:</p>
            <p className="text-gray-900">{answerText}</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 border-t p-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnswerModal;
