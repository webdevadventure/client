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
    <div className="w-72 overflow-hidden font-Nunito">
      {/* Picture */}
      <div className="w-full aspect-[1/1] overflow-hidden border-[1px] border-black">
        <img
          src={picURL}
          alt={title ?? ""}
          title={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between items-start font-medium gap-1 mt-3">
        <div className="font-bold text-xl truncate overflow-hidden whitespace-nowrap">
          {title}
        </div>
        <div className="font-semibold text-sm">
          <span>{`${price} triệu/tháng`}</span>
          <span className="mx-1">|</span>
          <span className="text-[#e7193b]">
            {`${area} m`}
            <sup>2</sup>
          </span>
        </div>
        <div className="text-sm text-gray-600">{addr}</div>
        <div className="text-sm text-gray-500">{type}</div>
      </div>
    </div>
  );
};

export default Card;
