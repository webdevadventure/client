import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ChatBox } from "./ChatBox";

// Mock data for active chats
const activeChats = [
  {
    id: "1",
    name: "Anh Tuấn",
    avatar: "https://i.pravatar.cc/150?img=1",
    unread: 2,
  },
  {
    id: "2",
    name: "Chị Hoa",
    avatar: "https://i.pravatar.cc/150?img=2",
    unread: 0,
  },
  {
    id: "3",
    name: "Anh Nam",
    avatar: "https://i.pravatar.cc/150?img=3",
    unread: 1,
  },
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const location = useLocation();

  // Don't render anything if we're on the chat page
  if (location.pathname === "/chat") {
    return null;
  }

  const handleAvatarClick = (chatId: string) => {
    setActiveChat(chatId);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Active Chat Avatars */}
      <div className="flex flex-col gap-3 mb-3">
        {activeChats.slice(0, 3).map((chat) => (
          <button
            key={chat.id}
            onClick={() => handleAvatarClick(chat.id)}
            className="relative group"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
            />
            {chat.unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {chat.unread}
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {chat.name}
            </span>
          </button>
        ))}

        {/* View All Chats Button */}
        <Link to="/chat" className="relative group">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shadow-md transition-transform hover:scale-110">
            <FaChevronUp size={20} className="text-gray-600" />
          </div>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-9999">
            Xem tất cả
          </span>
        </Link>
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-0 right-16">
          <ChatBox
            onClose={() => {
              setIsOpen(false);
              setActiveChat(null);
            }}
          />
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
      >
        <IoChatbubbleEllipses size={28} />
      </button>
    </div>
  );
};
