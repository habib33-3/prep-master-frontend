import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { useAuth } from "@/providers/AuthProvider";

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

export const useSignUp = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSignUp = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      const { email, name, password } = values;

      await register(email, password, name);

      navigate("/");

      toast.success("Account created successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessages: Record<string, string> = {
        "auth/email-already-in-use": "Email is already in use.",
        "auth/weak-password": "Password is too weak.",
      };
      const errorMessage = errorMessages[error.code] || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return { form, handleSignUp };
};
