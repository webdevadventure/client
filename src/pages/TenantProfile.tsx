import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export const TenantProfile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow px-40 py-16">
        <Tabs defaultValue="thongtin" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-3 bg-white">
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
          </TabsList>

          <TabsContent value="thongtin" className="mt-12">
            <div className="flex gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">Anh Liêm</h2>
                <Button variant="outline" className="w-full">
                  Xác minh danh tính
                </Button>
              </div>

              {/* Form Section */}
              <div className="flex-grow">
                <form className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Họ</label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tên</label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phường/Xã</label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quận/Huyện</label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tỉnh/Thành phố
                    </label>
                    <Input defaultValue="" className="bg-[#F8F8F8]" />
                  </div>
                  <div className="space-y-2 col-span-3">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="" className="w-1/3 bg-[#F8F8F8]" />
                  </div>
                </form>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-[#D9D9D9] text-black hover:bg-[#c4c4c4] w-32">
                    LƯU
                  </Button>
                </div>
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
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default TenantProfile;
