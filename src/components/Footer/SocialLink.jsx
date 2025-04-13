import React from "react";
import { useEffect, useState } from "react";
import { FaGoogle, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const SocialLink = ({ platform, url }) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    const iconName = `Fa${platform}`;

    import("react-icons/fa").then((icons) => {
      setIcon(() => icons[iconName]);
    });
  }, [platform]);

  return (
    <a
      className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {Icon ? <Icon className="text-white text-3xl p-2" /> : <span>...</span>}
    </a>
  );
};
