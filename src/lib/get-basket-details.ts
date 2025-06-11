import { BasketDTO, IBasketCard } from "@/@types/basket";
import { calcBasketPrice } from "./calc-basket-price";

interface ReturnProps {
  items: IBasketCard[];
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

  const totalAmount = data?.products?.reduce((acc, el) => {
    return acc + calcBasketPrice(el);
  }, 0);

  return {
    items,
    totalAmount,
  };
};
