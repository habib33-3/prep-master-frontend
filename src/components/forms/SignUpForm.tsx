import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import PasswordField from "./PasswordField";

const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(3, { message: "Email must be at least 3 characters long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      console.log("Form data:", values);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="space-y-4"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <PasswordField form={form} />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
