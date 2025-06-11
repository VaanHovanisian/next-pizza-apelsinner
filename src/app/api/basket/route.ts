import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateBasket } from "@/lib/find-or-create-basket";
import { CreateBasketCardValues } from "@/@types/basket";
import { updateBasketTotalAmount } from "@/lib/update-basket-total-amount";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("basketToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userBasket = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        products: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            ingredients: true,
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(userBasket);
  } catch (error) {
    console.log("GET_CATCH ERROR", error);
    return NextResponse.json({ error: "basket not found" });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("basketToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userBasket = await findOrCreateBasket(token);

    const data = (await req.json()) as CreateBasketCardValues;

    const findFirstBasket = await prisma.cartProduct.findFirst({
      where: {
        cartId: userBasket.id,
        ingredients: {
          some: {
            id: { in: data.ingredients },
          },
        },
        variantId: data.variantId,
      },
    });

    if (findFirstBasket) {
      await prisma.cartProduct.update({
        where: {
          id: findFirstBasket.id,
        },
        data: {
          quantity: findFirstBasket.quantity + 1,
        },
      });
    } else {
      await prisma.cartProduct.create({
        data: {
          cartId: userBasket.id,
          variantId: data.variantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updateUserBasket = updateBasketTotalAmount(token);
    const response = NextResponse.json(updateUserBasket);
    response.cookies.set("basketToken", token);
    return response;
  } catch (error) {
    console.log("POST_CATCH ERROR", error);
    return NextResponse.json({ error: "basket not create" });
  }
}
