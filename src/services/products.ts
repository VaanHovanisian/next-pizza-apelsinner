import axios from "axios"
import { axiosInstance } from "./instance"
import { ApiRouts } from "./constants"
import { Product } from "@prisma/client";

export const search = async (q: String) => {
    return ( await axiosInstance.get<Product[]>(ApiRouts.SEARCH_PRODUCTS, {
        params: {q}
    })).data;
}