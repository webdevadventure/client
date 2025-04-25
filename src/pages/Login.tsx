import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16 flex justify-center items-center">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-8">Đăng nhập</h1>

          <form className="space-y-6">
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

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button className="w-full bg-[#D9D9D9] text-black hover:bg-[#c4c4c4]">
              ĐĂNG NHẬP
            </Button>

            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Đăng ký ngay
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng nhập với
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
