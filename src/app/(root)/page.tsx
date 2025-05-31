import { Card, Catalog, Container, Filter, TopBar } from "@/components";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true
        },
      },
    },
  });

  return (
    <>
      <TopBar categories={categories.filter(el => el.products.length > 0)} />
      <Container className="flex mt-8 items-start gap-[80px]">
        <Filter className="sticky" />
        <div className="flex flex-col gap-3">
          {categories.map(
            (item) =>
              item.products.length > 0 && (
                <Catalog
                  key={item.id}
                  title={item.name}
                  items={item.products}
                  categoryId={item.id}
                />
              )
          )}
        </div>
      </Container>
    </>
  );
}
