"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SquareMinus, SquarePlus } from "lucide-react";
import { useBasket } from "@/hooks/basket";

interface Props {
  className?: string;
  value: number;
  increment: () => Promise<void>;
  decrement: () => Promise<void>;
}

export const CountButton: React.FC<Props> = (props) => {
  const { className, decrement, increment, value } = props;
  const { isValidating } = useBasket();
  const [loading, setLoading] = React.useState(isValidating);

  const onIncrement = async () => {
    setLoading(true);
    await increment();
    setLoading(false);
  };

  const onDecrement = async () => {
    setLoading(true);
    await decrement();
    setLoading(false);
  };

  const isLoading = loading || isValidating;
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        className="cursor-pointer"
        onClick={onDecrement}
        disabled={value === 1 || isLoading}
      >
        <SquareMinus
          className={cn(
            "text-primary active:h-5",
            (value === 1 || isLoading) && "text-gray-200 pointer-events-none"
          )}
        />
      </button>
      <span>{value}</span>
      <button
        className="cursor-pointer"
        onClick={onIncrement}
        disabled={isLoading}
      >
        <SquarePlus
          className={cn(
            "text-primary active:h-5",
            isLoading && "text-gray-200 pointer-events-none"
          )}
        />
      </button>
    </div>
  );
};
