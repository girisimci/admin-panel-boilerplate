import { useState } from "react";
import Link from "next/link";

const Header = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className=" text-black border-b bg-white border-black px-6 py-4 flex justify-between items-center">
      <div className=" flex flex-col text-center justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M173.24-481.67q-39.24 0-66.24-27.09-27-27.09-27-66.33 0-39.24 27.09-66.24 27.1-27 66.34-27t66.24 27.09q27 27.09 27 66.33 0 39.24-27.1 66.24-27.09 27-66.33 27Zm183.33-166.66q-39.24 0-66.24-27.1-27-27.09-27-66.33 0-39.24 27.1-66.24 27.09-27 66.33-27Q396-835 423-807.91q27 27.1 27 66.34t-27.09 66.24q-27.1 27-66.34 27Zm246.67 0q-39.24 0-66.24-27.1-27-27.09-27-66.33Q510-781 537.09-808q27.1-27 66.34-27t66.24 27.09q27 27.1 27 66.34t-27.1 66.24q-27.09 27-66.33 27Zm183.33 166.66q-39.24 0-66.24-27.09-27-27.09-27-66.33 0-39.24 27.1-66.24 27.09-27 66.33-27 39.24 0 66.24 27.09 27 27.09 27 66.33 0 39.24-27.09 66.24-27.1 27-66.34 27ZM266-75q-43 0-71.17-32.52-28.16-32.51-28.16-76.81 0-45.34 28.83-80 28.83-34.67 59.83-67.34 24.34-25 44-53.5 19.67-28.5 40.67-56.5 26.67-38 60.33-69 33.67-31 79.67-31T560-511q34 30.67 60.67 69.34 20.66 27.99 40.16 56.33 19.5 28.33 43.84 53.66 31 32.67 59.83 67.34 28.83 34.66 28.83 80 0 44.3-28.16 76.81Q737-75 694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
        </svg>
        <span className=" font-bold">Cesur Wolf</span>
      </div>
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
