import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation"; 

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filter {
  selectedIngredients: Set<string>;
  selectedSizes: Set<string>;
  selectedTypes: Set<string>;
  price: PriceProps;
}

interface ReturnProps extends Filter {
  setSelectedIngredients: (value: string) => void;
  setSelectedSizes: (value: string) => void;
  setSelectedTypes: (value: string) => void;
  setPrice: ({ priceFrom, priceTo }: PriceProps) => void;
  updatePrice: (name: keyof PriceProps, value: number) => void;
}

export const useFilter = (): ReturnProps => {
  const searchParams = useSearchParams();
  console.log(Array.from(searchParams));
   
const query = Object.fromEntries(Array.from(searchParams))

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: +query.priceFrom || undefined,
    priceTo: +query.priceTo || undefined
  });
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
    new Set<string>(query.ingredients?.split(",") || [])
  );
  const [selectedSizes, { toggle: setSelectedSizes }] = useSet(
    new Set<string>(query.sizes?.split(",") || [])
  );
  const [selectedTypes, { toggle: setSelectedTypes }] = useSet(
    new Set<string>(query.types?.split(",") || [])
  );

  return {
    setSelectedIngredients,
    setSelectedSizes,
    setSelectedTypes,
    setPrice,
    updatePrice,
    selectedIngredients,
    selectedSizes,
    selectedTypes,
    price,
  };
};
