"use client";

import React from "react";
import { Title } from "./ui";
import { cn } from "@/lib/utils";
import { CountButton } from "./";
import { Trash2Icon } from "lucide-react";

interface Props {
  className?: string;
  imgUrl: string;
  name: string;
  price: number;
  details: string;
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
}

export const BasketCard: React.FC<Props> = (props) => {
  const {
    className,
    imgUrl,
    name,
    price,
    details,
    quantity,
    onClickDecrement,
    onClickIncrement,
  } = props;
  return (
    <div className={cn("flex items-start gap-4 p-4", className)}>
      <img src={imgUrl} alt={name} width={65} height={65} />
      <div className="flex flex-col flex-1">
        <div>
          <Title size="s" text={name} />
          <span className="text-gray-500">{details}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <CountButton
            value={quantity}
            increment={onClickIncrement}
            decrement={onClickDecrement}
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{price} ₽</span>
            <button>
              <Trash2Icon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
