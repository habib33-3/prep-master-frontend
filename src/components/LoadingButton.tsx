import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  title?: string;
  children?: ReactNode;
}

const LoadingButton = ({
  disabled = false,
  loading,
  title,
  children,
  className,
  type = "button",
  ...props
}: Props) => (
  <Button
    {...props}
    className={cn(
      "flex items-center justify-center rounded-md px-4 py-2 font-medium transition-all",
      "w-full text-center focus:outline-none focus:ring-2 focus:ring-offset-2",
      disabled || loading
        ? "cursor-not-allowed bg-gray-400 text-gray-200"
        : "bg-blue-600 text-white hover:bg-blue-700",
      className
    )}
    disabled={disabled || loading}
    type={type}
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ) : (
      children || title
    )}
  </Button>
);

export default LoadingButton;
