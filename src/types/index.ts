// Define the structure of ExerciseType
export type ExerciseType = {
  id: string;
  questionText: string;
  answerText: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topicName: string;
  tagList: string[];
  createdBy: string;
};

// Pagination input type for fetching exercises
export type PaginationInput = {
  searchText?: string;
  pageNo?: number;
  pageSize?: number;
};

// Response type for a successful API call
export type SuccessResponse<T> = {
  status: number;
  message: string;
  path: string;
  data: T;
  timestamp: string;
};

// Define the response format for the `getAllExercisesApi` API
export type PaginatedExerciseResponse = {
  items: ExerciseType[]; // The list of exercises for the current page
  totalPages: number; // The total number of pages available
};

// Define the response format for a single exercise
export type SingleExerciseResponse = {
  data: ExerciseType; // Single exercise object
};
