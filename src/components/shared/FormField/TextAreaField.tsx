import type { TextareaHTMLAttributes } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = ({
  control,
  label,
  name = "",
  placeholder = "",
  defaultValue,
  ...props
}: Props) => (
  <FormField
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            {...props}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextareaField;
