import { useRef, useState, useEffect } from "react";

interface InputDropdownProps {
  options: Array<any>;
  value: any;
  label: string;
  id: string;
  setValue: (value: string) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  options,
  value,
  label,
  setValue,
  id,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRefs = useRef<HTMLDivElement>(null);

  const selectOption = (option: any) => {
    setValue(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ref = dropdownRefs;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRefs} className="relative w-full mb-5 group">
      <input
        type="text"
        name={id}
        id={id}
        value={label === "city" || label === "province" ? value?.name : value}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        readOnly
        className="capitalize z-10 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className="z-10 block peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize">
        {label}
      </label>

      {isDropdownOpen && options.length > 0 && (
        <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded shadow-md h-32 overflow-y-auto z-[1000]">
          {options.map((option: any, i) =>
            label === "province" ? (
              <li
                key={i}
                onClick={() =>
                  selectOption({
                    id: option.province_id,
                    name: option.province,
                  })
                }
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-[13px]">
                {option.province}
              </li>
            ) : label === "city" ? (
              <li
                key={i}
                onClick={() =>
                  selectOption({
                    id: option.city_id,
                    name: option.city_name,
                  })
                }
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-[13px]">
                {option.type} {option.city_name}
              </li>
            ) : (
              <li
                key={i}
                onClick={() => selectOption(option)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 capitalize text-[13px]">
                {option}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
