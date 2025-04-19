import React from "react";

type CardProps = {
  title: string;
  picURL: string;
  price: number | string;
  area: number | string;
  addr: string;
  type: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  picURL,
  price,
  area,
  addr,
  type,
}) => {
  return (
    <div className="w-full max-w-[300px] rounded-xl shadow-md overflow-hidden font-Nunito transform transition-transform duration-300 hover:scale-105">
      {/* Picture */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={picURL}
          alt={title ?? ""}
          title={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between items-start font-medium gap-3 p-4">
        <div className="font-bold text-xl truncate w-full">{title}</div>
        <div className="font-semibold text-lg">
          <span>{`${price} triệu/tháng`}</span>
          <span className="mx-2">|</span>
          <span className="text-[#e7193b]">
            {`${area} m`}
            <sup>2</sup>
          </span>
        </div>
        <div className="text-base text-gray-600">{addr}</div>
        <div className="text-base text-gray-500">{type}</div>
      </div>
    </div>
  );
};

export default Card;
