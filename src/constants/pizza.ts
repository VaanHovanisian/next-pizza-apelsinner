export const objPizzaSizes = {
  30: "Маленькая",
  40: "Средняя",
  50: "Большая",
} as const;

export const objPizzaTypes = {
  1: "Тонкое",
  2: "Традиционное",
} as const;

export const pizzaSizes = Object.entries(objPizzaSizes).map(
  ([value, name]) => ({
    name,
    value,
  })
);
export const pizzaTypes = Object.entries(objPizzaTypes).map(
  ([value, name]) => ({
    name,
    value,
  })
);
