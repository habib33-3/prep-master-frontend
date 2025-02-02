import type { InputHTMLAttributes } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInputField = ({
  control,
  label,
  name = "",
  placeholder = "",
  defaultValue,
}: Props) => (
  <FormField
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextInputField;
