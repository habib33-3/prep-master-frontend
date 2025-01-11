import { useState } from "react";

// Import Path
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface PasswordFieldProps<T extends FieldValues> {
  form: { control: Control<T> }; // Generic control type
  name: Path<T>; // Add the `name` prop and ensure it matches the schema keys
}

const PasswordField = <T extends FieldValues>({
  form,
  name,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      control={form.control}
      name={name} // Use the name dynamically
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 cursor-pointer p-1 transition-opacity hover:opacity-70"
                title="Toggle Password Visibility"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
