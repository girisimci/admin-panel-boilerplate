// components/Sidebar.js
import { useState } from "react";

const Sidebar = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  return (
    <div
      className={`${
        menuCollapsed ? "w-20" : "w-64"
      } bg-black text-white p-5 flex flex-col transition-all duration-300`}
    >
      <button
        onClick={() => setMenuCollapsed(!menuCollapsed)}
        className="mb-6 text-start text-gray-400 hover:text-gray-200 transition"
      >
        {menuCollapsed ? "➤" : "←"}
      </button>

      <h2
        className={`text-2xl font-bold mb-6 transition-opacity duration-300 ${
          menuCollapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        CMS Admin
      </h2>

      <ul className="space-y-6">
        <li className="text-lg font-medium flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>{" "}
          {!menuCollapsed && <a href="#">Dashboard</a>}
        </li>
        <li className="text-lg font-medium flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>{" "}
          {!menuCollapsed && <a href="#">Users</a>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
