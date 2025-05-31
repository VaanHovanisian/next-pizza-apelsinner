import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { CreateBasketCardValues } from "@/@types/basket";

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
