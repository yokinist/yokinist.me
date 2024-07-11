import Image from "next/image";
import React from "react";

const TWEMOJI_CDN_BASE_URL = "https://cdn.jsdelivr.net/npm/@twemoji/svg";

type Props = {
  emoji: string;
  size?: number;
};

export const Twemoji: React.VFC<Props> = ({ emoji, size = 24 }) => {
  const emojiString = emoji.codePointAt(0)?.toString(16);
  if (!emojiString) return null;
  return (
    <Image
      src={`${TWEMOJI_CDN_BASE_URL}/${emojiString}.svg`}
      height={size}
      width={size}
      alt={emoji}
    />
  );
};
