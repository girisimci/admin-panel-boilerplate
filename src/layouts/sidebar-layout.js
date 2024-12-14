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
    title: "Categories",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
    ),
    url: "/categories",
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
    title: "Blogs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
    ),
    url: "/blog",
  },
  {
    title: "Payments",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
      </svg>
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
                router.pathname === item.url
                  ? "px-2 font-bold text-xl underline"
                  : null
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
