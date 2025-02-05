import { ChevronDown } from "lucide-react";

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
      <FormItem className="my-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start">
          <FormLabel className="mb-2 text-base font-medium text-gray-700 sm:mb-0 sm:mr-4 sm:w-1/3 sm:pt-2">
            {label}
          </FormLabel>
          <div className="w-full sm:w-2/3">
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-5 text-base font-normal text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                  >
                    <span className="truncate">
                      {field.value || `Select ${label}`}
                    </span>
                    <ChevronDown className="ml-2 size-5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="mt-1 min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-2 border-blue-100 bg-white p-2 shadow-xl backdrop-blur-sm"
                >
                  {options.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => field.onChange(option)}
                      className="group relative m-1 cursor-pointer rounded-xl px-4 py-3 text-gray-700 transition-all hover:bg-blue-50/80 hover:shadow-sm hover:shadow-blue-100/50 focus:bg-blue-100/90 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-[0.98] active:shadow-inner data-[highlighted]:bg-blue-50/90 data-[highlighted]:shadow-inner"
                    >
                      <span className="relative z-10 transition-all duration-200 ease-out group-hover:translate-x-1">
                        {option}
                      </span>
                      <div className="absolute inset-0 h-full w-1.5 rounded-l-lg bg-blue-200 opacity-0 transition-opacity group-hover:opacity-100 group-data-[highlighted]:opacity-100" />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage className="mt-2 text-sm text-red-600" />
          </div>
        </div>
      </FormItem>
    )}
  />
);

export default DropdownFields;
