import React from "react";

const Button = ({ name, click, disabled, type, styleType = "primary", width }) => {
  return (
    <button
      type={type}
      className={`button button-${styleType} ${disabled ? "button-disabled" : ""} ${
        width ? width : "w-full"
      }`}
      onClick={click}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
