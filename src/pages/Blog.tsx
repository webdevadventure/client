import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import Article from "../components/Article";
import { Pagination } from "@/components/Pagination";
import { useAuth } from "../contexts/AuthContext";
import { blogService, BlogPost } from "../services/blog";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";

// Interface for fallback articles
interface FallbackArticle {
  id: string;
  picURL: string;
  title: string;
  date: string;
  author: string;
}

// Fallback data in case API is not available
const fallbackArticles: FallbackArticle[] = [
  {
    id: "1",
    picURL: "/images/article1.jpg",
    title: "Những hình thức lừa đảo khi thuê phòng trọ và cách phòng tránh",
    date: "14/2/2025",
    author: "Tungdz",
  },
  {
    id: "2",
    picURL: "/images/article2.jpg",
    title: "Mẹo thuê phòng trọ an toàn cho sinh viên năm nhất",
    date: "10/2/2025",
    author: "Tungdz",
  },
  {
    id: "3",
    picURL: "/images/article3.jpg",
    title: "Cảnh báo: Chiêu trò cọc giữ chỗ ảo phổ biến năm 2025",
    date: "08/2/2025",
    author: "Tungdz",
  },
  {
    id: "4",
    picURL: "/images/article4.jpg",
    title: "Kinh nghiệm thuê phòng không qua trung gian",
    date: "05/2/2025",
    author: "Tungdz",
  },
  {
    id: "5",
    picURL: "/images/article5.jpg",
    title: "TOP 5 website uy tín giúp tìm phòng trọ giá tốt",
    date: "03/2/2025",
    author: "Tungdz",
  },
  {
    id: "6",
    picURL: "/images/article6.jpg",
    title: "Thủ đoạn giả chủ nhà lừa đảo người thuê mới",
    date: "30/1/2025",
    author: "Tungdz",
  },
  {
    id: "7",
    picURL: "/images/article7.jpg",
    title: "Hướng dẫn xem nhà trọ an toàn và hiệu quả",
    date: "28/1/2025",
    author: "Tungdz",
  },
  {
    id: "8",
    picURL: "/images/article8.jpg",
    title: "Những giấy tờ cần thiết khi ký hợp đồng thuê trọ",
    date: "25/1/2025",
    author: "Tungdz",
  },
  {
    id: "9",
    picURL: "/images/article9.jpg",
    title: "Lưu ý về các khoản phí phát sinh khi thuê phòng",
    date: "22/1/2025",
    author: "Tungdz",
  },
  {
    id: "10",
    picURL: "/images/article10.jpg",
    title: "Tổng hợp các quận dễ thuê phòng ở TP.HCM",
    date: "20/1/2025",
    author: "Tungdz",
  },
  {
    id: "11",
    picURL: "/images/article11.jpg",
    title: "Phân biệt hợp đồng miệng và hợp đồng văn bản khi thuê nhà",
    date: "18/1/2025",
    author: "Tungdz",
  },
  {
    id: "12",
    picURL: "/images/article12.jpg",
    title: "Checklist kiểm tra nhà trọ trước khi ký hợp đồng",
    date: "15/1/2025",
    author: "Tungdz",
  },
];

const POSTS_PER_PAGE = 6;

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = !!authService.getAccessToken();
      setIsUserAuthenticated(hasToken);
      console.log("Auth check:", {
        contextIsAuthenticated: isAuthenticated,
        serviceHasToken: hasToken,
        user,
      });
    };

    checkAuth();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { posts: fetchedPosts, total } = await blogService.getPosts(
          currentPage,
          POSTS_PER_PAGE,
          undefined,
          undefined,
          undefined,
          "-posting_date", // Sort by newest first
        );

        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
          setTotalPosts(total);
        } else {
          // If no posts from API, use fallback data
          // Convert fallback articles to BlogPost format
          const convertedPosts: BlogPost[] = fallbackArticles.map(
            (article) => ({
              id: article.id,
              title: article.title,
              content: "",
              featured_image: article.picURL,
              category: "1", // Default category
              author: article.author,
              posting_date: new Date().toISOString(), // Use current date as fallback
              updated_at: new Date().toISOString(),
            }),
          );

          setPosts(convertedPosts);
          setTotalPosts(fallbackArticles.length);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
        // Use fallback data on error
        // Convert fallback articles to BlogPost format
        const convertedPosts: BlogPost[] = fallbackArticles.map((article) => ({
          id: article.id,
          title: article.title,
          content: "",
          featured_image: article.picURL,
          category: "1", // Default category
          author: article.author,
          posting_date: new Date().toISOString(), // Use current date as fallback
          updated_at: new Date().toISOString(),
        }));

        setPosts(convertedPosts);
        setTotalPosts(fallbackArticles.length);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleCreateArticle = () => {
    navigate("/blog/create");
  };

  // Format date from API format to display format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen font-Nunito">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      {/* MAIN CONTENT */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Title + Action */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">HÃY CẢNH GIÁC!</h1>

          {isUserAuthenticated && (
            <button
              className="bg-[#0A72AD] text-white px-4 py-2 rounded-md hover:bg-[#085d8f] transition-colors"
              onClick={handleCreateArticle}
            >
              + Tạo bài viết
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A72AD]"></div>
          </div>
        ) : (
          <>
            {/* GRID OF ARTICLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
              {posts.map((post) => (
                <Article
                  key={post.id}
                  id={post.id}
                  picURL={
                    post.featured_image || "/images/article-placeholder.jpg"
                  }
                  title={post.title}
                  date={formatDate(post.posting_date)}
                  author={post.author}
                />
              ))}
            </div>

            {/* PAGINATION */}
            <Pagination
              totalPosts={totalPosts}
              postPerPage={POSTS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
