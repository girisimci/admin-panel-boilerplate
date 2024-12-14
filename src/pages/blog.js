import React, { useState, useEffect } from "react";
import BaseTable from "@/components/base-table";
import Button from "@/components/commons/button";
import Input from "@/components/commons/input";
import Modal from "@/components/commons/modal";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const BlogManagementPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setNewBlog({ ...newBlog, content: editor.getHTML() });
    },
  });

  const fetchBlogs = async () => {
    setIsLoading(true);
    const data = [
      {
        id: 1,
        title: "İlk Makale",
        content: "<p>Bu ilk makalenin içeriği.</p>",
        image: "https://via.placeholder.com/150",
        author: "Admin 1",
      },
      {
        id: 2,
        title: "İkinci Makale",
        content: "<p>Bu ikinci makalenin içeriği.</p>",
        image: "https://via.placeholder.com/150",
        author: "Admin 2",
      },
    ];
    setBlogs(data);
    setIsLoading(false);
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.content || !newBlog.image) return;
    const blog = {
      ...newBlog,
      id: Date.now(),
      author: "Admin Kullanıcı",
    };
    setBlogs([...blogs, blog]);
    setNewBlog({ title: "", content: "", image: "" });
    setFilePreview("");
    editor.commands.setContent("");
    setIsModalOpen(false);
  };

  const handleDeleteBlog = (id) => {
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(filteredBlogs);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

      const uploadedUrl = `https://example.com/uploads/${file.name}`;
      setNewBlog({ ...newBlog, image: uploadedUrl });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const tableHead = [
    { title: "Başlık", width: "25%" },
    { title: "Yazar", width: "20%" },
    { title: "Resim", width: "15%" },
    { title: "İşlemler", width: "40%" },
  ];

  const tableBody = blogs.map((blog) => [
    blog.title,
    blog.author,
    <img
      src={blog.image}
      alt={blog.title}
      className="w-16 h-16 object-cover rounded"
    />,
    <div className="flex gap-2">
      <Button name="Sil" click={() => handleDeleteBlog(blog.id)} />
    </div>,
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Yönetimi</h1>

      <div className="mb-4">
        <Button
          name="Yeni Blog Ekle"
          click={() => setIsModalOpen(true)}
          isOfferButton={false}
        />
      </div>

      <BaseTable
        head={tableHead}
        body={tableBody}
        isLoading={isLoading}
        searchable={true}
      />

      {isModalOpen && (
        <Modal title="Yeni Blog Ekle" hideModal={() => setIsModalOpen(false)}>
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
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  İçerik
                </label>
                {/* Araç Çubuğu */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 border rounded ${
                      editor.isActive("bold") ? "bg-gray-200" : ""
                    }`}
                  >
                    Kalın
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 border rounded ${
                      editor.isActive("italic") ? "bg-gray-200" : ""
                    }`}
                  >
                    İtalik
                  </button>
                 
                  <button
                    onClick={() =>
                      editor.chain().focus().setHeading({ level: 1 }).run()
                    }
                    className={`px-2 py-1 border rounded ${
                      editor.isActive("heading", { level: 1 })
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
                    className={`px-2 py-1 border rounded ${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    H2
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={`px-2 py-1 border rounded ${
                      editor.isActive("bulletList") ? "bg-gray-200" : ""
                    }`}
                  >
                    Liste
                  </button>
                </div>
                {/* Editör İçeriği */}
                <EditorContent
                  editor={editor}
                  className="border rounded w-full"
                  style={{ height: "200px" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Görsel Yükle veya URL Girin
              </label>
              <Input
                type="text"
                label="Resim URL"
                value={newBlog.image}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.value })
                }
                placeholder="Resim URL'si girin"
              />
              <input
                type="file"
                className="mt-2"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            {filePreview && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Görsel Önizleme
                </label>
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain border rounded"
                />
              </div>
            )}
            <Button name="Ekle" click={handleAddBlog} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogManagementPage;
