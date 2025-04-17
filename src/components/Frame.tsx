import React from "react";

type FrameProps = {
  title: string;
  picURL: string;
  price: number | string;
  area: number | string;
  addr: string;
  type: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
};

export const Frame: React.FC<FrameProps> = ({
  title,
  picURL,
  price,
  area,
  addr,
  type,
  prop1,
  prop2,
  prop3,
}) => {
  // Gộp các thuộc tính bổ sung thành một chuỗi ngăn cách bởi " | "
  const additionalProps = [prop1, prop2, prop3].filter(Boolean).join(" | ");

  return (
    <div className="w-[851px] grid grid-cols-[3fr_7fr] bg-[#fafafa] font-Nunito shadow-lg rounded-lg relative my-6">
      {/* Picture */}
      <div className="w-[267px] aspect-square overflow-hidden m-4 rounded-lg">
        <img src={picURL} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-around font-medium gap-0.5 mt-3 mr-3 pl-1.5 max-w-[540px] max-h-2/3 text-left">
        {/* Title */}
        <div className="font-bold text-xl truncate overflow-hidden whitespace-nowrap w-full">
          {title}
        </div>

        {/* Area + Additional Props */}
        <div>
          <span className="text-[#e7193b] font-semibold text-xl mr-3">
            {`${area} m`}
            <sup>2</sup>
          </span>
          <span className="mx-1 font-light text-sm">{additionalProps}</span>
        </div>

        {/* Type */}
        <div className="font-normal text-lg">{type}</div>

        {/* Address */}
        <div className="font-normal text-lg">{addr}</div>

        {/* Price */}
        <div className="absolute bottom-4 right-5 text-2xl">
          {`${price} triệu/tháng`}
        </div>
      </div>
    </div>
  );
};
