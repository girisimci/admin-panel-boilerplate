import React from "react";

const Button = ({ name, click, variant = "primary", disabled = false }) => {
  const baseClasses = "px-4 py-2 rounded font-semibold transition-colors";
  const variantClasses = {
    primary: "bg-gray-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={click}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {name}
    </button>
  );
};

export default Button;