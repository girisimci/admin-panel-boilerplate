// components/UserForm.js
import { useState } from "react";
import Input from "./commons/input";

const UserForm = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({ name: "", specialization: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(newUser);
    setNewUser({ name: "", specialization: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 bg-gray-100 p-6 rounded-lg shadow-md mb-10"
    >
      <Input
        type="text"
        className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-500 transition"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <Input
        type="text"
        className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:border-gray-500 transition"
        placeholder="Specialization"
        value={newUser.specialization}
        onChange={(e) =>
          setNewUser({ ...newUser, specialization: e.target.value })
        }
      />
      <button
        type="submit"
        className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-md transition"
      >
        Add User
      </button>
    </form>
  );
};
export default UserForm;
