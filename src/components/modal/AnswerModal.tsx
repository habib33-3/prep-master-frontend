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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="relative mx-auto w-[600px] max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <Toolbox id={id} />

        <CardHeader className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {topicName}
          </CardTitle>
          <Button
            variant="ghost"
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <XIcon size={20} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <div>
            <p className="font-semibold text-gray-700">Question:</p>
            <p className="mt-2 text-lg text-gray-900">{questionText}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Answer:</p>
            <p className="mt-2 text-lg text-gray-900">{answerText}</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 border-t p-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700 shadow-sm transition duration-300 hover:bg-blue-200"
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
