import React, { useEffect, useState } from "react";
import type { IconType } from "react-icons";

type SocialLinkProps = {
  platform: string;
  url: string;
};

export const SocialLink: React.FC<SocialLinkProps> = ({ platform, url }) => {
  const [Icon, setIcon] = useState<IconType | null>(null);

  useEffect(() => {
    const iconName = `Fa${platform}` as keyof typeof import("react-icons/fa");

    import("react-icons/fa").then((icons) => {
      const SelectedIcon = icons[iconName];
      if (SelectedIcon) {
        setIcon(() => SelectedIcon);
      } else {
        console.warn(`Icon "${iconName}" not found in react-icons/fa`);
      }
    });
  }, [platform]);

  return (
    <a
      className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {Icon ? (
        <Icon className="text-white text-3xl p-2" />
      ) : (
        <span className="text-white text-xl">...</span>
      )}
    </a>
  );
};
