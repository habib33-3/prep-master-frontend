import useSignIn from "@/hooks/auth/useSignIn";

import LoadingButton from "../LoadingButton";
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

const SignInForm = () => {
  const { form, handleSignIn } = useSignIn();

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

          <LoadingButton
            loading={form.formState.isSubmitting}
            title="Sign In"
          />
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
