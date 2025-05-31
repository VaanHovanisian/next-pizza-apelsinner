import { fetcher } from "@/lib/fetcher";
import { getBasketDetails } from "@/lib/get-basket-details";
import { ApiRouts } from "@/services/constants";
import useSWR from "swr";

interface ReturnProps {
  items: any[];
  totalAmount: number;
  error: boolean;
  isLoading: boolean;
  addProduct: (values: any) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  updateProduct: (id: number, quantity: number) => Promise<void>;
}

export const useBasket = (): ReturnProps => {
  const {
    data: basket,
    error,
    isLoading,
    mutate,
  } = useSWR(ApiRouts.BASKET, fetcher);

  const data =
    basket?.products?.length > 0
      ? getBasketDetails(basket)
      : { items: [], totalAmount: 0 };

  const addProduct = async (values: any) => {};
  const removeProduct = async (id: number) => {};
  const updateProduct = async (id: number, quantity: number) => {};

  return {
    items: data.items,
    totalAmount: data.totalAmount,
    error,
    isLoading,
    addProduct,
    removeProduct,
    updateProduct,
  };
};
