import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Geçici mock veri
let MOCK_CATEGORIES = [
  {
    id: 1,
    name: "Teknoloji",
    slug: "teknoloji",
    description: "Teknoloji ile ilgili blog yazıları",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z"
  },
  {
    id: 2,
    name: "Yazılım",
    slug: "yazilim",
    description: "Yazılım geliştirme ile ilgili blog yazıları",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z"
  }
];

export const categoryService = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // Kategori listesi
    getCategories: builder.query({
      queryFn: () => ({ data: MOCK_CATEGORIES }),
      providesTags: ["Categories"],
    }),

    // Kategori detayı
    getCategoryById: builder.query({
      queryFn: (id) => ({
        data: MOCK_CATEGORIES.find(category => category.id === id)
      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),

    // Yeni kategori ekle
    addCategory: builder.mutation({
      queryFn: (category) => {
        const newCategory = {
          id: Date.now(),
          ...category,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        MOCK_CATEGORIES = [...MOCK_CATEGORIES, newCategory];
        return { data: newCategory };
      },
      invalidatesTags: ["Categories"],
    }),

    // Kategori güncelle
    updateCategory: builder.mutation({
      queryFn: ({ id, ...update }) => {
        MOCK_CATEGORIES = MOCK_CATEGORIES.map(cat => 
          cat.id === id 
            ? { ...cat, ...update, updatedAt: new Date().toISOString() }
            : cat
        );
        return { data: MOCK_CATEGORIES.find(cat => cat.id === id) };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Categories", id }],
    }),

    // Kategori sil
    deleteCategory: builder.mutation({
      queryFn: (id) => {
        MOCK_CATEGORIES = MOCK_CATEGORIES.filter(cat => cat.id !== id);
        return { data: id };
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryService; 