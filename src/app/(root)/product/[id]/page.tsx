import { Container, Product } from "@/components";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    if (!id) {
      return;
    }
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
    console.log(product);
    return (
      <Container>
        <Product product={product} />
      </Container>
    );
  } catch (error) {
    console.log(error);
  }
}
