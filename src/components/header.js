import { useState } from "react";
import Link from "next/link";

const Header = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className=" text-black border-b bg-white border-black px-6 py-4 flex justify-end items-center">

      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 focus:outline-none text-sm"
        >
          <span className="font-medium">{username}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06-.02L10 10.94l3.71-3.75a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
            <div className="px-4 py-2 border-b border-gray-700 text-sm text-gray-300">
              {username}
            </div>
            <ul className="text-sm">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-200"
                >
                  Hesap Bilgisi
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("Çıkış Yapılıyor...")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 transition duration-200"
                >
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
