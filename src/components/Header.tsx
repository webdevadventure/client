import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

type HeaderProps = {
  first: string;
  second: string;
  third: string;
};

export const Header: React.FC<HeaderProps> = ({ first, second, third }) => (
  <div className="flex items-center justify-between px-40 py-7 bg-[#edecfb] shadow-md text-black">
    {/* Logo */}
    <div className="flex items-center gap-2">
      <img src="/favicon.svg" alt="Trọ Tốt Logo" className="h-20" />
    </div>

    {/* Navigation */}
    <nav className="flex gap-40 text-xl font-normal font-Nunito mt-5">
      <a href="#" className="font-bold">
        {first}
      </a>
      <a href="#">{second}</a>
      <a href="#">{third}</a>
    </nav>

    {/* Search + User */}
    <div className="flex items-center gap-10 mt-4">
      {/* Search box */}
      <div className="flex items-center border border-black rounded-xl bg-[#efebeb] px-4 py-2">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none w-40"
        />
        <FaSearch size={20} className="ml-2" />
      </div>

      {/* User Icon */}
      <div className="flex flex-col items-center gap-1">
        <FaUserCircle size={40} />
        <span className="text-sm">Tài khoản</span>
      </div>
    </div>
  </div>
);

export default Header;
