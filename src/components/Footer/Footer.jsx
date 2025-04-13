import React from "react";
import { SocialLink } from "./SocialLink";

export const Footer = () => {
  const platformNames = [
    { name: "Google", url: "https://www.google.com/" },
    { name: "Twitter", url: "https://x.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "LinkedinIn", url: "https://www.linkedin.com/" },
  ];
  return (
    <>
      <div className="grid grid-cols-[6fr_2fr] gap-40 px-20 pt-10 pb-25 font-Nunito shadow-md">
        <div className="flex flex-col gap-2">
          <div className="mb-1.5 text-xl">
            <b>TRỌ TỐT</b>
          </div>

          <div className="mb-1.5">
            Là nền tảng kết nối giữa chủ cho thuê và người thuê nhà, ứng dụng AI
            để phát hiện các trường hợp cho thuê đáng ngờ, giúp tạo ra môi
            trường giao dịch an toàn và minh bạch.<br></br>
            <br></br>
            Ho Chi Minh, Vietnam. Since 2025.
          </div>

          <div className="flex gap-1.5">
            {platformNames.map((platformName, index) => (
              <SocialLink
                platform={platformName.name}
                url={platformName.url}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 text-base">
          <div>
            <b>Về chúng tôi</b>
          </div>

          <div className="h-30 flex justify-between flex-col">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              How it works
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
