import React from "react";
import { Button } from "./ui";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Basket } from "./basket";

interface Props {
  className?: string;
}

export const BasketButton: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <Basket>
      <Button className={cn("group flex gap-[5px] text-[16px]", className)}>
        <span className={cn("flex items-center gap-[13px]")}>520 ₽</span>
        <span className="h-[25px] w-[1px] bg-[#fff]/25 font-bold "></span>
        <span className="relative">
          <span className="group-hover:opacity-0 transition-opacity flex items-center gap-1">
            <ShoppingCart /> 3
          </span>
          <ArrowRight
            size={16}
            className="absolute opacity-0 right-[20%] top-[50%] translate-y-[-50%] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </span>
      </Button>
    </Basket>
  );
};
