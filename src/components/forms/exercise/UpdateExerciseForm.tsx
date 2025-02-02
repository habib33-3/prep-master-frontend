import { useParams } from "react-router";

import useGetSingleExercise from "@/hooks/exercise/useGetSingleExercise";
import useUpdateExerciseForm from "@/hooks/exercise/useUpdateExercise";

import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

import DropdownFields from "@/shared/FormField/DropdownFields";
import TextInputField from "@/shared/FormField/TextInputField";

const UpdateExerciseForm = () => {
  const { id } = useParams(); // Get the exercise ID from the URL
  const { form, handleUpdateExercise, isPending } = useUpdateExerciseForm(
    id as string
  );
  const { exercise, isError, isFetching } = useGetSingleExercise(id as string);

  if (!id || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something Went wrong</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => handleUpdateExercise(values))}
      >
        {/* Reusable Fields */}
        <TextInputField
          name="questionText"
          label="Question"
          placeholder={exercise?.questionText}
          defaultValue={exercise?.questionText}
          control={form.control}
        />
        <TextInputField
          name="answerText"
          label="Answer"
          placeholder={exercise?.answerText}
          control={form.control}
        />
        <DropdownFields
          name="difficulty"
          label="Difficulty"
          options={["EASY", "MEDIUM", "HARD"]}
          control={form.control}
        />
        <TextInputField
          name="topicName"
          label="Topic"
          placeholder={exercise?.topicName}
          control={form.control}
        />
        <TextInputField
          name="tagList"
          label="Tags"
          placeholder={exercise?.tagList.join(", ")}
          control={form.control}
        />

        {/* Submit Button */}
        <div className="mt-4">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Exercise"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateExerciseForm;
