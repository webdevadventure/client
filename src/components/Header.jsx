import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

export const Header = (props) => (
  <div className="flex items-center justify-between px-40 py-7 bg-[#edecfb] shadow-md">
    <div className="flex items-center gap-2">
      <img src="../public/favicon.svg" alt="Trọ Tốt Logo" className="h-20" />
    </div>

    <nav className="flex gap-40 text-xl font-normal font-Nunito mt-5">
      <a href="#" className="font-bold">
        {props.first}
      </a>
      <a href="#">{props.second}</a>
      <a href="#">{props.third}</a>
    </nav>

    <div className="flex items-center gap-10 mt-4">
      <div className="flex items-center border border-black rounded-xl bg-[#efebeb] px-4 py-2">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none w-40"
        />
        <FaSearch size={30} className="ml-2" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <FaUserCircle size={40} />
        <span className="text-sm">Tài khoản</span>
      </div>
    </div>
  </div>
);

export default Header;
