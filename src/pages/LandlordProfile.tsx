import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../config/api";

export const LandlordProfile = () => {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  // State cho các trường cần gửi API
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [phone, setPhone] = useState("");
  // State cho các trường UI (không gửi API)
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await axios.patch(
        API_ENDPOINTS.USER_DETAIL(user.id),
        {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      toast.success("Cập nhật thành công!");
    } catch {
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16">
        <Tabs defaultValue="thongtin" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-4 bg-white">
            <TabsTrigger
              value="thongtin"
              className="data-[state=active]:bg-[#edecfb]"
            >
              Thông tin
            </TabsTrigger>
            <TabsTrigger
              value="daluu"
              className="data-[state=active]:bg-[#edecfb]"
            >
              Đã lưu
            </TabsTrigger>
            <TabsTrigger
              value="baiviet"
              className="data-[state=active]:bg-[#edecfb]"
            >
              Bài viết
            </TabsTrigger>
            <TabsTrigger
              value="baidang"
              className="data-[state=active]:bg-[#edecfb]"
            >
              Bài đăng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="thongtin" className="mt-12">
            <div className="flex gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 border-4 border-green-500">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-0 bg-green-500 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </h2>
                <Button
                  variant="outline"
                  className="w-full bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  onClick={() => navigate("/create-listing")}
                >
                  + Tạo bài đăng
                </Button>
              </div>

              {/* Form Section */}
              <div className="flex-grow">
                <form className="grid grid-cols-3 gap-6" onSubmit={handleSave}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Họ</label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tên</label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phường/Xã</label>
                    <Input
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quận/Huyện</label>
                    <Input
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tỉnh/Thành phố
                    </label>
                    <Input
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="bg-[#F8F8F8]"
                    />
                  </div>
                  <div className="space-y-2 col-span-3">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={user?.email || ""}
                      className="w-1/3 bg-[#F8F8F8]"
                      disabled
                    />
                  </div>
                  <div className="col-span-3 mt-6 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#D9D9D9] text-black hover:bg-[#c4c4c4] w-32"
                    >
                      LƯU
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="daluu" className="mt-12">
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
              Chưa có bài viết nào được lưu
            </div>
          </TabsContent>

          <TabsContent value="baiviet" className="mt-12">
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
              Chưa có bài viết nào
            </div>
          </TabsContent>

          <TabsContent value="baidang" className="mt-12">
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
              Chưa có bài đăng nào
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default LandlordProfile;
