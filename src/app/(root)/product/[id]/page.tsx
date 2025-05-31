import { Container, Modal, Product } from "@/components";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      variants: true,
      ingredients: true,
    },
  });
  if(!product){
    notFound();
  }
 console.log(product);
  return (
    <Container>
<Product product={product} />  
    </Container>
     
  );
}
