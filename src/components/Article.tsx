import React from "react";

type ArticleProps = {
  picURL: string;
  title: string;
  date: string;
  author: string;
};

export const Article: React.FC<ArticleProps> = ({
  picURL,
  title,
  date,
  author,
}) => {
  return (
    <div className="w-[384px] overflow-hidden font-Nunito border-[2px] border-black bg-[#f8f8f8]">
      {/* Picture */}
      <div className="w-full aspect-[3/2] overflow-hidden">
        <img
          src={picURL}
          alt={title ?? ""}
          title={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between items-start font-normal gap-0.5 mt-1.5 pl-1.5">
        <div className="text-[20px] text-left leading-6">{title}</div>
        <div className="text-[12px]">{date}</div>
        <div className="text-[#0A72AD] text-[12px]">{`Author: ${author}`}</div>
      </div>
    </div>
  );
};

export default Article;
