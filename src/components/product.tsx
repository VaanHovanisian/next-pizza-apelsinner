"use client";
import React from "react";
import { PizzaForm, ProductForm } from "./";
import { ProductRelation } from "@/@types/prisma";

interface Props {
  product: ProductRelation;
}

export const Product: React.FC<Props> = (props) => {
  const { product } = props;
  const isPizzaProduct = product.variants[0].pizzaType;

  if (isPizzaProduct) {
    return (
      <PizzaForm
        imgUrl={product.imgUrl}
        name={product.name}
        variants={product.variants}
        ingredients={product.ingredients}
      />
    );
  }
  return (
    <ProductForm
      imgUrl={product.imgUrl}
      name={product.name}
      price={product.variants[0].price}
    />
  );
};
