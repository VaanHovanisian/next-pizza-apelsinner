"use client";

import React from "react";
import { Title } from "./ui";
import { cn } from "@/lib/utils";
import { CountButton } from "./";
import { Trash2Icon, X } from "lucide-react";

interface Props {
  type?: "checkout" | "basket";
  className?: string;
  imgUrl: string;
  name: string;
  price: number;
  details: string;
  quantity: number;
  onClickIncrement: () => Promise<void>;
  onClickDecrement: () => Promise<void>;
  onClickRemove: () => Promise<void>;
}

export const BasketCard: React.FC<Props> = (props) => {
  const {
    type = "basket",
    className,
    imgUrl,
    name,
    price,
    details,
    quantity,
    onClickDecrement,
    onClickIncrement,
    onClickRemove,
  } = props;
  const [loading, setLoading] = React.useState(false);
  const removeProduct = async () => {
    setLoading(true);
    await onClickRemove();
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4",
        {
          "opacity-50 pointer-events-none": loading,
        },
        className
      )}
    >
      <img src={imgUrl} alt={name} width={65} height={65} />
      <div
        className={cn("flex justify-between flex-1", {
          "flex-col": type === "basket",
        })}
      >
        <div className={cn({ "flex-1": type === "checkout" })}>
          <Title size="s" text={name} />
          <span className="text-gray-500">{details}</span>
        </div>
        {type === "basket" && <hr className="my-2" />}
        <div className="flex flex-1 justify-between items-center">
          <CountButton
            value={quantity}
            increment={onClickIncrement}
            decrement={onClickDecrement}
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{price} ₽</span>
            <button className="cursor-pointer" onClick={removeProduct}>
              {type === "basket" ? <Trash2Icon /> : <X />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
