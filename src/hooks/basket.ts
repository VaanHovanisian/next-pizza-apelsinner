import { CreateBasketCardValues, IBasketCard } from "@/@types/basket";
import { fetcher } from "@/lib/fetcher";
import { getBasketDetails } from "@/lib/get-basket-details";
import { ApiRouts } from "@/services/constants";
import { axiosInstance } from "@/services/instance";
import useSWR from "swr";

interface ReturnProps {
  data: { items: IBasketCard[]; totalAmount: number };
  items: IBasketCard[];
  totalAmount: number;
  error: boolean;
  isLoading: boolean;
  updateProduct: (id: number, quantity: number) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  addProduct: (values: CreateBasketCardValues) => Promise<void>;
  isValidating: boolean;
}

export const useBasket = (): ReturnProps => {
  const {
    data: basket,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR(ApiRouts.BASKET, fetcher, {
    revalidateOnFocus: false,
  });

  const data =
    isLoading || error
      ? { items: [], totalAmount: 0 }
      : getBasketDetails(basket);

  const updateProduct = async (id: number, quantity: number) => {
    const updateData = (
      await axiosInstance.patch(ApiRouts.BASKET + "/" + id, { quantity })
    ).data;
    mutate(getBasketDetails(updateData), { populateCache: false });
  };

  const removeProduct = async (id: number) => {
    const updateData = (await axiosInstance.delete(ApiRouts.BASKET + "/" + id))
      .data;
    mutate(getBasketDetails(updateData), { populateCache: false });
  };

  const addProduct = async (values: CreateBasketCardValues) => {
    const updateData = (await axiosInstance.post(ApiRouts.BASKET, values)).data;
    mutate(getBasketDetails(updateData));
  };

  return {
    data,
    items: data.items || [],
    totalAmount: data.totalAmount || 0,
    error,
    isLoading,
    updateProduct,
    removeProduct,
    addProduct,
    isValidating,
  };
};
