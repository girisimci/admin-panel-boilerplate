import { EyeCloseIcon, EyeOpenIcon } from "@/assets/icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Input = (props) => {
  const {
    id,
    type,
    label,
    name,
    error,
    placeholder,
    onChange,
    onKeyUp,
    onKeyDown,
    value,
    checked,
    className,
    textarea,
    labeltwo,
    rows,
    moduleType,
    price,
    disabled,
  } = props;
  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  const virtualType = useMemo(
    () => (type === "password" ? (show ? "text" : "password") : type || "text"),
    [type, show]
  );

  let inputModuleBgClass = null;
  if (moduleType == "account") {
    inputModuleBgClass = "bg-[#CCC]";
  } else {
    inputModuleBgClass = "bg-[#F0F0F0]";
  }

  return (
    <>
      {type != "checkbox" && type != "radio" && label ? (
        <label
          htmlFor={name}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
        >
          {label}
        </label>
      ) : (
        labeltwo && (
          <label
            htmlFor={name}
            className="  text-gray-700 tracking-wide text-xs mt-2 "
          >
            {labeltwo}
          </label>
        )
      )}
      {textarea ? (
        <>
          <textarea
            id={name}
            name={name}
            type={virtualType}
            placeholder={placeholder}
            checked={checked}
            className={
              type === "checkbox" || type === "radio"
                ? " rounded-full w-5 h-5 ease-soft text-base rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 mr-2 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100 border-black"
                : className ||
                  `w-full px-4 py-2 text-base ${inputModuleBgClass} rounded outline-none placeholder:text-gray-600 placeholder:text-xs lg:placeholder:text-base relative ${
                    textarea && "  h-full"
                  }`
            }
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            value={value}
            rows={rows ? rows : "4"}
          />
        </>
      ) : price ? (
        <div class="flex flex-col">
          <label
            htmlFor="price"
            class="mt-4 mb-1  text-[#383838] text-base font-bold"
          >
            Set Price
          </label>
          <div class="flex flex-row gap-2">
            <span class="flex items-center text-[#383838] bg-[#F0F0F0] rounded-lg px-3 font-bold text-grey-darker">
              $
            </span>
            <input
              type="number"
              placeholder="000"
              name="price"
              value={value}
              onChange={onChange}
              onKey
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              class=" bg-[#F0F0F0] pl-2 text-[#383838]  py-2  rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
            />
          </div>
        </div>
      ) : (
        <div className=" relative">
          <input
            id={type == "radio" ? id : name}
            name={name}
            type={virtualType}
            placeholder={placeholder}
            checked={checked}
            className={
              type === "checkbox" || type === "radio"
                ? " rounded-full w-5 h-5 ease-soft text-base rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 mr-2 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100 border-black"
                : className ||
                  `w-full px-4 py-2 text-base ${inputModuleBgClass} rounded outline-none placeholder:text-gray-600 placeholder:text-xs lg:placeholder:text-base relative ${
                    textarea && "  h-full"
                  }`
            }
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            disabled={disabled != undefined ? disabled : false}
            defaultValue={value}
          />
          {type === "password" && (
            <button
              type="button"
              className=" absolute right-0 my-3 mx-2 "
              onClick={handleShow}
            >
              {show ? <EyeOpenIcon /> : <EyeCloseIcon />}
            </button>
          )}
        </div>
      )}

      {type == "checkbox" ||
        (type == "radio" && (
          <label htmlFor={name} className=" ml-2 text-gray-800">
            {label}
          </label>
        ))}

      {error && (
        <span className="text-sm text-red-600 block mt-1">{error}</span>
      )}
    </>
  );
};

export default Input;
