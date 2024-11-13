import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";

const menuItems = [
  {
    title: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#fff"
      >
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
      </svg>
    ),
    url: "/dashboard",
  },
  {
    title: "Users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#fff"
      >
        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
      </svg>
    ),
    url: "/users",
  },
  {
    title: "Payments",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
    ),
    url: "/payments",
  },
];

const SidebarLayout = ({ children }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div className="flex  h-screen">
      <div
        className={`${
          menuCollapsed ? "w-20" : "w-64"
        } bg-black text-white p-5 flex flex-col transition-all duration-300 ease-in-out`}
      >
        <button
          onClick={() => setMenuCollapsed(!menuCollapsed)}
          className="mb-6 text-start text-gray-400 hover:text-gray-200 transition"
        >
          {menuCollapsed ? "➤" : "←"}
        </button>

        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`text-lg font-medium flex items-center gap-3 ${
                router.pathname === item.url ? "px-2 font-bold text-xl underline" : null
              } transition-all duration-200 ease-in-out`}
            >
              <Link className href={item.url}>
                {item.icon}
              </Link>
              {!menuCollapsed && <Link href={item.url}>{item.title}</Link>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
      <Header username={"mehmet sait ışık"} />

        
        {children}
        
        </main>
    </div>
  );
};

export default SidebarLayout;
