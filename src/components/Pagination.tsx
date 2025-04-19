import React, { FC } from "react";

interface PaginationProps {
  totalPosts: number; // Tổng số bài viết
  postPerPage: number; // Số bài viết mỗi trang
  currentPage: number; // Trang hiện tại
  setCurrentPage: (page: number) => void; // Hàm thay đổi trang
}

export const Pagination: FC<PaginationProps> = ({
  totalPosts,
  postPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn về đầu trang
  };

  return (
    <div className="w-full flex justify-center items-center space-x-4 mb-6">
      {pages.map((page) => (
        <button
          key={page}
          className={`text-gray-700 font-semibold cursor-pointer w-8 h-8 ${
            page === currentPage
              ? "bg-gray-300 rounded-full flex items-center justify-center"
              : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
