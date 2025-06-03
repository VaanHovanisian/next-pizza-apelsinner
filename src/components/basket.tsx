"use client";
import React from "react";
import { Button, Sheet } from "./ui";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BasketCard } from "./basket-card";
import { getBasketCardDetails } from "@/lib/get-basket-card-details";
import { useBasket } from "@/hooks/basket";
import { PizzaSize, PizzaType } from "@/@types/pizza";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Basket: React.FC<Props> = (props) => {
  const { className, children } = props;
  const { items, totalAmount, updateProduct, removeProduct } = useBasket();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={cn("bg-gray-100 flex flex-col", className)}>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1">
          {items.map((el) => (
            <BasketCard
              key={el.id}
              name={el.name}
              imgUrl={el.imgUrl}
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
        </div>
        <SheetFooter className="bg-white p-3">
          <div className="flex items-end">
            <span>Итого: </span>
            <span className="border-dashed border-b-1 border-gray-400 flex-1"></span>
            <span className="font-bold">{totalAmount} ₽</span>
          </div>
          <div className="flex items-end">
            <span>Налог 5%: </span>
            <span className="border-dashed border-b-1 border-gray-400 flex-1"></span>
            <span className="font-bold">112 ₽</span>
          </div>
          <Button className="flex items-center gap-5">
            Оформить заказ <ArrowRight />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
