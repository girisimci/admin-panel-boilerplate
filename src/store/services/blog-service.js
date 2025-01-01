import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Geçici mock veri
const MOCK_BLOGS = [
  {
    id: 1,
    title: "İlk Blog Yazısı",
    content: "<p>Blog içeriği burada...</p>",
    seo: {
      metaTitle: "İlk Blog Yazısı | Benim Blogum",
      metaDescription: "Bu blog yazısında ilk deneyimlerimi paylaşıyorum.",
      slug: "ilk-blog-yazisi",
    },
    status: "published", // published, draft
    publishDate: "2024-01-20T10:00:00Z",
    author: "Admin",
    image: "https://via.placeholder.com/800x400",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z"
  }
];

export const blogService = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    // Blog listesi
    getBlogs: builder.query({
      queryFn: () => ({ data: MOCK_BLOGS }),
      providesTags: ["Blogs"],
    }),

    // Blog detayı
    getBlogById: builder.query({
      queryFn: (id) => ({
        data: MOCK_BLOGS.find(blog => blog.id === id)
      }),
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    // Yeni blog ekle
    addBlog: builder.mutation({
      queryFn: (blog) => ({
        data: {
          id: Date.now(),
          ...blog,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Blogs"],
    }),

    // Blog güncelle
    updateBlog: builder.mutation({
      queryFn: ({ id, ...update }) => ({
        data: {
          id,
          ...update,
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),

    // Blog sil
    deleteBlog: builder.mutation({
      queryFn: (id) => ({ data: id }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogService; 