import { CreateBasketCardValues, IBasketCard } from "@/@types/basket";
import { fetcher } from "@/lib/fetcher";
import { getBasketDetails } from "@/lib/get-basket-details";
import { ApiRouts } from "@/services/constants";
import { axiosInstance } from "@/services/instance";
import useSWR from "swr";

interface ReturnProps {
  items: IBasketCard[];
  totalAmount: number;
  error: boolean;
  isLoading: boolean;
  addProduct: (values: CreateBasketCardValues) => Promise<void>;
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

  const addProduct = async (values: CreateBasketCardValues) => {
    const updateData = (await axiosInstance.post(ApiRouts.BASKET, values)).data;
    mutate(getBasketDetails(updateData));
  };
  const removeProduct = async (id: number) => {
    const updateData = (await axiosInstance.delete(ApiRouts.BASKET + "/" + id))
      .data;
    mutate(getBasketDetails(updateData));
  };
  const updateProduct = async (id: number, quantity: number) => {
    const updateData = (
      await axiosInstance.patch(ApiRouts.BASKET + "/" + id, { quantity })
    ).data;
    mutate(getBasketDetails(updateData));
  };

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
