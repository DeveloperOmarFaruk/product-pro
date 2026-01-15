import { fakeProductsApi } from "@/lib/fakeProductsApi";
import { Product, ProductCreateInput } from "@/types/productTypes";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi", // unique key in the Redux store
  baseQuery: fakeBaseQuery(), // using a fake base query for mocking
  tagTypes: ["Products"], // used for cache invalidation

  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        const data = await fakeProductsApi.getAll(); // call fake API
        return { data }; // return in RTK Query expected format
      },
      providesTags: ["Products"], // tag used for cache invalidation
    }),

    // GET PRODUCT BY ID
    getProductById: builder.query<Product | undefined, number>({
      queryFn: async (id) => {
        const data = await fakeProductsApi.getById(id); // fetch product by id
        return { data };
      },
    }),

    // CREATE NEW PRODUCT
    createProduct: builder.mutation<Product, ProductCreateInput>({
      queryFn: async (data) => {
        const payload: Omit<Product, "id"> = {
          name: data.name,
          category: data.category,
          price: data.price,
          stock: data.stock,
          status: data.status,
          img_url: data.img_url,
          description: data.description ?? "", // default to empty string
          createdAt: new Date().toISOString(), // current timestamp
        };

        const result = await fakeProductsApi.create(payload); // call fake API
        return { data: result };
      },

      // Optimistic update: add new product immediately to cache
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newProduct } = await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              "getProducts", // target query
              undefined, // no params
              (draft) => {
                draft.unshift(newProduct); // add new product to start of list
              }
            )
          );
        } catch {}
      },

      invalidatesTags: ["Products"], // mark products cache as stale
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation<
      Product | undefined,
      { id: number; data: Partial<Product> }
    >({
      queryFn: async ({ id, data }) => {
        const result = await fakeProductsApi.update(id, data); // update product
        return { data: result };
      },
      invalidatesTags: ["Products"], // invalidate cache so UI refreshes
    }),

    // DELETE PRODUCT(S)
    deleteProduct: builder.mutation<{ success: boolean }, number | number[]>({
      queryFn: async (ids) => {
        const result = await fakeProductsApi.delete(ids); // delete one or multiple
        return { data: result };
      },
      invalidatesTags: ["Products"], // refresh product list after deletion
    }),
  }),
});

// Export auto-generated hooks for usage in components
export const {
  useGetProductsQuery, // fetch all products
  useGetProductByIdQuery, // fetch a single product
  useCreateProductMutation, // create new product
  useUpdateProductMutation, // update existing product
  useDeleteProductMutation, // delete product(s)
} = productsApi;
