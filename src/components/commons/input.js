import React from "react";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-black text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;
