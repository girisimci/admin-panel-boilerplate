import React from "react";
import Modal from "@/components/commons/modal";

const BlogPreview = ({ blog, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal title="Blog Önizleme" hideModal={onClose} size="lg">
      <div className="max-w-4xl mx-auto p-6 bg-white">
        {/* Blog Başlığı */}
        <h1 className="text-4xl font-bold mb-4 text-black">{blog.title}</h1>

        {/* Meta Bilgiler */}
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>{new Date(blog.publishDate).toLocaleDateString("tr-TR")}</span>
          <span>•</span>
          <span>{blog.author}</span>
          {blog.categoryId && <span>•</span>}
          {blog.categoryId && <span>{blog.categoryName}</span>}
        </div>

        {/* Kapak Görseli */}
        {blog.image && (
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
        )}

        {/* Blog İçeriği */}
        <div 
          className="prose prose-lg max-w-none text-black"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* SEO Önizleme */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4 text-black">SEO Önizleme</h3>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-blue-600 text-xl mb-1">
              {blog.seo?.metaTitle || blog.title}
            </div>
            <div className="text-green-600 text-sm mb-2">
              example.com/{blog.seo?.slug || ""}
            </div>
            <div className="text-gray-600">
              {blog.seo?.metaDescription || ""}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BlogPreview; 