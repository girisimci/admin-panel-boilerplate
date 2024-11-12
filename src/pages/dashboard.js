// pages/admin.js
import { useState } from "react";
import Header from "@/components/header";
import Modal from "@/components/commons/modal";
import BaseTable from "@/components/base-table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SidebarLayout from "@/layouts/sidebar-layout";


const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Mehmet Sait Işık", gender: "Erkek" },
    { id: 2, name: "Köpek Cesur Işık", gender: "Erkek" },
  ]);
  const [modal, setModal] = useState(false);

  
  return (
   <SidebarLayout>
   <div className="flex h-screen bg-white text-black">
    
   test
    </div>
    </SidebarLayout>
  );
};

export default Admin;
