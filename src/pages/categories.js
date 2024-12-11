import BaseTable from "@/components/base-table";
import Button from "@/components/commons/button";
import Input from "@/components/commons/input";
import Modal from "@/components/commons/modal";
import React, { useState, useEffect } from "react";

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const fetchCategories = async () => {
    setIsLoading(true);
    const data = [
      { id: 1, name: "Kategori 1", status: true },
      { id: 2, name: "Kategori 2", status: false },
    ];
    setCategories(data);
    setIsLoading(false);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name: newCategoryName.trim(), status: true },
    ]);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleToggleCategoryStatus = (id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat))
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const tableHead = [
    { title: "Kategori Adı", width: "40%" },
    { title: "Durum", width: "20%" },
    { title: "İşlemler", width: "40%" },
  ];

  const tableBody = categories.map((category) => [
    category.name,
    category.status ? "Aktif" : "Pasif",
    <div className="flex gap-2">
      <Button
        name={category.status ? "Pasif Yap" : "Aktif Yap"}
        click={() => handleToggleCategoryStatus(category.id)}
      />
      <Button name="Sil" click={() => handleDeleteCategory(category.id)} />
    </div>,
  ]);
  // ekleme fonksiyonu handleCreateCategory
  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold text-black">Kategori Yönetimi</h1>

        <div className=" w-full flex justify-end">
          <div className=" w-52">
            <Button name="Kategori Ekle" click={() => setModal(true)} />
          </div>
        </div>

        <BaseTable
          head={tableHead}
          body={tableBody}
          isLoading={isLoading}
          searchable={true}
        />
      </div>
      {modal === true ? (
        <Modal hideModal={() => setModal(false)}>
          <div className=" w-full flex flex-col gap-4 text-black">
            <Input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Kategori adı girin"
            />
            <div className=" w-52">
              <Button name="Kategori Ekle" click={() => handleCreateCategory()} />
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default CategoryManagementPage;
