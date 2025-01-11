import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(3, { message: "Email must be at least 3 characters long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const useSignIn = () => {
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInFormSchema>) => {
    try {
      const { email, password } = values;

      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        "auth/invalid-email": "Invalid email address.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password.",
      };
      const errorMessage = errorMessages[error.code] || "Something went wrong.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    handleSignIn,
  };
};

export default useSignIn;
