import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  name: string;
  imgUrl: string;
  price: number;
  checked: boolean;
  onChecked: (checked: boolean) => void;
}

export const IngredientItem: React.FC<Props> = (props) => {
  const { className, checked, imgUrl, name, onChecked, price } = props;
  return (
    <div
      onClick={() => onChecked(true)}
      className={cn(
        "flex relative flex-col items-center gap-4",
        checked && "border-1",
        className
      )}
    >
      {checked && <Check className="absolute top-2 right-2" />}
      <img src={imgUrl} alt={name} width={50} height={50} />
      <span>{name}</span>
      <span className="font-bold">{price}</span>
    </div>
  );
};
