/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FilterCheckox, Search } from ".";
import { Skeleton, Title } from "./ui";
import { cn } from "@/lib/utils";
import { useFilterCheckbox } from "@/hooks/filter-checkbox";

interface Props {
  className?: string;
  items: any[];
  title: string;
  selected: Set<string>;
  setSelected: (value: string) => void;
  loading?: boolean;
}

export const FilterCheckboxGroup: React.FC<Props> = (props) => {
  const { className, items, selected, setSelected, title, loading } = props;
  const { list, onClick, showAll, searchValue, setSearchValue } =
    useFilterCheckbox(items);
  const loadingItems = new Array(5)
    .fill(0)
    .map((_, index) => <Skeleton className="h-5 mb-2" key={index} />);

  return (
    <div className={cn("", className)}>
      <Title size={"s"} text={title} />
      {showAll && (
        <Search
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Поиск"
          className="p-2 mt-2 mb-2"
        />
      )}
      {loading ? (
        loadingItems
      ) : (
        <ul>
          {list.map((item) => (
            <li key={item.value}>
              <FilterCheckox
                checked={selected.has(item.value)}
                onCkeckedChange={() => setSelected(item.value)}
                text={item.name}
                value={item.value.toString()}
              />
            </li>
          ))}
        </ul>
      )}
      {loading ? (
        <Skeleton className="h-5 w-20" />
      ) : (
        <>
          {items.length > 5 && (
            <button className="text-primary text-[16px]" onClick={onClick}>
              {showAll ? "скрыть" : "+ Показать всё"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
