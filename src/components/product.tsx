"use client";
import React from "react";
import { PizzaForm, ProductForm } from "./";
import { ProductRelation } from "@/@types/prisma";
import { useBasket } from "@/hooks/basket";
import toast from "react-hot-toast";

interface Props {
  product: ProductRelation;
}

export const Product: React.FC<Props> = (props) => {
  const { product } = props;
  const isPizzaProduct = product.variants[0].pizzaType;
  const { addProduct } = useBasket();

  const onAddPizza = async (variantId: number, ingredients: number[]) => {
    try {
      await addProduct({ variantId, ingredients });
      toast.success("successfully added");
    } catch (error) {
      console.log(error);
      toast.error("not added");
    }
  };
  const onAddProduct = async () => {
    try {
      await addProduct({ variantId: product.variants[0].id });
      toast.success("successfully added");
    } catch (error) {
      console.log(error);
      toast.error("not added");
    }
  };
  if (isPizzaProduct) {
    return (
      <PizzaForm
        imgUrl={product.imgUrl}
        name={product.name}
        variants={product.variants}
        ingredients={product.ingredients}
        addToBasket={onAddPizza}
      />
    );
  }
  return (
    <ProductForm
      imgUrl={product.imgUrl}
      name={product.name}
      price={product.variants[0].price}
      addToBasket={onAddProduct}
    />
  );
};
