import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import Article from "../components/Article";
import { Pagination } from "@/components/Pagination";

const articles = [
  {
    picURL: "/images/article1.jpg",
    title: "Những hình thức lừa đảo khi thuê phòng trọ và cách phòng tránh",
    date: "14/2/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article2.jpg",
    title: "Mẹo thuê phòng trọ an toàn cho sinh viên năm nhất",
    date: "10/2/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article3.jpg",
    title: "Cảnh báo: Chiêu trò cọc giữ chỗ ảo phổ biến năm 2025",
    date: "08/2/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article4.jpg",
    title: "Kinh nghiệm thuê phòng không qua trung gian",
    date: "05/2/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article5.jpg",
    title: "TOP 5 website uy tín giúp tìm phòng trọ giá tốt",
    date: "03/2/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article6.jpg",
    title: "Thủ đoạn giả chủ nhà lừa đảo người thuê mới",
    date: "30/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article7.jpg",
    title: "Hướng dẫn xem nhà trọ an toàn và hiệu quả",
    date: "28/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article8.jpg",
    title: "Những giấy tờ cần thiết khi ký hợp đồng thuê trọ",
    date: "25/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article9.jpg",
    title: "Lưu ý về các khoản phí phát sinh khi thuê phòng",
    date: "22/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article10.jpg",
    title: "Tổng hợp các quận dễ thuê phòng ở TP.HCM",
    date: "20/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article11.jpg",
    title: "Phân biệt hợp đồng miệng và hợp đồng văn bản khi thuê nhà",
    date: "18/1/2025",
    author: "Tungdz",
  },
  {
    picURL: "/images/article12.jpg",
    title: "Checklist kiểm tra nhà trọ trước khi ký hợp đồng",
    date: "15/1/2025",
    author: "Tungdz",
  },
];

const POSTS_PER_PAGE = 6;

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * POSTS_PER_PAGE;
  const firstIndex = lastIndex - POSTS_PER_PAGE;
  const paginatedArticles = articles.slice(firstIndex, lastIndex);

  return (
    <div className="min-h-screen font-Nunito">
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
