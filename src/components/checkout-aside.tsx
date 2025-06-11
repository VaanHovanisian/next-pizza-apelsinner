"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { WhiteBox } from "./white-box";
import { CheckoutItemDetails } from "./checkout-item-details";
import { Package, Percent, Truck } from "lucide-react";
import { Button } from "./ui";
import { useBasket } from "@/hooks/basket";

interface Props {
  className?: string;
}
const TAX = 15;
const DELIVARY = 250;
export const CheckoutAside: React.FC<Props> = (props) => {
  const { className } = props;
  const { totalAmount } = useBasket();
  const taxPrice = (totalAmount / 100) * TAX;
  const totalPrice = taxPrice + totalAmount + DELIVARY;
  return (
    <WhiteBox className={cn("", className)}>
      <div>
        <span className="font-bold text-2xl">Итого: </span>
        <span className="font-bold">{totalPrice}</span>
      </div>
      <CheckoutItemDetails
        icon={<Package className="text-gray-400" size={18} />}
        title={"Стоимость корзины:"}
        value={totalAmount + " rub"}
      />
      <CheckoutItemDetails
        icon={<Percent className="text-gray-400" size={18} />}
        title={"Налоги:"}
        value={taxPrice + " rub"}
      />
      <CheckoutItemDetails
        icon={<Truck className="text-gray-400" size={18} />}
        title={"Доставка:"}
        value={DELIVARY + " rub"}
      />
      <Button className="w-full h-14 rounded-2xl mt-6 font-bold text-base">
        Перейти к оплате
      </Button>
    </WhiteBox>
  );
};
