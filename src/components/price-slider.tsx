import React from "react";
import { DualRangeSlider } from "./ui";

interface Props {
  className?: string;
  value: number[];
  setValue: ([priceFrom, priceTo]: number[]) => void;
}

export const PriceSlider: React.FC<Props> = (props) => {
  const { className, value, setValue } = props;
  return (
    <DualRangeSlider
      className={className}
      onValueChange={setValue}
      value={value}
      min={0}
      max={5000}
      label={(value) => value}
      step={100}
    />
  );
};
