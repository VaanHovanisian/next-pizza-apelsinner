"use client";
import React from "react";
import { Button, Sheet, Title } from "./ui";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BasketCard } from "./basket-card";
import { getBasketCardDetails } from "@/lib/get-basket-card-details";
import { useBasket } from "@/hooks/basket";
import { PizzaSize, PizzaType } from "@/@types/pizza";
import Image from "next/image";
import Link from "next/link";

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
            {items.length > 0 && (
              <>
                В корзине
                <span className="font-bold">{items.length} товара</span>
              </>
            )}
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full px-5 text-center gap-5">
            <Image src="/empty.png" alt="" width={100} height={100} />
            <Title size={"s"} text={"Корзина пустая"} />
            <p>добавте хотя бы один продукт, чтобы совершить заказ</p>
            <SheetClose className="flex items-center gap-4 bg-primary px-3 py-5 text-white rounded-2xl cursor-pointer">
              <ArrowLeft /> Вернуться назад
            </SheetClose>
          </div>
        )}
        {items.length > 0 && (
          <>
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
              <div className="flex items-end mb-3">
                <span>Налог 5%: </span>
                <span className="border-dashed border-b-1 border-gray-400 flex-1"></span>
                <span className="font-bold">112 ₽</span>
              </div>
              <Link
                href="/checkout"
                className="flex items-center gap-5 bg-primary px-4 py-3 rounded-2xl justify-center text-white "
              >
                Оформить заказ <ArrowRight />
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
