"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Search } from "./";
import Link from "next/link";
import { useSearchHeader } from "@/hooks/useSearchHeader";

interface Props {
  className?: string;
}

export const SearchHeader: React.FC<Props> = (props) => {
  const { className } = props;
  const {
    focus,
    products,
    searchValue,
    ref,
    setSearchValue,
    setClose,
    setFocus,
  } = useSearchHeader();

  return (
    <>
      {focus && <div className="fixed inset-0 bg-black/50 z-120"></div>}
      <div ref={ref} className={cn("relative z-120", className)}>
        <Search
          className="p-3 flex-1"
          value={searchValue}
          onChange={setSearchValue}
          placeholder={"Поиск пиццы..."}
          onFocus={() => setFocus(true)}
        />
        {focus && (
          <ul className="bg-white m-2 p-2 absolute top 100%  left-0 right-0 rounded-[10px]">
            {products.map((item) => (
              <li
                onClick={setClose}
                key={item.id}
                className="p-2 flex items-center gap-2"
              >
                <Link href={`/product/${item.id}`}>
                  <img src={item.imgUrl} alt="" className="w-[30px] h-[30px]" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
