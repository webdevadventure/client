import React from "react";
import { Link } from "react-router-dom";

type ArticleProps = {
  id?: string;
  picURL: string;
  title: string;
  date: string;
  author: string;
  className?: string;
  readTime?: string;
  categories?: string[];
  excerpt?: string;
};

export const Article: React.FC<ArticleProps> = ({
  id,
  picURL,
  title,
  date,
  author,
  className = "",
  readTime,
  categories = [],
  excerpt,
}) => {
  return (
    <Link
      to={`/blog/${id}`}
      className={`block w-[384px] overflow-hidden font-Nunito border-[2px] border-black bg-[#f8f8f8] hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
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
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex gap-2 mb-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs rounded bg-[#edecfb] text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="text-[20px] text-left leading-6">{title}</div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-[12px] text-gray-600">
          <span>{date}</span>
          {readTime && <span>• {readTime}</span>}
        </div>

        {/* Author */}
        <div className="text-[#0A72AD] text-[12px]">{`Author: ${author}`}</div>

        {/* Excerpt */}
        {excerpt && (
          <div className="text-sm text-gray-600 mt-2 line-clamp-2">
            {excerpt}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Article;
