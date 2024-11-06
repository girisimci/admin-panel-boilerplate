// pages/admin.js
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import UserForm from "@/components/user-form";
import UserTable from "@/components/user-table";

const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Mehmet Sait Işık", gender: "Erkek" },
    { id: 2, name: "Köpek Cesur Işık", gender: "Erkek" },
  ]);

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
      <div className="flex-1 p-10">
        <Header title="Users Management" />
        <UserForm onAddUser={handleAddUser} />
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Admin;
