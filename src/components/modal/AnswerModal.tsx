import { type Dispatch, type SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { type ExerciseType } from "@/types";

import { CardContent, CardFooter } from "../ui/card";

type AnswerModalProps = {
  answer: ExerciseType;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AnswerModal = ({
  answer,
  isModalOpen,
  setIsModalOpen,
}: AnswerModalProps) => {
  const { answerText, questionText, topicName, tagList } = answer;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => setIsModalOpen(open)}
    >
      <DialogTrigger className="border-blue-600 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
        view answer
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-between text-2xl font-semibold text-gray-900">
            {topicName}
          </DialogTitle>
        </DialogHeader>

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

        {tagList.length > 0 && (
          <CardFooter className="flex flex-wrap gap-3 border-t p-6">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700 shadow-sm transition-colors duration-300 hover:bg-blue-200"
              >
                #{tag}
              </span>
            ))}
          </CardFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AnswerModal;
