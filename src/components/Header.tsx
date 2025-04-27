import React, { useState, useRef } from "react";
import { FaUserCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner";

type HeaderProps = {
  first: string;
  second: string;
  third: string;
};

export const Header: React.FC<HeaderProps> = ({ first, second, third }) => {
  const location = useLocation(); // Hook để lấy thông tin về route hiện tại
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

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

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "";
    const firstInitial = user.first_name
      ? user.first_name[0].toUpperCase()
      : "";
    const lastInitial = user.last_name ? user.last_name[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Get full name for display
  const getFullName = () => {
    if (!user) return "";
    return `${user.first_name} ${user.last_name}`.trim();
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất", {
      description: "Bạn đã đăng xuất khỏi hệ thống",
    });
  };

  // Dropdown hover handlers with delay
  const handleDropdownEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowDropdown(true);
  };
  const handleDropdownLeave = () => {
    hideTimeout.current = setTimeout(() => setShowDropdown(false), 250);
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

        {/* User Icon/Avatar with Dropdown */}
        {isAuthenticated && user ? (
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to={
                user.user_type === "landlord"
                  ? "/profile/landlord"
                  : "/profile/tenant"
              }
              className="flex items-center gap-2 hover:text-gray-700"
            >
              <Avatar className="h-10 w-10 bg-blue-500">
                <AvatarFallback className="bg-blue-500 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{getFullName()}</span>
            </Link>

            {showDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaSignOutAlt className="text-gray-500" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
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
