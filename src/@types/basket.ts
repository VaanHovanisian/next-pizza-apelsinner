import {
  Cart,
  CartProduct,
  Ingredient,
  Product,
  Variation,
} from "@prisma/client";

export interface IBasketCard {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  pizzaSize: number | null;
  pizzaType: number | null;
  ingredients: Array<{ name: string; price: number }>;
  quantity: number;
}

export type BasketCardDTO = CartProduct & {
  ingredients: Ingredient[];
  variant: Variation & {
    product: Product;
  };
};

export interface BasketDTO extends Cart {
  products: BasketCardDTO[];
}

export interface CreateBasketCardValues {
  ingredients?: number[];
  variantId: number;
}
