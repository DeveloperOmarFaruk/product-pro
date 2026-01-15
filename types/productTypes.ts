export type Product = {
  id: number;
  name: string;
  category: string;
  status: string;
  price: number;
  stock: number;
  img_url: string;
  description: string;
  createdAt: string;
};

export type ProductStatus = "active" | "inactive" | "draft";

export interface ProductCreateInput {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  img_url: string;
  createdAt?: string; // optional, server can set it
}
