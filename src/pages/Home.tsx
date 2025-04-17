import React from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Card } from "../components/Card";
import { Article } from "../components/Article";
import { Footer } from "../components/Footer/Footer";

// Define TypeScript interfaces for fake data
interface FakeData1 {
  link: string;
  title: string;
  price: string;
  area: string;
  addr: string;
  type: string;
}

interface FakeData2 {
  link: string;
  title: string;
  date: string;
  author: string;
}

const fakeData1: FakeData1[] = [
  {
    link: "https://plus.unsplash.com/premium_photo-1744805464532-998bee603eae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Chung cư ở Gò Vấp",
    price: "7,5",
    area: "54",
    addr: "Q. Gò Vấp, TP. Hồ Chí Minh",
    type: "Căn hộ/Chung cư",
  },
  {
    link: "https://images.unsplash.com/photo-1744080213179-d4e58780ec5a?q=80&w=1877&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Chung cư ở Gò Vấp",
    price: "7,5",
    area: "54",
    addr: "Q. Gò Vấp, TP. Hồ Chí Minh",
    type: "Căn hộ/Chung cư",
  },
  {
    link: "https://images.unsplash.com/photo-1744278955687-2a0216448268?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Chung cư ở Gò Vấp",
    price: "7,5",
    area: "54",
    addr: "Q. Gò Vấp, TP. Hồ Chí Minh",
    type: "Căn hộ/Chung cư",
  },
];

const fakeData2: FakeData2[] = [
  {
    link: "https://plus.unsplash.com/premium_photo-1744805464532-998bee603eae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Chung cư ở Gò Vấp",
    date: "1/4/2025",
    author: "tunglete",
  },
  {
    link: "https://images.unsplash.com/photo-1744616451172-5f540c944b9b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Nhà phố ở Tân Bình",
    date: "2/4/2025",
    author: "nguyenphat",
  },
  {
    link: "https://images.unsplash.com/photo-1744723852488-ebb3e2541cca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cho thuê Căn hộ cao cấp ở Quận 1",
    date: "3/4/2025",
    author: "lethanh",
  },
];

export const Home: React.FC = () => {
  return (
    <div>
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <HeroSection />
      <div className="mt-[40px] ml-24 mr-24 mb-20">
        <h1 className="font-bold font-Nunito text-[46px] mb-5">TIN MỚI</h1>
        <div className="flex justify-between">
          {fakeData1.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              picURL={item.link}
              price={item.price}
              area={item.area}
              addr={item.addr}
              type={item.type}
            />
          ))}
        </div>
      </div>
      <div className="mt-[40px] ml-24 mr-24">
        <h1 className="font-bold font-Nunito text-[46px] mb-5">
          ĐỪNG ĐỂ BỊ LỪA!
        </h1>
        <div className="flex justify-between">
          {fakeData2.map((item, index) => (
            <Article
              key={index}
              title={item.title}
              picURL={item.link}
              date={item.date}
              author={item.author}
            />
          ))}
        </div>
      </div>
      <div className="py-12">
        <div className="text-center mb-15 mt-10">
          <h2 className="text-3xl font-semibold text-[#4A4A4A] mb-2">
            CẢM NHẬN SỰ KHÁC BIỆT
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-6 px-16 mb-12">
          <Feature
            icon="../104.svg"
            title="Giàu kinh nghiệm"
            description="Our experience of 25 years of building and making achievements in the world of development"
          />
          <Feature
            icon="../105.svg"
            title="Giá cả cạnh tranh"
            description="The prices we offer you are very competitive without reducing the quality of the company's work"
          />
          <Feature
            icon="../106.svg"
            title="On Time"
            description="We prioritize the quality of our work and finish it on time"
          />
          <Feature
            icon="../107.svg"
            title="Uy tín"
            description="The material determines the quality of the building itself, so we recommend that you use the best quality materials"
          />
        </div>

        <div className="w-[1064px] m-auto bg-[#222222] py-20 flex items-start relative z-10 rounded-lg">
          <div className="w-1/2">
            <img
              src="../public/Feedback.png"
              alt="Portrait of Jacob Molen"
              className="ml-20"
            />
          </div>

          <div className="w-1/2 pl-10 text-white mr-12">
            <h2 className="text-3xl font-bold mb-6">Phản hồi từ khách hàng</h2>
            <p className="text-lg leading-relaxed">
              Chúng tôi ở đây để giúp bạn xây dựng một công trình tuyệt vời, với
              chúng tôi không gì là không thể. Hãy xem những gì chúng tôi đã làm
              và những gì họ nói về hiệu suất làm việc của chúng tôi.
            </p>
            <div className="bg-white text-black rounded-md p-4 mt-8 w-80 absolute left-40 bottom-10 shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Jacob Molen</h3>
              <p className="text-sm">
                We like the final result of this project. It's extraordinary and
                also provides the best service to the client.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-12 h-12 bg-[#EDF5FE] text-[#0084FF] rounded-full mx-auto mb-4">
        <img src={icon} alt={title} />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm mt-2">{description}</p>
    </div>
  );
};
