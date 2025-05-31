import { PizzaSize, PizzaType, Variant } from "@/@types/pizza";
import { getPizzaSize } from "@/lib/get-pizza-size";
import { Variation } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  filteredPizzaSizes: Variant[];
  setSelectedIngredients: (id: number) => void;
}

export const usePizzaOptions = (
  variants: Variation[],
  pizzaSizes: Variant[]
): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
    new Set<number>([])
  );
  const filteredPizzaSizes = getPizzaSize(type, variants, pizzaSizes);

  React.useEffect(() => {
    const isPizza = filteredPizzaSizes.find((el) => !el.disabled);

    if (isPizza) {
      setSize(+isPizza.value as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setType,
    setSize,
    filteredPizzaSizes,
    selectedIngredients,
    setSelectedIngredients,
  };
};
