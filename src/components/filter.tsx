"use client";

import React from "react";
import { Button, Input, Title } from "./ui";
import { PriceSlider, FilterCheckboxGroup } from "./";
import { useIngredients } from "@/hooks/useIngredients";
import { useFilter } from "@/hooks/filter";
import { useQueryFilter } from "@/hooks/query-filter";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = (props) => {
  const { className } = props;
  const { ingredients, loading } = useIngredients();
  const filter = useFilter();
  useQueryFilter(filter);
  const items = ingredients.map((item) => ({
    name: item.name,
    value: item.id,
  }));

  return (
    <div className={cn("sticky top-20", className)}>
      <Title size="s" text="Фильтрация" />
      <FilterCheckboxGroup
        items={[
          { name: "30 см", value: "30 " },
          { name: "40 см", value: "40" },
          { name: "50 см", value: "50" },
        ]}
        title={"Размеры"}
        selected={filter.selectedSizes}
        setSelected={filter.setSelectedSizes}
      />
      <FilterCheckboxGroup
        items={[
          { name: "Тонкое", value: "1" },
          { name: "Традиционное", value: "2" },
        ]}
        title={"Тип теста"}
        selected={filter.selectedTypes}
        setSelected={filter.setSelectedTypes}
      />
      <hr className="my-3" />
      <Title size={"s"} text={"Цена от и до:"} />
      <div className="flex gap-2">
        <Input
          value={filter.price.priceFrom || 0}
          onChange={({ target: { value } }) =>
            filter.updatePrice("priceFrom", +value)
          }
          type="number"
          min={0}
          max={5000}
          placeholder="0  ₽"
          className="border p-2 rounded-[10px]"
        />
        <Input
          value={filter.price.priceTo || 5000}
          onChange={({ target: { value } }) =>
            filter.updatePrice("priceTo", +value)
          }
          type="number"
          min={100}
          max={5000}
          placeholder="1950  ₽"
          className="border p-2 rounded-[10px]"
        />
      </div>
      <PriceSlider
        value={[filter.price.priceFrom || 0, filter.price.priceTo || 5000]}
        setValue={([priceFrom, priceTo]) =>
          filter.setPrice({ priceFrom, priceTo })
        }
        className="mt-8"
      />
      <hr className="my-3" />
      <FilterCheckboxGroup
        items={items}
        title={"Ингредиенты"}
        selected={filter.selectedIngredients}
        setSelected={filter.setSelectedIngredients}
        loading={loading}
      />
      <Button variant="default" className="rounded-[18px] px-15 py-3 mt-4">
        Применить
      </Button>
    </div>
  );
};
