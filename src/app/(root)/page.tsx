import { Catalog, Container, Filter, TopBar } from "@/components";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  return (
    <>
      <TopBar categories={categories.filter((el) => el.products.length > 0)} />
      <Container className="flex mt-8 items-start gap-[80px]">
        <Suspense>
          <Filter className="sticky" />
        </Suspense>
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
