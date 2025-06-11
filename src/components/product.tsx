"use client";
import React from "react";
import { PizzaForm, ProductForm } from "./";
import { ProductRelation } from "@/@types/prisma";
import { useBasket } from "@/hooks/basket";
import toast from "react-hot-toast";

interface Props {
  product: ProductRelation;
  onSubmit?: VoidFunction;
}

export const Product: React.FC<Props> = (props) => {
  const { product, onSubmit } = props;
  const isPizzaProduct = product.variants[0].pizzaType;
  const { addProduct, isValidating } = useBasket();

  const addToBasket = async (variantId?: number, ingredients?: number[]) => {
    try {
      const activeId = variantId ?? product.variants[0].id;
      await addProduct({ variantId: activeId, ingredients });
      toast.success("successfully added");
      onSubmit?.();
    } catch (error) {
      console.log(error);
      toast.error("not added");
    }
  };
  if (isPizzaProduct) {
    return (
      <PizzaForm
        loading={isValidating}
        imgUrl={product.imgUrl}
        name={product.name}
        variants={product.variants}
        ingredients={product.ingredients}
        addToBasket={addToBasket}
      />
    );
  }
  return (
    <ProductForm
      loading={isValidating}
      imgUrl={product.imgUrl}
      name={product.name}
      price={product.variants[0].price}
      addToBasket={addToBasket}
    />
  );
};
