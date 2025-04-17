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
    <div className="w-full md:w-80 lg:w-96 overflow-hidden font-Nunito">
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
      <div className="flex flex-col justify-between items-start font-medium gap-3 mt-5">
        <div className="font-bold text-3xl truncate overflow-hidden whitespace-nowrap w-full">
          {title}
        </div>
        <div className="font-semibold text-lg">
          <span>{`${price} triệu/tháng`}</span>
          <span className="mx-2">|</span>
          <span className="text-[#e7193b]">
            {`${area} m`}
            <sup>2</sup>
          </span>
        </div>
        <div className="text-lg text-gray-600">{addr}</div>
        <div className="text-lg text-gray-500">{type}</div>
      </div>
    </div>
  );
};

export default Card;
