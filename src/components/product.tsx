"use client";
import React from "react";
import { PizzaForm, ProductForm } from "./";
import { ProductRelation } from "@/@types/prisma";
import { useBasket } from "@/hooks/basket";

interface Props {
  product: ProductRelation;
}

export const Product: React.FC<Props> = (props) => {
  const { product } = props;
  const isPizzaProduct = product.variants[0].pizzaType;
  const { addProduct } = useBasket();

  const onAddPizza = () => {
    addProduct({
      ingredients: product.ingredients.map((el) => el.id),
      variantId: product.variants[0].id,
    });
  };
  const onAddProduct = () => {
    addProduct({
      variantId: product.variants[0].id,
    });
  };
  if (isPizzaProduct) {
    return (
      <PizzaForm
        onSubmit={onAddPizza}
        imgUrl={product.imgUrl}
        name={product.name}
        variants={product.variants}
        ingredients={product.ingredients}
      />
    );
  }
  return (
    <ProductForm
      onSubmit={onAddProduct}
      imgUrl={product.imgUrl}
      name={product.name}
      price={product.variants[0].price}
    />
  );
};
