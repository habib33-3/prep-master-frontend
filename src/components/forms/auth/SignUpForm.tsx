import { useSignUp } from "@/hooks/auth/useSignUp";

import {
  Form,
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

const SignUpForm = () => {
  const { form, handleSignUp } = useSignUp();

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="space-y-4"
        >
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
          <PasswordField
            form={form}
            name="password"
          />
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            title="Sign Up"
          />
        </form>
      </Form>
      <GoogleLoginButton />
    </div>
  );
};

export default SignUpForm;
