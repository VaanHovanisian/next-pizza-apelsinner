"use client";
import React from "react";
import { Button, Title } from "./ui";
import { Ingredient, Variation } from "@prisma/client";
import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { PizzaVariants } from "./pizza-variants";
import { PizzaSize, PizzaType } from "@/@types/pizza";
import { pizzaSizes, pizzaTypes } from "@/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { calcPizzaPrice } from "@/lib/calc-pizza-price";
import { usePizzaOptions } from "@/hooks/pizza-options";

interface Props {
  className?: string;
  imgUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: Variation[];
  addToBasket: (variantId:number, ingredients:number[]) => void;
}

export const PizzaForm: React.FC<Props> = (props) => {
  const { className, imgUrl, name, variants, ingredients, addToBasket } = props;

  const {
    size,
    type,
    setSize,
    setType,
    filteredPizzaSizes,
    selectedIngredients,
    setSelectedIngredients,
    activeVariantId,
  } = usePizzaOptions(variants, pizzaSizes);

  const addProduct = () => {
    if (activeVariantId) {
      addToBasket(activeVariantId, Array.from(selectedIngredients));
    }
  };

  const totalPrice = calcPizzaPrice(
    size,
    type,
    variants,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn("flex gap-5", className)}>
      <PizzaImage size={size} imgUrl={imgUrl} />
      <div className="grid bg-gray-200 w-full flex-1">
        <Title size={"m"} text={name} />
        <p className="text-gray-400 mb-5">Lorem, ipsum dolor.</p>
        <PizzaVariants
          className="mb-5"
          variants={filteredPizzaSizes}
          selectedValue={size.toString()}
          setSelectedValue={(value) => setSize(+value as PizzaSize)}
        />
        <PizzaVariants
          className="mb-5"
          variants={pizzaTypes}
          selectedValue={type.toString()}
          setSelectedValue={(value) => setType(+value as PizzaType)}
        />
        <ul className="grid grid-cols-3 ">
          {ingredients?.map((el) => (
            <IngredientItem
              key={el.id}
              name={el.name}
              imgUrl={el.imgUrl}
              price={el.price}
              checked={selectedIngredients.has(el.id)}
              onChecked={() => setSelectedIngredients(el.id)}
            />
          ))}
        </ul>
        <Button onClick={addProduct} className="mt-auto">
          В корзину {totalPrice} RUB
        </Button>
      </div>
    </div>
  );
};
