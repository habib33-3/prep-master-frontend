import type { Dispatch, SetStateAction } from "react";

import { XIcon } from "lucide-react";

import Toolbox from "@/pages/HomePage/ExerciseCards/Toolbox";

import { type ExerciseType } from "@/types";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AnswerModalProps = {
  answer: ExerciseType;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AnswerModal = ({ answer, setIsModalOpen }: AnswerModalProps) => {
  const { answerText, questionText, topicName, tagList: tags, id } = answer;

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="relative mx-auto w-[600px] overflow-hidden rounded-2xl border shadow-xl">
        <Toolbox id={id} />

        <CardHeader className="flex items-start justify-between border-b p-5">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {topicName}
          </CardTitle>
          <Button
            variant="ghost"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XIcon size={18} />
          </Button>
        </CardHeader>

        <CardContent className="overflow-x-auto p-5">
          <div className="mb-4 min-w-[500px]">
            <p className="font-medium text-gray-700">Question:</p>
            <p className="mt-1 text-gray-900">{questionText}</p>
          </div>
          <div className="min-w-[500px]">
            <p className="font-medium text-gray-700">Answer:</p>
            <p className="mt-1 text-gray-900">{answerText}</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 overflow-x-auto border-t p-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm"
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
