import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface PasswordFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: { control: any };
}

const PasswordField: React.FC<PasswordFieldProps> = ({ form }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      control={form.control}
      name="password"
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
