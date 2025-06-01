/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "@/lib/fetcher";
import { getBasketDetails } from "@/lib/get-basket-details";
import { ApiRouts } from "@/services/constants";
import { axiosInstance } from "@/services/instance";
import useSWR from "swr";

interface ReturnProps {
  items: any[];
  totalAmount: number;
  error: boolean;
  isLoading: boolean;
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

  const updateProduct = async (id: number, quantity: number) => {
    const updateData = (
      await axiosInstance.patch(ApiRouts.BASKET + "/" + id, { quantity })
    ).data;
    mutate([]);
  };

  return {
    items: data.items,
    totalAmount: data.totalAmount,
    error,
    isLoading,
    updateProduct,
  };
};
