import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  name: string;
  label: string;
  options: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

const DropdownFields = ({ control, label, name, options }: Props) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {field.value || `Select ${label}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => field.onChange(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default DropdownFields;
