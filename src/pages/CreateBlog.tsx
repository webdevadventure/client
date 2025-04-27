import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { blogService, BlogCategory } from "../services/blog";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const CreateBlog: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để tạo bài viết!");
      navigate("/login");
      return;
    }
    const fetchCategories = async () => {
      const cats = await blogService.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      const res = await blogService.createPost({
        title,
        content,
        category,
        featured_image: featuredImage,
      });
      if (res) {
        toast.success("Tạo bài viết thành công!");
        navigate("/blog");
      } else {
        toast.error("Tạo bài viết thất bại!");
      }
    } catch {
      toast.error("Tạo bài viết thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-Nunito bg-[#f7f7fb] flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <main className="flex-grow flex justify-center items-center my-7">
        <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Tạo bài viết mới
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Ảnh minh họa (URL)
              </label>
              <Input
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg py-2"
              disabled={loading}
            >
              {loading ? "Đang đăng..." : "Đăng bài"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateBlog;
