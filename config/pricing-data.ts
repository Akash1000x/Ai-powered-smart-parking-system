export type Price = {
  id: string;
  unit_amount: string;
  nickname: string;
};

export const pricingData: Price[] = [
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    unit_amount: "10,000",
    nickname: "monthly",
  },
  {
    id: "price_1NQk55LtGdPVhGLefU8AHqHr",
    unit_amount: "100,000",
    nickname: "yearly",
  },
  {
    id: "price_1NQk4eLtGdPVhGLeZsZDsCNz",
    unit_amount: "custom",
    nickname: "custom",
  },
];
