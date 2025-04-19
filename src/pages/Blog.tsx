import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import Article from "../components/Article";
import { Pagination } from "@/components/Pagination";

export const articles = [
  // ... giữ nguyên danh sách articles như bạn đã có
];

const POSTS_PER_PAGE = 6;

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const paginatedArticles = articles.slice(firstIndex, lastIndex);

  return (
    <div className="min-h-screen bg-white font-Nunito">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      {/* MAIN CONTENT */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Title + Action */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">HÃY CẢNH GIÁC!</h1>

          <button className="bg-[#0A72AD] text-white px-4 py-2 rounded-md hover:bg-[#085d8f] transition-colors">
            + Tạo bài viết
          </button>
        </div>

        {/* GRID OF ARTICLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
          {paginatedArticles.map((article, idx) => (
            <Article key={idx} {...article} />
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination
          totalPosts={articles.length}
          postPerPage={POSTS_PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
