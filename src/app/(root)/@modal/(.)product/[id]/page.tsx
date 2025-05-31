import { Modal } from "@/components/modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      variants: true,
      ingredients: true,
    },
  });
  if (!product) {
    notFound();
  }
  return (
    <>
      <Modal product={product} />
    </>
  );
}
