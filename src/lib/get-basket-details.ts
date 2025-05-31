/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasketDTO } from "@/@types/basket";
import { calcBasketPrice } from "./calc-basket-price";

interface ReturnProps {
  items: any[];
  totalAmount: number;
}

export const getBasketDetails = (data: BasketDTO): ReturnProps => {
  const items = data?.products?.map((el) => ({
    id: el.id,
    name: el.variant.product.name,
    imgUrl: el.variant.product.imgUrl,
    price: calcBasketPrice(el),
    pizzaSize: el.variant.size,
    pizzaType: el.variant.pizzaType,
    ingredients: el.ingredients.map((item) => ({
      name: item.name,
      price: item.price,
    })),
    quantity: el.quantity,
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
