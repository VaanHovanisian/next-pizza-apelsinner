import { ProductPageProps } from "@/@types/params";
import { updateBasketTotalAmount } from "@/lib/update-basket-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: ProductPageProps) {
  try {
    const token = req.cookies.get("basketToken")?.value;
    const { id } = await params;
    const data = (await req.json()) as { quantity: number };

    if (!token) {
      return NextResponse.json({ message: "token not found" });
    }

    const basketCard = await prisma.cartProduct.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!basketCard) {
      return NextResponse.json({ message: "basket card not found" });
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
    console.log("PATCH_CATCH ERROR", error);
    return NextResponse.json({ error: "basket card not update" });
  }
}
export async function DELETE(req: NextRequest, { params }: ProductPageProps) {
  try {
    const token = req.cookies.get("basketToken")?.value;
    const { id } = await params;

    if (!token) {
      return NextResponse.json({ message: "token not found" });
    }

    const basketCard = await prisma.cartProduct.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!basketCard) {
      return NextResponse.json({ message: "basket card not found" });
    }

    await prisma.cartProduct.delete({
      where: {
        id: basketCard.id,
      },
    });

    const updateBasket = updateBasketTotalAmount(token);
    return NextResponse.json(updateBasket);
  } catch (error) {
    console.log("DELETE_CATCH ERROR", error);
    return NextResponse.json({ error: "basket card not delete" });
  }
}
