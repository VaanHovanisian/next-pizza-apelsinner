import {
  Cart,
  CartProduct,
  Ingredient,
  Product,
  Variation,
} from "@prisma/client";

export type BasketCardDTO = CartProduct & {
  ingredients: Ingredient[];
  variant: Variation & {
    product: Product;
  };
};

export interface BasketDTO extends Cart {
  products: BasketCardDTO[];
}
