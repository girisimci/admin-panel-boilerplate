import React, { useState } from "react";
import BaseTable from "@/components/commons/base-table";
import Button from "@/components/commons/button";
import Input from "@/components/commons/input";
import Modal from "@/components/commons/modal";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/store/services/category-service";

const CategoryManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // RTK Query hooks
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const initialCategoryState = {
    name: "",
    slug: "",
    description: "",
  };

  const [newCategory, setNewCategory] = useState(initialCategoryState);

  const handleAddCategory = async () => {
    try {
      // SEO dostu slug oluştur
      const slug = newCategory.slug || newCategory.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const categoryData = {
        ...newCategory,
        slug,
      };

      if (selectedCategory) {
        await updateCategory({ id: selectedCategory.id, ...categoryData });
      } else {
        await addCategory(categoryData);
      }

      setIsModalOpen(false);
      setNewCategory(initialCategoryState);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Kategori eklenirken hata:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error("Kategori silinirken hata:", error);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setNewCategory(category);
    setIsModalOpen(true);
  };

  const tableHead = [
    { title: "Kategori Adı", width: "25%" },
    { title: "Slug", width: "20%" },
    { title: "Açıklama", width: "35%" },
    { title: "İşlemler", width: "20%" },
  ];

  const tableBody = categories.map((category) => [
    category.name,
    category.slug,
    category.description,
    <div className="flex gap-2">
      <Button name="Düzenle" click={() => handleEditCategory(category)} />
      <Button name="Sil" click={() => handleDeleteCategory(category.id)} />
    </div>,
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Kategori Yönetimi</h1>

      <div className="mb-4">
        <Button
          name="Yeni Kategori Ekle"
          click={() => {
            setIsModalOpen(true);
            setSelectedCategory(null);
            setNewCategory(initialCategoryState);
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
          title={selectedCategory ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
          hideModal={() => setIsModalOpen(false)}
        >
          <div className="space-y-4">
            <Input
              type="text"
              label="Kategori Adı"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder="Kategori adı girin"
            />

            <Input
              type="text"
              label="Slug"
              value={newCategory.slug}
              onChange={(e) =>
                setNewCategory({ ...newCategory, slug: e.target.value })
              }
              placeholder="seo-dostu-url (boş bırakılırsa otomatik oluşturulur)"
            />

            <div>
              <label className="block text-black text-sm font-bold mb-2">
                Açıklama
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, description: e.target.value })
                }
                className="w-full p-2 border rounded text-black"
                rows={3}
                placeholder="Kategori açıklaması girin"
              />
            </div>

            <div className="border-t pt-4">
              <Button
                name={selectedCategory ? "Güncelle" : "Ekle"}
                click={handleAddCategory}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryManagementPage;
