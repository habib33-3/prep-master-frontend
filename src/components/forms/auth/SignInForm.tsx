import { Form } from "react-router";

import useSignIn from "@/hooks/auth/useSignIn";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";

import PasswordField from "@/shared/FormField/PasswordField";

import GoogleLoginButton from "@/buttons/GoogleLoginButton";
import LoadingButton from "@/buttons/LoadingButton";

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
            type="submit"
            loading={form.formState.isSubmitting}
            title="Sign In"
          />
        </form>
      </Form>
      <GoogleLoginButton />
    </div>
  );
};

export default SignInForm;
