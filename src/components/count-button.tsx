import React from "react";
import { cn } from "@/lib/utils";
import { SquareMinus, SquarePlus } from "lucide-react";

interface Props {
  className?: string;
  value: number;
  increment: () => void;
  decrement: () => void;
}

export const CountButton: React.FC<Props> = (props) => {
  const { className, decrement, increment, value } = props;
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button onClick={decrement} disabled={value === 1}>
        <SquareMinus
          className={cn(
            "text-primary active:h-5",
            value === 1 && "text-gray-200 pointer-events-none"
          )}
        />
      </button>
      <span>{value}</span>
      <button onClick={increment}>
        <SquarePlus className="text-primary active:h-5" />
      </button>
    </div>
  );
};
