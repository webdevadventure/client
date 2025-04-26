import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type HeaderProps = {
  first: string;
  second: string;
  third: string;
};

export const Header: React.FC<HeaderProps> = ({ first, second, third }) => {
  const location = useLocation(); // Hook để lấy thông tin về route hiện tại
  const { user, isAuthenticated } = useAuth();

  // Function để kiểm tra xem một route có đang active hay không
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Function để tạo className cho nav link
  const getNavLinkClass = (path: string) => {
    const baseClass = "transition-colors duration-300 hover:text-gray-700";
    return `${baseClass} ${
      isActiveRoute(path) ? "font-bold text-black" : "font-normal text-gray-600"
    }`;
  };

  return (
    <div className="sticky top-0 z-999 flex items-center justify-between px-40 py-7 bg-[#edecfb] shadow-md text-black">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="/favicon.svg" alt="Trọ Tốt Logo" className="h-20" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex gap-40 text-xl font-Nunito mt-5">
        <Link to="/" className={getNavLinkClass("/")}>
          {first}
        </Link>
        <Link to="/news" className={getNavLinkClass("/news")}>
          {second}
        </Link>
        <Link to="/blog" className={getNavLinkClass("/blog")}>
          {third}
        </Link>
      </nav>

      {/* Search + User */}
      <div className="flex items-center gap-6">
        {/* Search box */}
        <div className="flex items-center border border-black rounded-xl bg-[#efebeb] px-4 py-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent outline-none w-40"
          />
          <FaSearch size={20} className="ml-2" />
        </div>

        {/* User Icon/Avatar */}
        {isAuthenticated && user ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-gray-700"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/default-avatar.png" alt={user.first_name} />
              <AvatarFallback>
                {user.first_name[0]}
                {user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {user.first_name} {user.last_name}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className={`flex flex-col items-center gap-1 hover:text-gray-700 ${
              isActiveRoute("/login") ? "text-black" : "text-gray-600"
            }`}
          >
            <FaUserCircle size={40} />
            <span className="text-sm">Tài khoản</span>
          </Link>
        )}
      </div>
    </div>
  );
};
