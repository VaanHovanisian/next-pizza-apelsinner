import { prisma } from "@/prisma/prisma-client";

export const findOrCreateBasket = async (token: string) => {
  let userBasket = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userBasket) {
    userBasket = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userBasket;
};
