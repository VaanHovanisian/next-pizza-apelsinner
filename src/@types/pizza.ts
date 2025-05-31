import { objPizzaSizes, objPizzaTypes } from "@/constants/pizza";

export type PizzaSize = keyof typeof objPizzaSizes;
export type PizzaType = keyof typeof objPizzaTypes;

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};
