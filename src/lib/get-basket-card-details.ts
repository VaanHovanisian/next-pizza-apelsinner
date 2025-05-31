import { IBasketCard } from "@/@types/basket";
import { PizzaSize, PizzaType } from "@/@types/pizza";
import { objPizzaTypes } from "@/constants/pizza";

export const getBasketCardDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: IBasketCard["ingredients"]
) => {
  const result = [];

  if (pizzaSize && pizzaType) {
    result.push(`${objPizzaTypes[pizzaType]} ${pizzaSize} см`);
  }

  if (ingredients.length > 0) {
    result.push(ingredients.map((el) => el.name).join(","));
  }

  return result.join(", ");
};
