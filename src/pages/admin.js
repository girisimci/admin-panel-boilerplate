// pages/admin.js
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import UserForm from "@/components/user-form";
import UserTable from "@/components/user-table";
import Modal from "@/components/commons/modal";
import BaseTable from "@/components/base-table";

const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Mehmet Sait Işık", gender: "Erkek" },
    { id: 2, name: "Köpek Cesur Işık", gender: "Erkek" },
  ]);
  const [modal, setModal] = useState(false);
  const handleAddUser = (newUser) => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: newUser.name,
        gender: newUser.gender,
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full p-10 gap-2">
        <Header title="Users Management" />
        <UserForm onAddUser={handleAddUser} />
        <UserTable onEdit={()=>setModal(!modal)} users={users} />
          <BaseTable
                head={[
                    { title: "Ürün Id" },
                    { title: "Ürün Adı" },
                ]}
                isLoading={false}
                body={users?.map((item) => [
                    item?.name,
                    item?.gender,
                ])}
                searchable={true}
                automaticPagination={true}
                tableBtn={
                    <div className=" border border-black text-center p-1 rounded-lg w-20 my-2">
                      <button>button</button>
                    </div>

                }
            />
        {modal && <Modal title={"başlık"} hideModal={() => setModal(!modal)} />}
      </div>
    </div>
  );
};

export default Admin;
