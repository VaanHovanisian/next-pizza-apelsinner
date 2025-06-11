import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  title: string;
  value: string;
  icon: React.ReactNode;
}

export const CheckoutItemDetails: React.FC<Props> = (props) => {
  const { className, title, value, icon } = props;
  return (
    <div className={cn("flex items-end my-4", className)}>
      <span className="flex items-center gap-3 text-lg text-neutral-500">
        {icon}
        {title}
      </span>
      <span className="flex flex-1 border-neutral-200 border-dashed border-b"></span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};
