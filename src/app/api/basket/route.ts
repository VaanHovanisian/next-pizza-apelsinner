import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
}
