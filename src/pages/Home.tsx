import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Card } from "../components/Card";
import { Article } from "../components/Article";
import { Footer } from "../components/Footer/Footer";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_ENDPOINTS } from "@/config/api";

// Define TypeScript interfaces for API data
interface Listing {
  id: number;
  title: string;
  price: number;
  area: number;
  property_type: string;
  province_details: {
    name: string;
  };
  district_details: {
    name: string;
  };
  images: {
    image_url: string;
  }[];
}

// Define TypeScript interfaces for fake data
interface FakeData2 {
  id: string;
  key: number;
  title: string;
  picURL: string;
  date: string;
  author: string;
}

const fakeData2: FakeData2[] = [
  {
    id: "1",
    key: 1,
    title: "Kinh nghiệm thuê nhà trọ cho sinh viên",
    picURL:
      "https://file4.batdongsan.com.vn/crop/393x222/2023/10/04/20231004160802-1e5e_wm.jpg",
    date: "20/02/2024",
    author: "Nguyễn Văn A",
  },
  {
    id: "2",
    key: 2,
    title: "Cách tìm nhà trọ giá rẻ tại TP.HCM",
    picURL:
      "https://file4.batdongsan.com.vn/crop/393x222/2023/10/04/20231004160802-1e5e_wm.jpg",
    date: "19/02/2024",
    author: "Trần Thị B",
  },
  {
    id: "3",
    key: 3,
    title: "Top 10 khu vực có giá thuê nhà rẻ nhất TP.HCM",
    picURL:
      "https://images.unsplash.com/photo-1744080213179-d4e58780ec5a?q=80&w=1877&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "18/02/2024",
    author: "Lê Văn C",
  },
  {
    id: "4",
    key: 4,
    title: "Những điều cần lưu ý khi thuê nhà",
    picURL:
      "https://images.unsplash.com/photo-1744080213179-d4e58780ec5a?q=80&w=1877&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "17/02/2024",
    author: "Phạm Thị D",
  },
];

const formatPrice = (price: number): string => {
  const million = price / 1_000_000;
  return `${million.toFixed(1).replace(/\.0$/, "")}`;
};

const formatArea = (area: number): string => {
  return `${parseFloat(area.toString()).toString()}`;
};

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

export const Home: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Custom arrow components
  const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <button
        type="button"
        className={`!absolute !z-20 !left-0 top-1/2 -translate-y-1/2 !w-14 !h-14 !flex !items-center !justify-center !bg-white !rounded-full !shadow-lg border-2 border-gray-300 hover:!bg-gray-200 transition ${className}`}
        onClick={onClick}
        aria-label="Previous"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 32"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 8l-8 8 8 8"
          />
        </svg>
      </button>
    );
  };

  const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
    return (
      <button
        type="button"
        className={`!absolute !z-20 !right-0 top-1/2 -translate-y-1/2 !w-14 !h-14 !flex !items-center !justify-center !bg-white !rounded-full !shadow-lg border-2 border-gray-300 hover:!bg-gray-200 transition ${className}`}
        onClick={onClick}
        aria-label="Next"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 32"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8l8 8-8 8"
          />
        </svg>
      </button>
    );
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.LISTINGS);
        setListings(response.data.results || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />
      <HeroSection />
      <div className="mt-[40px] ml-24 mr-24 mb-20 relative">
        <h1 className="font-bold font-Nunito text-[46px] mb-5">TIN MỚI</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="px-8">
            <Slider
              {...sliderSettings}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
            >
              {listings.map((listing) => (
                <div key={listing.id} className="flex flex-col h-full px-3">
                  <Card
                    id={listing.id.toString()}
                    title={listing.title}
                    picURL={listing.images[0]?.image_url || ""}
                    price={formatPrice(listing.price)}
                    area={formatArea(listing.area)}
                    addr={`${listing.district_details.name}, ${listing.province_details.name}`}
                    type={listing.property_type}
                    className="min-h-[350px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="mt-[40px] ml-24 mr-24 relative">
        <h1 className="font-bold font-Nunito text-[46px] mb-5">
          ĐỪNG ĐỂ BỊ LỪA!
        </h1>
        <div className="px-8">
          <Slider
            {...sliderSettings}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
          >
            {fakeData2.map((data) => (
              <div key={data.key} className="flex flex-col h-full px-3 w-full">
                <Article
                  id={data.id}
                  title={data.title}
                  picURL={data.picURL}
                  date={data.date}
                  author={data.author}
                  className="min-h-[350px]"
                />
              </div>
            ))}
          </Slider>
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

export default Home;
