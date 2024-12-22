import React from "react";

const Button = ({ name, click,disabled, type, isOfferButton,width }) => {
  let backgroundClass = ''
  if(isOfferButton) {
    backgroundClass = "bg-[#5F7E5F]"
  } else {
    if(disabled) {
      backgroundClass = "bg-gray-800" 
    } else {
      backgroundClass = " bg-black text-white"
    }
  }
  return (
    <button
      type={type}
      className= {`${width ? width : 'w-full'} min-w-[93px]  min-h-[31px] ${backgroundClass} hover:bg-gray-800 hover:text-white text-white rounded-md py-2 text-lg font-medium my-2 border border-white p-2 transition duration-700 ease-in-out `}
      onClick={click}
    >
      {name}
    </button>
  );
};

export default Button;