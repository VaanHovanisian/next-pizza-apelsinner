import React from "react";

interface ReturnProps {
  showAll: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onClick: () => void;
  list: any[];
}

export const useFilterCheckbox = (items: any[]): ReturnProps => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const onClick = () => setShowAll(!showAll);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const list = showAll ? filteredItems : items.slice(0, 6);

  return {
    showAll,
    searchValue,
    setSearchValue,
    onClick,
    list
};
};
