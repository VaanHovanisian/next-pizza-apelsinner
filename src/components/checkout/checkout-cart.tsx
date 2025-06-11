"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { WhiteBox } from "../white-box";
import { BasketCard } from "../basket-card";
import { getBasketCardDetails } from "@/lib/get-basket-card-details";
import { PizzaSize, PizzaType } from "@/@types/pizza";
import { useBasket } from "@/hooks/basket";

interface Props {
  className?: string;
}

export const CheckoutCart: React.FC<Props> = (props) => {
  const { className } = props;

  const { items, updateProduct, removeProduct } = useBasket();
  return (
    <WhiteBox className={cn("", className)} title="1. корзина">
      {items.map((el) => (
        <BasketCard
          key={el.id}
          type="checkout"
          imgUrl={el.imgUrl}
          name={el.name}
          price={el.price}
          details={getBasketCardDetails(
            el.pizzaType as PizzaType,
            el.pizzaSize as PizzaSize,
            el.ingredients
          )}
          quantity={el.quantity}
          onClickDecrement={() => updateProduct(el.id, el.quantity - 1)}
          onClickIncrement={() => updateProduct(el.id, el.quantity + 1)}
          onClickRemove={() => removeProduct(el.id)}
        />
      ))}
    </WhiteBox>
  );
};
