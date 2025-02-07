import { type Dispatch, type SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Toolbox from "@/pages/HomePage/ExerciseCards/Toolbox";

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
  const { answerText, questionText, topicName, tagList, id } = answer;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger className="relative rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:to-gray-700 hover:shadow-xl">
        View Answer
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl rounded-2xl border-0 bg-white p-10 shadow-2xl backdrop-blur-sm">
        <DialogHeader className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
              {topicName}
            </span>
            <div className="relative">
              <Toolbox id={id} />
            </div>
          </div>
          <DialogTitle className="mt-4 text-3xl font-extrabold text-gray-900">
            {questionText}
          </DialogTitle>
        </DialogHeader>

        <CardContent className="mb-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Solution</h3>
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {answerText}
          </p>
        </CardContent>

        {tagList.length > 0 && (
          <CardFooter className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-1 text-sm font-medium text-blue-800 shadow transition-all duration-300 hover:scale-105 hover:shadow-md"
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
