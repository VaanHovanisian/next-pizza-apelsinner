"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./ui";
import { Card } from "./card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";
import { ProductRelation } from "@/@types/prisma";

interface Props {
  className?: string;
  title: string;
  items: ProductRelation[];
  categoryId: number;
}

export const Catalog: React.FC<Props> = (props) => {
  const { className, items, title, categoryId } = props;

  const intersectionRef = React.useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.3,
    }
  );

  const setActiveCategory = useCategoryStore(
    (state) => state.setActiveCategory
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategory(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategory]);

  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title size={"l"} text={title} className="mb-2" />
      <ul className="grid grid-cols-3 gap-5">
        {items.map((item) => (
          <li key={item.id}>
            <Card
              id={item.id}
              img={item.imgUrl}
              title={item.name}
              description={item.ingredients}
              price={item.variants[0]?.price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
