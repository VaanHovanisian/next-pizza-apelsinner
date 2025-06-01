import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

}
