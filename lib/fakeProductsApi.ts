import productsData from "@/data/products.json";
import { Product } from "@/types/productTypes";

let products: Product[] = [...productsData];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const fakeProductsApi = {
  async getAll() {
    await delay();
    return [...products];
  },

  async getById(id: number) {
    await delay();
    return products.find((p) => p.id === id);
  },

  async create(data: Omit<Product, "id">) {
    await delay();
    const newProduct: Product = {
      id: Date.now(),
      ...data,
    };
    products.push(newProduct);
    return newProduct;
  },

  async update(id: number, data: Partial<Product>) {
    await delay();
    products = products.map((p) => (p.id === id ? { ...p, ...data } : p));
    return products.find((p) => p.id === id);
  },

  // ✅ Updated delete to handle single or multiple IDs
  async delete(ids: number | number[]) {
    await delay();
    if (Array.isArray(ids)) {
      products = products.filter((p) => !ids.includes(p.id));
    } else {
      products = products.filter((p) => p.id !== ids);
    }
    return { success: true };
  },
};
