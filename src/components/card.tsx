import { cn } from "@/lib/utils";
import { Plus, SlidersHorizontal } from "lucide-react";
import React from "react";
import { Button } from "./ui";
import { Ingredient } from "@prisma/client";
import Link from "next/link";

interface Props {
  id: number;
  className?: string;
  img: string;
  title: string;
  description: Ingredient[];
  price: number;
}

export const Card: React.FC<Props> = (props) => {
  const { className, img, title, description, price, id } = props;

  return (
    <div
      className={cn(
        " relative max w-[285px] flex flex-col items-start gap-[13px]",
        className
      )}
    >
      <Link className="absolute inset-0 z-1" href={`/product/${id}`} />
      <div className="rounded-2xl bg-[#fff7ee] mb-2 p-2 flex justify-center items-center relative">
        <img src={img} alt={title} width={285} height={259} />
        <button>
          <SlidersHorizontal
            size={20}
            className="absolute right-4 top-4 z-10 text-primary cursor-pointer"
          />
        </button>
      </div>
      <h3 className={cn("font-bold text-[22px]")}>{title}</h3>
      <p className={cn("text-[14px] text-[#b1b1b1] font-normal")}>
        {description.map((el) => el.name).join(",  ")}
      </p>
      <div className="flex items-center justify-between w-full">
        <span className={cn("font-bold text-[20px]")}>от {price} ₽</span>
        <Button className="z-1" variant="secondary">
          <Plus /> Добавить
        </Button>
      </div>
    </div>
  );
};
