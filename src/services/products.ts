import { axiosInstance } from "./instance";
import { ApiRouts } from "./constants";
import { Product } from "@prisma/client";

export const search = async (q: string) => {
  return (
    await axiosInstance.get<Product[]>(ApiRouts.SEARCH_PRODUCTS, {
      params: { q },
    })
  ).data;
};
