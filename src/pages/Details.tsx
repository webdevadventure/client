import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "../components/Card";
import {
  Phone,
  MessageCircle,
  BadgeCheck,
  MapPin,
  ChevronLeft,
} from "lucide-react";

type Apartment = {
  title: string;
  picURL: string;
  price: number | string;
  area: number | string;
  addr: string;
  type: string;
};

const fakeData: Apartment[] = [
  {
    title: "Cho thuê chung cư ở Gò Vấp",
    picURL: "https://cdn.example.com/images/room1.jpg",
    price: "7.5",
    area: "54",
    addr: "Q. Gò Vấp, TP HCM",
    type: "Căn hộ/Chung cư",
  },
  {
    title: "Căn hộ mini tiện nghi",
    picURL: "https://cdn.example.com/images/room2.jpg",
    price: "6",
    area: "40",
    addr: "Q. Tân Bình, TP HCM",
    type: "Căn hộ/Chung cư",
  },
  {
    title: "Chung cư cao cấp view đẹp",
    picURL: "https://cdn.example.com/images/room3.jpg",
    price: "10",
    area: "65",
    addr: "Q. Bình Thạnh, TP HCM",
    type: "Căn hộ/Chung cư",
  },
  {
    title: "Phòng đẹp gần Đại học Văn Lang",
    picURL: "https://cdn.example.com/images/room4.jpg",
    price: "5.5",
    area: "35",
    addr: "Q. Gò Vấp, TP HCM",
    type: "Căn hộ mini",
  },
];

export const Details: React.FC = () => {
  const hostName = "Anh Tuấn";

  return (
    <div className="font-Nunito">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="ml-40 mt-10">
        {/* PHOTOS */}
        <section className="flex items-center gap-[200px]">
          <div className="grid grid-cols-4 grid-rows-3 gap-3 w-[825px]">
            <img
              src="https://images.unsplash.com/photo-1743883325575-783014a39a8b?q=80&w=1887&auto=format&fit=crop"
              alt="Ảnh chính căn hộ"
              className="col-span-4 row-span-2 object-cover w-full aspect-[21/10] rounded-sm border-2 border-black"
            />
            {[
              "https://images.unsplash.com/photo-1630070800055-3a855da32b7a",
              "https://images.unsplash.com/photo-1596480164774-39a55fd65d6d",
              "https://plus.unsplash.com/premium_photo-1666717889624-85804af29b37",
              "https://images.unsplash.com/photo-1534670022376-eb2368089516",
            ].map((url, i) => (
              <img
                key={i}
                src={`${url}?w=600&auto=format&fit=crop&q=60`}
                alt={`Ảnh ${i + 1}`}
                className="object-cover w-full aspect-square rounded-sm"
              />
            ))}
          </div>

          {/* OWNER CONTACT */}
          <div className="flex flex-col space-y-3 items-center">
            <p className="text-[30px] font-semibold">
              Chủ nhà: <span className="text-[#9b0505] mr-2">{hostName}</span>
              <img src="/authenticated.svg" className="inline" />
            </p>

            <Button className="w-[238px] bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg shadow-md py-2">
              <Phone className="w-5 h-5 mr-2" />
              0123456xxx
            </Button>

            <Button className="w-[238px] bg-blue-500 hover:bg-blue-600 text-white text-base font-medium rounded-lg shadow-md">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </div>
        </section>

        {/* TITLE, PRICE, ADDRESS */}
        <section className="grid auto-rows-auto mt-10">
          <div className="flex items-center gap-2">
            <h2 className="text-[30px] font-semibold">
              Cho thuê chung cư ở Gò Vấp
            </h2>
            <span className="bg-green-200 text-green-800 font-medium px-3 py-1 rounded-full flex items-center">
              <BadgeCheck className="w-4 h-4 mr-1" />
              Đã xác thực
            </span>
          </div>

          <div className="font-semibold text-lg mb-1.5">
            <span>7,5 triệu/tháng</span>
            <span className="mx-2">|</span>
            <span className="text-[#e7193b]">
              54 m<sup>2</sup>
            </span>
          </div>

          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>124 Phan Văn Trị, Q. Gò Vấp, TP. Hồ Chí Minh</span>
          </div>
        </section>

        {/* THÔNG TIN CHI TIẾT */}
        <section className="grid grid-cols-2 gap-y-2 text-lg mt-9 max-w-[522px]">
          <span className="text-gray-500">Loại hình</span>
          <span className="font-medium">Căn hộ</span>

          <span className="text-gray-500">Diện tích</span>
          <span className="font-semibold">54 m²</span>

          <span className="text-gray-500">Hợp đồng pháp lý</span>
          <span className="font-bold">Hợp đồng đặt cọc</span>

          <span className="text-gray-500">Số phòng ngủ</span>
          <span className="font-semibold">2</span>

          <span className="text-gray-500">Số phòng vệ sinh</span>
          <span className="font-semibold">2</span>
        </section>

        {/* MÔ TẢ */}
        <section className="mt-9">
          <h3 className="font-bold text-[25px] mb-2">MÔ TẢ CHI TIẾT</h3>
          <ul className="list-disc list-inside space-y-1 text-[20px]">
            <li>
              Chung cư Nguyễn Kim, Phan Văn Trị, Gò Vấp: 2p ngủ, 2wc, đầy đủ nội
              thất mới 7,5tr
            </li>
            <li>
              Chung cư ngay Giga Mall, tầng trung thông thoáng, trần nhà cao ráo
            </li>
            <li>Kiểu cách hiện đại phù hợp gia đình, nhóm bạn, độc thân</li>
            <li>Địa chỉ chung cư: 124 Phan Văn Trị, Gò Vấp</li>
            <li>
              Gần các tuyến đường lớn như Dương Quảng Hàm, gần các quận trung
              tâm
            </li>
            <li>Ở đây có an ninh và tiện nghi không thiếu gì</li>
            <li>Giá: 7,5 triệu/tháng, đã bao gồm phí quản lý</li>
            <li>Bàn giao nội thất đầy đủ, dọn vào ở liền</li>
          </ul>
        </section>

        {/* LIÊN QUAN */}
        <section className="mt-9 mb-[96px] relative">
          <h1 className="font-bold text-[25px] mb-2">LIÊN QUAN</h1>
          <div className="flex gap-10 justify-between mr-14">
            {fakeData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                picURL={item.picURL}
                price={item.price}
                area={item.area}
                addr={item.addr}
                type={item.type}
              />
            ))}
          </div>

          {/* BACK BUTTON */}
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-4 py-8 text-black hover:bg-gray-100 transition m-7 absolute bottom-[-110px] right-3.5"
          >
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
              <ChevronLeft size={21} />
            </div>
            <span className="text-[20px] font-medium">VỀ TRANG TRƯỚC</span>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Details;
