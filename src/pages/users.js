import { useState } from "react";
import Modal from "@/components/commons/modal";
import BaseTable from "@/components/base-table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Mehmet Sait Işık", gender: "Erkek" },
    { id: 2, name: "Köpek Cesur Işık", gender: "Erkek" },
  ]);
  const [modal, setModal] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Kullanıcı adı zorunludur"),
    gender: yup.string().required("Cinsiyet zorunludur"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddUser = (newUser) => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: newUser.name,
        gender: newUser.gender,
      },
    ]);
    setModal(false);
    reset();
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <div className="flex flex-col w-full p-10 gap-2">
        <BaseTable
          head={[{ title: "Kişi Adı" }, { title: "Kişi Cinsiyeti" }]}
          isLoading={false}
          body={users?.map((item) => [item?.name, item?.gender])}
          searchable={true}
          automaticPagination={true}
          tableBtn={
            <div className="border border-black text-center p-1 rounded-lg w-20 my-2">
              <button onClick={() => setModal(true)}>Ekle</button>
            </div>
          }
        />

        {modal && (
          <Modal title="Yeni Kullanıcı Ekle" hideModal={() => setModal(false)}>
            <form onSubmit={handleSubmit(handleAddUser)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="border rounded w-full p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Cinsiyet</label>
                <select
                  {...register("gender")}
                  className="border rounded w-full p-2"
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 p-2 rounded w-full mt-4"
              >
                Ekle
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
