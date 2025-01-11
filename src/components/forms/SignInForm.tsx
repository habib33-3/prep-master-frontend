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

const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(3, { message: "Email must be at least 3 characters long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInFormSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Form submitted successfully!");
  };

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="space-y-4"
        >
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
          <PasswordField
            form={form}
            name="password"
          />

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

export default SignInForm;
