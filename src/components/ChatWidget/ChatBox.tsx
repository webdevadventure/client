import React, { useState } from "react";
import {
  FaPaperclip,
  FaTrash,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";

type Message = {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
};

interface ChatBoxProps {
  onClose: () => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Dōu méi nǐ yào yǎn, Rè ài yì bǎi líng wǔ dù de nǐ",
      sender: "Anh Tuấn",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "2",
      content: "Dī dī qīng chún de zhēng liú shuǐ",
      sender: "Anh Tuấn",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "3",
      content:
        "Super idol de xiào róng\nDōu méi nǐ de tián\nBā yuè zhèng wǔ de yáng guāng",
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    },
    {
      id: "4",
      content: "Bắt đầu",
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "You",
        timestamp: new Date(),
        isOwn: true,
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

  return (
    <div className="w-[400px] bg-white rounded-t-lg shadow-lg flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="font-semibold text-lg">Anh Tuấn</div>
        <div className="flex gap-4">
          <button className="text-orange-500 hover:text-orange-600">
            <FaExclamationTriangle size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-600">
            <FaTrash size={20} />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isOwn
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-600">
            <FaPaperclip size={20} />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 h-10 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            className="text-blue-500 hover:text-blue-600"
          >
            <IoSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
