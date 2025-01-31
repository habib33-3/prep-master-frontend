import { z } from "zod";

export const CreateExerciseFormSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  answerText: z.string().min(1, "Answer text is required"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  topicName: z.string().min(1, "Topic name is required"),
  tagList: z.union([z.string(), z.array(z.string())]).transform((tagList) =>
    typeof tagList === "string"
      ? tagList
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
      : tagList.map((tag) => tag.trim())
  ),
});

export type CreateExerciseFormValues = z.infer<typeof CreateExerciseFormSchema>;

export const UpdateExerciseFormSchema = z.object({
  questionText: z.string().optional(),
  answerText: z.string().optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  topicName: z.string().optional(),
  tagList: z
    .union([z.string(), z.array(z.string())])
    .transform((tagList) =>
      typeof tagList === "string"
        ? tagList
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : tagList.map((tag) => tag.trim())
    )
    .optional(),
});

export type UpdateExerciseFormValues = z.infer<typeof UpdateExerciseFormSchema>;
