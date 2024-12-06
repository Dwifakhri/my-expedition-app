"use client";

import { useState, useRef } from "react";
import Logo from "../../public/assets/icons/logo.svg";
import Menu from "../../public/assets/icons/menu.svg";
import Cross from "../../public/assets/icons/cross.svg";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="top-0 absolute w-full bg-white drop-shadow-md drop-shadow">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center py-5">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Image src={Logo} alt="logo" priority />
            <div
              className="block md:hidden cursor-pointer hover:opacity-80"
              onClick={() => setOpen(!open)}>
              <Image src={open ? Cross : Menu} alt="action" />
            </div>
          </div>
          <ul
            className={`flex flex-col md:flex-row gap-y-5 md:gap-x-5 lg:gap-x-[5rem] justify-end items-start md:items-center w-full md:mt-0 md:ml-[5rem] 
              transition-all text-sm overflow-hidden md:overflow-visible duration-500 ease-in-out ${
                open
                  ? "mt-4 max-md:h-none overflow-visible"
                  : "max-h-0 md:max-h-none"
              }`}>
            <li>
              <a href="#" className="cursor-pointer hover:text-primary">
                Prices
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer hover:text-primary">
                Tracking
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer hover:text-primary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
