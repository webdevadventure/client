import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16 flex justify-center items-center">
        <div className="w-[500px] bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Quên mật khẩu
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-[#F8F8F8]"
              />
            </div>

            <Button className="w-full bg-[#D9D9D9] text-black hover:bg-[#c4c4c4]">
              GỬI LINK ĐẶT LẠI MẬT KHẨU
            </Button>

            <div className="text-center text-sm text-gray-600">
              Nhớ ra mật khẩu?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
