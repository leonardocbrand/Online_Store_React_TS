export type ProductsData = {
  quantidade: number;
  id: string;
  title: string;
  thumbnail: string;
  currency_id: string;
  price: number;
};

type Attributes = {
  id: string;
  name: string;
  value_name: string;
};

export type ProductDetailsData = {
  quantidade: number;
  id: string;
  title: string;
  thumbnail: string;
  currency_id: string;
  price: number;
  attributes: Attributes[]
};
