import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Geçici mock veri
let MOCK_BLOGS = [
  {
    id: 1,
    title: "İlk Blog Yazısı",
    content: "<p>Blog içeriği burada...</p>",
    categoryId: "1",
    seo: {
      metaTitle: "İlk Blog Yazısı | Benim Blogum",
      metaDescription: "Bu blog yazısında ilk deneyimlerimi paylaşıyorum.",
      slug: "ilk-blog-yazisi",
    },
    status: "published",
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
      queryFn: (blog) => {
        const newBlog = {
          id: Date.now(),
          ...blog,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        MOCK_BLOGS = [...MOCK_BLOGS, newBlog];
        return { data: newBlog };
      },
      invalidatesTags: ["Blogs"],
    }),

    // Blog güncelle
    updateBlog: builder.mutation({
      queryFn: ({ id, ...update }) => {
        MOCK_BLOGS = MOCK_BLOGS.map(blog => 
          blog.id === id 
            ? { ...blog, ...update, updatedAt: new Date().toISOString() }
            : blog
        );
        return { data: MOCK_BLOGS.find(blog => blog.id === id) };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),

    // Blog sil
    deleteBlog: builder.mutation({
      queryFn: (id) => {
        MOCK_BLOGS = MOCK_BLOGS.filter(blog => blog.id !== id);
        return { data: id };
      },
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