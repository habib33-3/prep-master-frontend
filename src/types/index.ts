export interface SuccessResponse<T> {
  status: number;
  message: string;
  path: string;
  data: T;
  timestamp: string;
}

export interface ExerciseType {
  id: string;
  questionText: string;
  answerText: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topicName: string;
  tagList: string[];
  createdBy: string;
}
