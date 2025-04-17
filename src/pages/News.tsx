import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Frame } from "../components/Frame";
import { Filter } from "../components/Filter";

// Define the type for a listing
interface Listing {
  title: string;
  area: string;
  description: string;
  type: string;
  address: string;
  price: string;
  image: string;
}

const fakeData: Listing[] = [
  {
    title: "Cho thuê căn hộ trung tâm Gò Vấp",
    area: "60",
    description: "Gần chợ Gò Vấp | 2 phòng ngủ | 1 toilet",
    type: "Căn hộ mini",
    address: "25 Nguyễn Oanh, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "6,8",
    image: "",
  },
  {
    title: "Chung cư giá rẻ tại Gò Vấp",
    area: "45",
    description: "Cách CoopMart 1km | 1 phòng ngủ | có ban công",
    type: "Chung cư mini",
    address: "89 Lê Đức Thọ, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "5,5",
    image: "",
  },
  {
    title: "Cho thuê căn hộ đầy đủ nội thất",
    area: "70",
    description: "View thoáng mát | 2PN | 2WC | có thang máy",
    type: "Căn hộ/Chung cư",
    address: "12 Quang Trung, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "8,2",
    image: "",
  },
  {
    title: "Chung cư cao cấp gần Emart Gò Vấp",
    area: "80",
    description: "Gần siêu thị | 3PN | 2WC | bãi xe rộng",
    type: "Chung cư cao cấp",
    address: "234 Phan Văn Trị, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "10",
    image: "",
  },
  {
    title: "Phòng trọ có gác tại Gò Vấp",
    area: "35",
    description: "1 phòng ngủ | gác lửng | điện nước riêng",
    type: "Phòng trọ",
    address: "15 Dương Quảng Hàm, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "3,2",
    image: "",
  },
  {
    title: "Căn hộ mới xây cho thuê Gò Vấp",
    area: "50",
    description: "Gần Đại học Công nghiệp | 1PN | nội thất cơ bản",
    type: "Căn hộ dịch vụ",
    address: "68 Nguyễn Văn Nghi, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "6",
    image: "",
  },
  {
    title: "Cho thuê căn hộ sát bên công viên",
    area: "55",
    description: "Sát công viên Làng Hoa | 2PN | sân phơi riêng",
    type: "Căn hộ",
    address: "102 Lê Văn Thọ, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "7",
    image: "",
  },
  {
    title: "Chung cư mini cho thuê tháng",
    area: "40",
    description: "1 phòng ngủ | có máy lạnh | bếp riêng",
    type: "Chung cư mini",
    address: "37 Phạm Văn Chiêu, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "4,8",
    image: "",
  },
  {
    title: "Cho thuê studio tại Gò Vấp",
    area: "30",
    description: "Studio full nội thất | có chỗ để xe | free wifi",
    type: "Căn hộ studio",
    address: "9 Lê Lai, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "4,2",
    image: "",
  },
  {
    title: "Căn hộ 2PN gần trường học",
    area: "58",
    description: "2 phòng ngủ | gần trường cấp 2 | yên tĩnh",
    type: "Căn hộ/Chung cư",
    address: "120 Nguyễn Thái Sơn, Q. Gò Vấp, TP. Hồ Chí Minh",
    price: "7,3",
    image: "",
  },
];

export const News: React.FC = () => {
  return (
    <div>
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <h1 className="mt-10 mb-6 ml-16 font-Nunito font-bold text-[40px]">
        TIN MỚI
      </h1>

      <div className="grid grid-cols-[1fr_auto]">
        <div className="ml-16">
          {fakeData.map((item, idx) => {
            const [prop1, prop2, prop3] = item.description
              .split("|")
              .map((p) => p.trim());

            return (
              <Frame
                key={idx}
                title={item.title}
                picURL={item.image}
                price={item.price}
                area={item.area}
                addr={item.address}
                type={item.type}
                prop1={prop1}
                prop2={prop2}
                prop3={prop3}
              />
            );
          })}
        </div>

        <div className="mr-10">
          <Filter />
        </div>
      </div>

      <div className="w-full flex justify-center items-center space-x-4 mb-6">
        <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-semibold">
          1
        </div>
        <div className="text-gray-700 font-semibold">2</div>
        <div className="text-gray-700 font-semibold">..</div>
        <div className="text-gray-700 font-semibold">5</div>
        <div className="text-gray-700 font-semibold">&gt;</div>
      </div>

      <Footer />
    </div>
  );
};
