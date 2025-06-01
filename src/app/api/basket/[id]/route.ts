import { updateBasketTotalAmount } from "@/lib/update-basket-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("basketToken")?.value;
    const id = +params.id;
    const data = (await req.json()) as { quantity: number };

    if (!token) {
      return NextResponse.json({ message: "token not found" });
    }

    const basketCard = await prisma.cartProduct.findFirst({
      where: {
        id,
      },
      include: {
        ingredients: true,
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!basketCard) {
      return NextResponse.json(
        { message: "basket card not found" },
        { status: 404 }
      );
    }

    await prisma.cartProduct.update({
      where: {
        id: basketCard.id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updateBasket = updateBasketTotalAmount(token);
    return NextResponse.json(updateBasket);
  } catch (error) {
    console.log("BASKET_PATCH Serever-Error", error);
    return NextResponse.json({ message: "basket not update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("basketToken")?.value;
    const id = +params.id;

    if (!token) {
      return NextResponse.json({ message: "token not found" });
    }

    const basketCard = await prisma.cartProduct.findFirst({
      where: {
        id,
      },
      include: {
        ingredients: true,
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!basketCard) {
      return NextResponse.json(
        { message: "basket card not found" },
        { status: 404 }
      );
    }

    await prisma.cartProduct.delete({
      where: {
        id: basketCard.id,
      },
    });

    const updateBasket = updateBasketTotalAmount(token);
    return NextResponse.json(updateBasket);
  } catch (error) {
    console.log("BASKET_DELETE Serever-Error", error);
    return NextResponse.json({ message: "basket not delete" }, { status: 500 });
  }
}
