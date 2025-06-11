import { ProductPageProps } from "@/@types/params";
import { Modal } from "@/components/modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params;
    if (!id) {
      return;
    }
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        variants: true,
        ingredients: true,
      },
    });
    if (!product) {
      notFound();
    }
    return <Modal product={product} />;
  } catch (error) {
    console.log(error);
  }
}
