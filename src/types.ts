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

export type FormData = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  zipcode: string;
  address: string;
  payment: string;
};
