import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  size: 30 | 40 | 50;
  imgUrl: string;
}

export const PizzaImage: React.FC<Props> = (props) => {
  const { className, imgUrl, size } = props;
  return (
    <div
      className={cn(
        "w-[450px] h-[450px] relative flex items-center justify-center",
        className
      )}
    >
      <img
        className={cn("transition-all", {
          "w-[220px] h-[220px]": size === 30,
          "w-[330px] h-[330px]": size === 40,
          "w-[440px] h-[440px]": size === 50,
        })}
        src={imgUrl}
        alt=""
      />
      <div className="absolute inset-2 border-dashed border-1 rounded-full "></div>
      <div className="absolute inset-15 border-dashed border-1 rounded-full "></div>
    </div>
  );
};
