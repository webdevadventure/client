import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

export const Header = (props) => (
  <div className="flex items-center justify-between px-10 py-4 bg-[#edecfb] shadow-md">
    <div className="flex items-center gap-2">
      <img src="../public/logo.png" alt="Trọ Tốt Logo" className="h-12" />
    </div>

    <nav className="flex gap-10 text-lg font-medium">
      <a href="#" className="font-bold">
        {props.first}
      </a>
      <a href="#">{props.second}</a>
      <a href="#">{props.third}</a>
    </nav>

    <div className="flex items-center gap-6">
      <div className="flex items-center border border-black rounded-xl bg-[#efebeb] px-4 py-2">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none w-40"
        />
        <FaSearch className="ml-2" />
      </div>
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-3xl" />
        <span className="text-lg">Tài khoản</span>
      </div>
    </div>
  </div>
);

export default Header;
