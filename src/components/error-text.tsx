import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  text: string;
}

export const ErrorText: React.FC<Props> = (props) => {
  const { className, text } = props;
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
