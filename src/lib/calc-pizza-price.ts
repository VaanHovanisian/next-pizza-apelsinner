import { PizzaSize, PizzaType } from "@/@types/pizza";
import { Ingredient, Variation } from "@prisma/client";

export const calcPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  variants: Variation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    variants.find((el) => el.pizzaType === type && el.size === size)?.price ||
    0;

  const totalIngredientsPrice = ingredients
    .filter((el) => selectedIngredients.has(el.id))
    .reduce((acc, el) => acc + el.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;
  return totalPrice;
};
