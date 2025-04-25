import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16 flex justify-center items-center">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-8">Đăng ký</h1>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Họ</label>
                <Input placeholder="Nhập họ của bạn" className="bg-[#F8F8F8]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tên</label>
                <Input
                  placeholder="Nhập tên của bạn"
                  className="bg-[#F8F8F8]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-[#F8F8F8]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                className="bg-[#F8F8F8]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Xác nhận mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="bg-[#F8F8F8]"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </Link>
              </span>
            </div>

            <Button className="w-full bg-[#D9D9D9] text-black hover:bg-[#c4c4c4]">
              ĐĂNG KÝ
            </Button>

            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <FaGoogle className="w-5 h-5 mr-2"></FaGoogle>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <FaFacebook className="w-5 h-5 mr-2"></FaFacebook>
                Facebook
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
