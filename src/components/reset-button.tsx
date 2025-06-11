"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const ResetButton: React.FC<Props> = (props) => {
  const { className, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-2 top-50% translate-y-1/2 hover:opacity-100 opacity-50",
        className
      )}
    >
      <X size={20} />
    </button>
  );
};
