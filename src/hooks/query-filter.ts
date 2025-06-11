import qs from "qs";
import React from "react";
import { Filter } from "./filter";
import { useRouter } from "next/navigation";

export const useQueryFilter = (filter: Filter) => {
  const router = useRouter();
  React.useEffect(() => {
    const query = qs.stringify(
      {
        sizes: Array.from(filter.selectedSizes),
        types: Array.from(filter.selectedTypes),
        ingredients: Array.from(filter.selectedIngredients),
        ...filter.price,
      },
      { arrayFormat: "comma", encode: false }
    );
    router.push(`?${query}`, { scroll: false });
  }, [
    filter.price.priceFrom,
    filter.price.priceTo,
    filter.selectedSizes,
    filter.selectedTypes,
    filter.selectedIngredients,
  ]);
};
