import { fakeProductsApi } from "@/lib/fakeProductsApi";
import { Product, ProductCreateInput } from "@/types/productTypes";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // GET ALL
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        const data = await fakeProductsApi.getAll();
        return { data };
      },
      providesTags: ["Products"],
    }),

    // GET BY ID
    getProductById: builder.query<Product | undefined, number>({
      queryFn: async (id) => {
        const data = await fakeProductsApi.getById(id);
        return { data };
      },
    }),

    // CREATE
    createProduct: builder.mutation<Product, ProductCreateInput>({
      queryFn: async (data) => {
        const payload: Omit<Product, "id"> = {
          name: data.name,
          category: data.category,
          price: data.price,
          stock: data.stock,
          status: data.status,
          img_url: data.img_url,
          description: data.description ?? "",
          createdAt: new Date().toISOString(),
        };

        const result = await fakeProductsApi.create(payload);
        return { data: result };
      },

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newProduct } = await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              "getProducts",
              undefined,
              (draft) => {
                draft.unshift(newProduct);
              }
            )
          );
        } catch {}
      },

      invalidatesTags: ["Products"],
    }),

    // PATCH
    updateProduct: builder.mutation<
      Product | undefined,
      { id: number; data: Partial<Product> }
    >({
      queryFn: async ({ id, data }) => {
        const result = await fakeProductsApi.update(id, data);
        return { data: result };
      },
      invalidatesTags: ["Products"],
    }),

    // DELETE
    deleteProduct: builder.mutation<{ success: boolean }, number | number[]>({
      queryFn: async (ids) => {
        const result = await fakeProductsApi.delete(ids);
        return { data: result };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
