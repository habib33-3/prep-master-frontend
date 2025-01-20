import { type ExerciseType } from "@/types";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  questionData: ExerciseType;
}

const ExerciseCard = ({ questionData }: Props) => {
  const { questionText, topicName } = questionData;

  return (
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
        <Button variant="outline">View Answer</Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
