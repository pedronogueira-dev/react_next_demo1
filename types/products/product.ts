export interface Product {
  id: string;
  name: string;
  stock: number;
}

export interface NewProductDto {
  name: string;
  stock: number;
}