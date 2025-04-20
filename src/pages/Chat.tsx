import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer/Footer";
import { IoSend } from "react-icons/io5";
import { FaPaperclip } from "react-icons/fa";
import { useLocation } from "react-router-dom";

// Mock data for chat list
const chatList = [
  {
    id: "1",
    name: "Bách Chi",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Đã xem",
    email: "hi.bach.com.vn",
    isOnline: true,
    unread: 0,
  },
  {
    id: "2",
    name: "Bách Chi",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Đã xem",
    email: "hi.bach.com.vn",
    isOnline: true,
    unread: 2,
  },
  {
    id: "3",
    name: "Bách Chi",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Đã xem",
    email: "hi.bach.com.vn",
    isOnline: false,
    unread: 0,
  },
  {
    id: "4",
    name: "Bách Chi",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Đã xem",
    email: "hi.bach.com.vn",
    isOnline: true,
    unread: 1,
  },
];

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    sender: "other",
    timestamp: "9:00 PM",
  },
  {
    id: "2",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    sender: "me",
    timestamp: "9:01 PM",
  },
  {
    id: "3",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    sender: "other",
    timestamp: "9:02 PM",
  },
  {
    id: "4",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    sender: "me",
    timestamp: "9:03 PM",
  },
];

export const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const location = useLocation();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Hide floating ChatBox if we're on the Chat page
  React.useEffect(() => {
    const chatWidget = document.querySelector(".chat-widget");
    if (chatWidget && location.pathname === "/chat") {
      chatWidget.classList.add("hidden");
    }
    return () => {
      if (chatWidget) {
        chatWidget.classList.remove("hidden");
      }
    };
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5ff]">
      <Header first="Trang chủ" second="Tin mới" third="Đừng để bị lừa!" />

      <main className="flex-grow flex my-6 h-[calc(100vh-180px)]">
        {/* Chat List Sidebar */}
        <div className="w-[300px] bg-white border-r rounded-l-xl shadow-sm">
          {/* Search Bar */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat.id === chat.id ? "bg-[#e8f3ff]" : ""
                }`}
              >
                {/* Avatar with online status */}
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{chat.name}</h3>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{chat.email}</p>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white rounded-r-xl shadow-sm">
          {/* Chat Header */}
          <div className="bg-[#e8f3ff] p-4 flex items-center gap-4 border-b">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{selectedChat.name}</h2>
              <p className="text-sm text-gray-500">{selectedChat.email}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "other" && (
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] rounded-2xl p-3 ${
                    message.sender === "me"
                      ? "bg-[#6b4eff] text-white rounded-tr-none"
                      : "bg-white text-black rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
                {message.sender === "me" && (
                  <img
                    src="https://i.pravatar.cc/150?img=2"
                    alt="Me"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <FaPaperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="text-[#6b4eff] hover:text-[#5b3eff]"
              >
                <IoSend size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
