import type { ButtonHTMLAttributes } from "react";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  title: string;
}

const LoadingButton = ({
  disabled = false,
  loading,
  title,
  className,
  type = "button",
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      className={cn("flex items-center", className)}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : title}
    </Button>
  );
};

export default LoadingButton;
