import { search } from "@/services/products";
import { Product } from "@prisma/client";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

export const useSearchHeader = () => {
    const [searchValue, setSearchValue] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [focus, setFocus] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setClose();
  });

   useDebounce(async() => {
    setProducts(await search(searchValue) )
  },250, [searchValue]);

  const setClose = () => {
    setFocus(false);
    setSearchValue("");
  };

  return{
    products,
    focus,
    searchValue, 
    ref,
    setSearchValue,
    setClose,
    setFocus
  }
}
