import productsData from "@/data/products.json";
import { Product } from "@/types/productTypes";

let products: Product[] = [...productsData];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const fakeProductsApi = {
  // Fetch all products
  async getAll() {
    await delay(); // simulate network delay
    return [...products]; // return a shallow copy of products array
  },

  // Fetch a single product by ID
  async getById(id: number) {
    await delay(); // simulate network delay
    return products.find((p) => p.id === id); // return matching product or undefined
  },

  // Create a new product
  async create(data: Omit<Product, "id">) {
    await delay(); // simulate network delay
    const newProduct: Product = {
      id: Date.now(), // generate a simple unique ID using timestamp
      ...data, // spread provided product data
    };
    products.push(newProduct); // add new product to array
    return newProduct; // return the created product
  },

  // Update an existing product by ID
  async update(id: number, data: Partial<Product>) {
    await delay(); // simulate network delay
    // update product by mapping over products array
    products = products.map((p) => (p.id === id ? { ...p, ...data } : p));
    return products.find((p) => p.id === id); // return the updated product
  },

  // Delete product(s) by single ID or array of IDs
  async delete(ids: number | number[]) {
    await delay(); // simulate network delay
    if (Array.isArray(ids)) {
      // remove all products whose IDs are in the array
      products = products.filter((p) => !ids.includes(p.id));
    } else {
      // remove a single product by ID
      products = products.filter((p) => p.id !== ids);
    }
    return { success: true }; // return simple success response
  },
};
