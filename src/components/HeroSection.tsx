import React from "react";
import { Button } from "./ui/button";

export const HeroSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 bg-[#edecfb] relative">
      <div className="min-h-[300px] ml-16 mt-10">
        <div className="font-Nunito mb-6">
          <div className="font-bold text-[64px] mb-4">
            Chúng tôi mang đến <br />
            một giải pháp đột phá <br />
            cho vấn đề nơi ở <br />
          </div>

          <div className="max-w-[705px] text-[#666363]">
            Với công nghệ AI tiên tiến, chúng tôi tự động phát hiện và cảnh báo
            các tin đăng có dấu hiệu lừa đảo, bảo vệ bạn khỏi rủi ro. <br />
            Hơn 500+ giao dịch thành công, đảm bảo uy tín cho cả người thuê và
            chủ nhà. Hãy để chúng tôi giúp bạn an tâm hơn khi tìm kiếm nơi ở!
          </div>
        </div>

        <Button className="bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] text-white px-6 py-6 shadow-md hover:brightness-110 transition-all duration-200 w-fit mb-6">
          Khám phá ngay
        </Button>

        <div className="flex gap-10 text-center text-black mb-[80px]">
          <div>
            <p className="text-[36px] font-bold">
              300<span className="text-[#60BBEE]">+</span>
            </p>
            <p className="text-xl text-gray-500">Khách hàng</p>
          </div>
          <div>
            <p className="text-[36px] font-bold">
              900<span className="text-[#60BBEE]">+</span>
            </p>
            <p className="text-xl text-gray-500">Hợp đồng đã kí kết</p>
          </div>
          <div>
            <p className="text-[36px] font-bold">5</p>
            <p className="text-xl text-gray-500">Giải thưởng</p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-[-30px]">
        <img src="../public/Home.png" alt="Nhà" />
      </div>
    </div>
  );
};
