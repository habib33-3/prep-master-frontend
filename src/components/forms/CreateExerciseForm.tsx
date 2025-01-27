import useCreateExerciseForm from "@/hooks/exercise/useCreateExerciseForm";

import DropdownFields from "../shared/FormField/DropdownFields";
import TextInputField from "../shared/FormField/TextInputField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const CreateExerciseForm = () => {
  const { form, handleCreateExercise, isPending } = useCreateExerciseForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateExercise)}>
        {/* Reusable Fields */}
        <TextInputField
          name="questionText"
          label="Question"
          placeholder="What is Web?"
          control={form.control}
        />
        <TextInputField
          name="answerText"
          label="Answer"
          placeholder="The web is a network of websites."
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
          placeholder="Programming Basics"
          control={form.control}
        />
        <TextInputField
          name="tagList"
          label="Tags"
          placeholder="Enter tags (comma separated)"
          control={form.control}
        />

        {/* Submit Button */}
        <div className="mt-4">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Exercise"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateExerciseForm;
