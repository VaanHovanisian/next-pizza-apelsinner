import axios from "axios"
import { axiosInstance } from "./instance"
import { ApiRouts } from "./constants"
import { Ingredient } from "@prisma/client";

export const getIngredients = async (): Promise<Ingredient[]> => {
    return ( 
        await axiosInstance.get<Ingredient[]>(ApiRouts.INGREDIENTS,)
    ).data;
};