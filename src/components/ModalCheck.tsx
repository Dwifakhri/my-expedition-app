import React, { useState, useMemo, useEffect, useRef } from "react";
import Close from "../../public/assets/icons/close.svg";
import Image from "next/image";
interface ModalCheckProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ModalCheck: React.FC<ModalCheckProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<any>({
    origin: false,
    destination: false,
    courier: false,
  });
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [courier, setCourier] = useState<string>("");
  const dropdownRefs = {
    origin: useRef<HTMLDivElement>(null),
    destination: useRef<HTMLDivElement>(null),
    courier: useRef<HTMLDivElement>(null),
  };
  // const [form, setForm] = useState<any>({
  //   origin: "",
  //   destination: "",
  //   weight: 0,
  //   courier: "",
  // });

  // const from

  const toggleDropdown = (data: string) => {
    setIsDropdownOpen((prevState: any) => ({
      ...prevState,
      [data]: !prevState[data],
    }));
  };

  const selectOption = (option: string, dropdown: string) => {
    setIsDropdownOpen((prevState: any) => ({
      ...prevState,
      [dropdown]: false,
    }));
    if (dropdown === "origin") {
      setOrigin(option);
    } else if (dropdown === "destination") {
      setDestination(option);
    } else {
      setCourier(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs).forEach((key) => {
        const ref = dropdownRefs[key as keyof typeof dropdownRefs];
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsDropdownOpen((prevState: any) => ({
            ...prevState,
            [key]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkPrice = (e: any) => {
    e.preventDefault();
  };

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 text-left"
        role="dialog"
        aria-modal="true">
        <div className="relative bg-white rounded-lg shadow w-full max-w-md">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Check the price
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center ">
              <Image
                src={Close}
                alt="arrow alt"
                style={{ width: "auto", height: "auto" }}
                width={15}
                height={15}
              />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form
              onSubmit={(e: any) => checkPrice(e)}
              className="max-w-md mx-auto">
              <div
                ref={dropdownRefs.origin}
                className="relative w-full mb-5 group">
                <input
                  type="text"
                  name="floating_origin"
                  id="floating_origin"
                  value={origin}
                  onClick={() => toggleDropdown("origin")}
                  readOnly
                  className="z-10 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_origin"
                  className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Origin
                </label>
                {isDropdownOpen.origin && (
                  <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded shadow-md z-[1000] h-48 overflow-y-auto">
                    {[
                      "DHL",
                      "FedEx",
                      "UPS",
                      "USPS",
                      "DHL",
                      "FedEx",
                      "UPS",
                      "USPS",
                      "DHL",
                      "FedEx",
                      "UPS",
                      "USPS",
                    ].map((option, i) => (
                      <li
                        key={i}
                        onClick={() => selectOption(option, "origin")}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                ref={dropdownRefs.destination}
                className="relative w-full mb-5 group">
                <input
                  type="text"
                  name="floating_destination"
                  id="floating_destination"
                  value={destination}
                  onClick={() => toggleDropdown("destination")}
                  readOnly
                  className="z-10 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_destination"
                  className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Destination
                </label>
                {isDropdownOpen.destination && (
                  <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded shadow-md z-[1000] h-48 overflow-y-auto">
                    {["DHL", "FedEx", "UPS", "USPS"].map((option) => (
                      <li
                        key={option}
                        onClick={() => selectOption(option, "destination")}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-10 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_weight"
                    id="floating_weight"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_weight"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Weight (kg)
                  </label>
                </div>
                <div
                  ref={dropdownRefs.courier}
                  className="relative w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_courier"
                    id="floating_courier"
                    value={courier}
                    onClick={() => toggleDropdown("courier")}
                    readOnly
                    className="z-10 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_courier"
                    className="z-10 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Courier
                  </label>

                  {isDropdownOpen.courier && (
                    <ul className="absolute top-10 left-0 w-full bg-white border border-gray-300 rounded shadow-md h-32 overflow-y-auto">
                      {["DHL", "FedEx", "UPS", "USPS"].map((option) => (
                        <li
                          key={option}
                          onClick={() => selectOption(option, "courier")}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 text-white bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                Check
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalCheck;
