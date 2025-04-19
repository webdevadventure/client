import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { Frame } from "../components/Frame";
import { Filter } from "../components/Filter";
import { Pagination } from "../components/Pagination";

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
    title: "Căn hộ mini trung tâm Quận 1",
    area: "35",
    description: "1PN | đầy đủ nội thất | gần phố đi bộ",
    type: "Căn hộ mini",
    address: "45 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh",
    price: "9",
    image: "",
  },
  {
    title: "Phòng trọ giá rẻ Bình Thạnh",
    area: "25",
    description: "1PN | có gác lửng | gần ĐH Hutech",
    type: "Phòng trọ",
    address: "123 Xô Viết Nghệ Tĩnh, Q. Bình Thạnh",
    price: "3",
    image: "",
  },
  {
    title: "Chung cư cao cấp Tân Bình",
    area: "75",
    description: "2PN | 2WC | gần sân bay Tân Sơn Nhất",
    type: "Chung cư",
    address: "88 Trường Chinh, Q. Tân Bình",
    price: "11",
    image: "",
  },
  {
    title: "Studio nội thất cao cấp Quận 3",
    area: "32",
    description: "Full nội thất | ban công | gần chợ Vườn Chuối",
    type: "Căn hộ studio",
    address: "39 Nguyễn Thị Diệu, Q.3",
    price: "6",
    image: "",
  },
  {
    title: "Phòng trọ sạch sẽ Quận 5",
    area: "28",
    description: "1PN | có máy lạnh | điện nước riêng",
    type: "Phòng trọ",
    address: "215 Trần Hưng Đạo, Q.5",
    price: "3.5",
    image: "",
  },
  {
    title: "Chung cư mini sát bên ĐH Kinh tế",
    area: "40",
    description: "1PN | an ninh | thang máy",
    type: "Chung cư mini",
    address: "59 Nguyễn Tri Phương, Q.10",
    price: "5",
    image: "",
  },
  {
    title: "Căn hộ 2PN Quận 7",
    area: "70",
    description: "Gần Lotte Mart | full nội thất | tầng cao",
    type: "Căn hộ/Chung cư",
    address: "134 Nguyễn Thị Thập, Q.7",
    price: "8",
    image: "",
  },
  {
    title: "Phòng cho thuê Phú Nhuận",
    area: "30",
    description: "Có cửa sổ | WC riêng | gần công viên Gia Định",
    type: "Phòng trọ",
    address: "25 Hoàng Văn Thụ, Q. Phú Nhuận",
    price: "3.8",
    image: "",
  },
  {
    title: "Căn hộ dịch vụ view đẹp Thảo Điền",
    area: "60",
    description: "1PN | view sông | nội thất cao cấp",
    type: "Căn hộ dịch vụ",
    address: "12 Đường số 2, P. Thảo Điền, TP. Thủ Đức",
    price: "12",
    image: "",
  },
  {
    title: "Studio Gò Vấp đầy đủ tiện nghi",
    area: "33",
    description: "1PN | gần chợ Hạnh Thông Tây | có chỗ để xe",
    type: "Căn hộ studio",
    address: "99 Quang Trung, Q. Gò Vấp",
    price: "4.5",
    image: "",
  },
  // Lặp lại mẫu để đủ 30 bản ghi
  {
    title: "Căn hộ mini Quận 10",
    area: "40",
    description: "1PN | ban công thoáng | thang máy",
    type: "Căn hộ mini",
    address: "101 Thành Thái, Q.10",
    price: "6",
    image: "",
  },
  {
    title: "Phòng trọ Tân Phú",
    area: "28",
    description: "Có gác | gần Aeon Mall | lối đi riêng",
    type: "Phòng trọ",
    address: "32 Gò Dầu, Q. Tân Phú",
    price: "3.2",
    image: "",
  },
  {
    title: "Căn hộ dịch vụ quận 2",
    area: "50",
    description: "Full nội thất | yên tĩnh | có thang máy",
    type: "Căn hộ dịch vụ",
    address: "201 Trần Não, TP. Thủ Đức",
    price: "7.5",
    image: "",
  },
  {
    title: "Chung cư mini Quận 6",
    area: "42",
    description: "1PN | an ninh | gần Metro Bình Phú",
    type: "Chung cư mini",
    address: "25 Kinh Dương Vương, Q.6",
    price: "5.3",
    image: "",
  },
  {
    title: "Phòng trọ có máy lạnh Quận 8",
    area: "27",
    description: "1PN | có wifi | có bếp",
    type: "Phòng trọ",
    address: "68 Phạm Thế Hiển, Q.8",
    price: "3.1",
    image: "",
  },
  {
    title: "Căn hộ studio yên tĩnh Quận 4",
    area: "36",
    description: "Full nội thất | view Bitexco | an ninh",
    type: "Căn hộ studio",
    address: "77 Vĩnh Khánh, Q.4",
    price: "6.2",
    image: "",
  },
  {
    title: "Chung cư 2PN Quận Bình Tân",
    area: "66",
    description: "Có hồ bơi | gần Aeon Mall | tầng cao",
    type: "Căn hộ/Chung cư",
    address: "192 Tên Lửa, Q. Bình Tân",
    price: "7.8",
    image: "",
  },
  {
    title: "Phòng trọ sinh viên Thủ Đức",
    area: "24",
    description: "Gần ĐH Quốc gia | có máy giặt | wifi",
    type: "Phòng trọ",
    address: "12 Lê Văn Việt, TP. Thủ Đức",
    price: "2.5",
    image: "",
  },
  {
    title: "Căn hộ dịch vụ Quận 11",
    area: "48",
    description: "1PN | full nội thất | có ban công",
    type: "Căn hộ dịch vụ",
    address: "23 Lạc Long Quân, Q.11",
    price: "6.8",
    image: "",
  },
  {
    title: "Chung cư cao cấp The GoldView",
    area: "85",
    description: "2PN | hồ bơi | gym | tầng cao",
    type: "Chung cư cao cấp",
    address: "346 Bến Vân Đồn, Q.4",
    price: "14",
    image: "",
  },
  {
    title: "Căn hộ 1PN gần chợ Bến Thành",
    area: "38",
    description: "Ban công đẹp | nội thất mới",
    type: "Căn hộ mini",
    address: "5 Phan Chu Trinh, Q.1",
    price: "8.5",
    image: "",
  },
  {
    title: "Studio full nội thất Q. Bình Thạnh",
    area: "34",
    description: "1PN | có bếp riêng | WC riêng",
    type: "Căn hộ studio",
    address: "144 Bạch Đằng, Q. Bình Thạnh",
    price: "5.5",
    image: "",
  },
  {
    title: "Căn hộ mini Quận 3 gần Hồ Con Rùa",
    area: "40",
    description: "1PN | yên tĩnh | gần công viên",
    type: "Căn hộ mini",
    address: "22 Trần Quốc Thảo, Q.3",
    price: "7",
    image: "",
  },
  {
    title: "Phòng trọ nhỏ xinh Q. Tân Bình",
    area: "26",
    description: "1PN | lối đi riêng | WC trong phòng",
    type: "Phòng trọ",
    address: "71 Phạm Văn Bạch, Q. Tân Bình",
    price: "3.3",
    image: "",
  },
  {
    title: "Chung cư mini Quận 12",
    area: "43",
    description: "1PN | có thang máy | ban công rộng",
    type: "Chung cư mini",
    address: "92 Hà Huy Giáp, Q.12",
    price: "4.7",
    image: "",
  },
  {
    title: "Căn hộ dịch vụ Quận Tân Phú",
    area: "55",
    description: "1PN | có bếp | gần chợ",
    type: "Căn hộ dịch vụ",
    address: "33 Nguyễn Sơn, Q. Tân Phú",
    price: "6.5",
    image: "",
  },
  {
    title: "Phòng trọ giá rẻ Quận 9",
    area: "22",
    description: "Có gác | WC riêng | gần KCN",
    type: "Phòng trọ",
    address: "17 Lã Xuân Oai, TP. Thủ Đức",
    price: "2.7",
    image: "",
  },
  {
    title: "Căn hộ mini quận Gò Vấp",
    area: "36",
    description: "1PN | gần siêu thị | tầng lửng",
    type: "Căn hộ mini",
    address: "21 Phan Văn Trị, Q. Gò Vấp",
    price: "5.8",
    image: "",
  },
  {
    title: "Studio cao cấp Quận 7",
    area: "37",
    description: "1PN | view đẹp | nội thất cao cấp",
    type: "Căn hộ studio",
    address: "14 Tân Mỹ, Q.7",
    price: "7.5",
    image: "",
  },
];

export const News: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [framePerPage, setFramePerPage] = useState(8);
  const lastPostIndex = currentPage * framePerPage;
  const firstPostIndex = lastPostIndex - framePerPage;
  const currentData = fakeData.slice(firstPostIndex, lastPostIndex);
  return (
    <div>
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <h1 className="mt-10 mb-6 ml-16 font-Nunito font-bold text-[40px]">
        TIN MỚI
      </h1>

      <div className="grid grid-cols-[7fr_3fr]">
        <div className="ml-16">
          {currentData.map((item, idx) => {
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
      <Pagination
        totalPosts={fakeData.length}
        postPerPage={framePerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

export default News;
