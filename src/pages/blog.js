import React, { useState } from "react";
import BaseTable from "@/components/commons/base-table";
import Button from "@/components/commons/button";
import Input from "@/components/commons/input";
import Modal from "@/components/commons/modal";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  useGetBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/store/services/blog-service";
import { useGetCategoriesQuery } from "@/store/services/category-service";

const BlogManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePreview, setFilePreview] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  // RTK Query hooks
  const { data: blogs = [], isLoading } = useGetBlogsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const initialBlogState = {
    title: "",
    content: "",
    image: "",
    categoryId: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0],
    author: "Admin",
  };

  const [newBlog, setNewBlog] = useState(initialBlogState);

  const handleAddBlog = async () => {
    try {
      // SEO slug oluştur
      const slug = newBlog.seo.slug || newBlog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const blogData = {
        ...newBlog,
        content: editor.getHTML(),
        seo: {
          ...newBlog.seo,
          slug,
          metaTitle: newBlog.seo.metaTitle || newBlog.title,
        },
      };

      if (selectedBlog) {
        await updateBlog({ id: selectedBlog.id, ...blogData });
      } else {
        await addBlog(blogData);
      }

      setIsModalOpen(false);
      setNewBlog(initialBlogState);
      setSelectedBlog(null);
      setFilePreview("");
      editor.commands.setContent("");
    } catch (error) {
      console.error("Blog eklenirken hata:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
    } catch (error) {
      console.error("Blog silinirken hata:", error);
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setNewBlog({
      ...blog,
      publishDate: new Date(blog.publishDate).toISOString().split("T")[0],
    });
    editor?.commands.setContent(blog.content);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      setNewBlog({ ...newBlog, image: previewUrl });
    }
  };

  const tableHead = [
    { title: "Başlık", width: "20%" },
    { title: "Kategori", width: "15%" },
    { title: "SEO URL", width: "15%" },
    { title: "Durum", width: "10%" },
    { title: "Yayın Tarihi", width: "15%" },
    { title: "Yazar", width: "10%" },
    { title: "İşlemler", width: "15%" },
  ];

  const tableBody = blogs.map((blog) => [
    blog.title,
    categories.find(c => c.id === blog.categoryId)?.name || "-",
    blog.seo?.slug,
    <span
      className={`px-2 py-1 rounded text-sm ${
        blog.status === "published"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {blog.status === "published" ? "Yayında" : "Taslak"}
    </span>,
    new Date(blog.publishDate).toLocaleDateString("tr-TR"),
    blog.author,
    <div className="flex gap-2">
      <Button name="Düzenle" click={() => handleEditBlog(blog)} />
      <Button name="Sil" click={() => handleDeleteBlog(blog.id)} />
    </div>,
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Blog Yönetimi</h1>

      <div className="mb-4">
        <Button
          name="Yeni Blog Ekle"
          click={() => {
            setIsModalOpen(true);
            setSelectedBlog(null);
            setNewBlog(initialBlogState);
            editor?.commands.setContent("");
          }}
        />
      </div>

      <BaseTable
        head={tableHead}
        body={tableBody}
        isLoading={isLoading}
        searchable={true}
      />

      {isModalOpen && (
        <Modal
          title={selectedBlog ? "Blog Düzenle" : "Yeni Blog Ekle"}
          hideModal={() => setIsModalOpen(false)}
        >
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Ana Bilgiler */}
            <div className="space-y-4">
              <Input
                type="text"
                label="Başlık"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                placeholder="Blog başlığı girin"
              />

              <div>
                <label className="block text-black text-sm font-bold mb-2">
                  Kategori
                </label>
                <select
                  value={newBlog.categoryId}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, categoryId: e.target.value })
                  }
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black text-sm font-bold mb-2">
                  İçerik
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 border rounded text-black ${
                      editor?.isActive("bold") ? "bg-gray-200" : ""
                    }`}
                  >
                    Kalın
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 border rounded text-black ${
                      editor?.isActive("italic") ? "bg-gray-200" : ""
                    }`}
                  >
                    İtalik
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().setHeading({ level: 1 }).run()
                    }
                    className={`px-2 py-1 border rounded text-black ${
                      editor?.isActive("heading", { level: 1 })
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    H1
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().setHeading({ level: 2 }).run()
                    }
                    className={`px-2 py-1 border rounded text-black ${
                      editor?.isActive("heading", { level: 2 })
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    H2
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className="border rounded p-2 min-h-[200px] text-black"
                />
              </div>
            </div>

            {/* SEO Bilgileri */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 text-black">SEO Ayarları</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Meta Başlık"
                  value={newBlog.seo?.metaTitle}
                  onChange={(e) =>
                    setNewBlog({
                      ...newBlog,
                      seo: { ...newBlog.seo, metaTitle: e.target.value },
                    })
                  }
                  placeholder="Meta başlık girin"
                />
                <div>
                  <label className="block text-black text-sm font-bold mb-2">
                    Meta Açıklama
                  </label>
                  <textarea
                    value={newBlog.seo?.metaDescription}
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
                        seo: { ...newBlog.seo, metaDescription: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded text-black"
                    rows={3}
                    maxLength={160}
                    placeholder="Meta açıklama girin (max 160 karakter)"
                  />
                </div>
                <Input
                  type="text"
                  label="SEO URL (Slug)"
                  value={newBlog.seo?.slug}
                  onChange={(e) =>
                    setNewBlog({
                      ...newBlog,
                      seo: { ...newBlog.seo, slug: e.target.value },
                    })
                  }
                  placeholder="seo-dostu-url"
                />
              </div>
            </div>

            {/* Yayın Bilgileri */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 text-black">Yayın Ayarları</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black text-sm font-bold mb-2">
                      Durum
                    </label>
                    <select
                      value={newBlog.status}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, status: e.target.value })
                      }
                      className="w-full p-2 border rounded text-black"
                    >
                      <option value="draft">Taslak</option>
                      <option value="published">Yayında</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-black text-sm font-bold mb-2">
                      Yayın Tarihi
                    </label>
                    <input
                      type="date"
                      value={newBlog.publishDate}
                      onChange={(e) =>
                        setNewBlog({ ...newBlog, publishDate: e.target.value })
                      }
                      className="w-full p-2 border rounded text-black"
                    />
                  </div>
                </div>
                <Input
                  type="text"
                  label="Yazar"
                  value={newBlog.author}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, author: e.target.value })
                  }
                  placeholder="Yazar adı"
                />
              </div>
            </div>

            {/* Görsel Yükleme */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 text-black">Görsel</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Görsel URL"
                  value={newBlog.image}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, image: e.target.value })
                  }
                  placeholder="Görsel URL'si girin"
                />
                <div>
                  <label className="block text-black text-sm font-bold mb-2">
                    veya Görsel Yükle
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-black"
                  />
                </div>
                {(filePreview || newBlog.image) && (
                  <div>
                    <label className="block text-black text-sm font-bold mb-2">
                      Görsel Önizleme
                    </label>
                    <img
                      src={filePreview || newBlog.image}
                      alt="Preview"
                      className="max-h-40 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                name={selectedBlog ? "Güncelle" : "Ekle"}
                click={handleAddBlog}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogManagementPage;
