import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
//import { useParams } from "react-router-dom";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export const BlogPage = () => {
  //const { id } = useParams(); // Get blog post ID from URL

  // TODO: Fetch blog data using id
  const blogData = {
    title: "10 điều cần lưu ý khi thuê trọ cho sinh viên",
    author: "Nguyễn Văn A",
    date: "20 tháng 3, 2024",
    readTime: "5 phút đọc",
    categories: ["Mẹo thuê trọ", "Kinh nghiệm"],
    image: "/blog-1.jpg",
    content: `
      <p>Thuê trọ là một trong những vấn đề quan trọng đối với sinh viên. Bài viết này sẽ chia sẻ những kinh nghiệm quý báu giúp bạn tìm được phòng trọ ưng ý...</p>
      
      <h2>1. Xác định ngân sách</h2>
      <p>Trước khi bắt đầu tìm phòng trọ, bạn cần xác định rõ khả năng tài chính của mình. Hãy cân nhắc các chi phí như: tiền thuê nhà, tiền điện nước, tiền internet, và các chi phí phát sinh khác.</p>
      
      <h2>2. Khảo sát khu vực</h2>
      <p>Nên tìm hiểu kỹ về khu vực bạn dự định thuê trọ. Đặc biệt chú ý đến:</p>
      <ul>
        <li>Khoảng cách đến trường học</li>
        <li>An ninh khu vực</li>
        <li>Các tiện ích xung quanh</li>
        <li>Phương tiện di chuyển</li>
      </ul>
      
      <h2>3. Kiểm tra cơ sở vật chất</h2>
      <p>Đừng quên kiểm tra kỹ các vấn đề sau:</p>
      <ul>
        <li>Hệ thống điện, nước</li>
        <li>Tình trạng tường, trần nhà</li>
        <li>Nhà vệ sinh</li>
        <li>Nơi để xe</li>
      </ul>
    `,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16 font-Nunito">
        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {blogData.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded bg-[#edecfb] text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <i className="fas fa-user"></i>
              {blogData.author}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-calendar"></i>
              {blogData.date}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-clock"></i>
              {blogData.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
        </article>

        {/* Share Buttons */}
        <div className="mt-12 flex items-center gap-4">
          <span className="text-gray-600">Chia sẻ bài viết:</span>
          <button className="p-2 rounded-full bg-[#edecfb] hover:bg-[#e0dfed] transition-colors">
            <FaFacebook />
          </button>
          <button className="p-2 rounded-full bg-[#edecfb] hover:bg-[#e0dfed] transition-colors">
            <FaTwitter />
          </button>
          <button className="p-2 rounded-full bg-[#edecfb] hover:bg-[#e0dfed] transition-colors">
            <FaLinkedinIn />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
