import Image from 'next/image';
import React from 'react';

const TWEMOJI_CDN_BASE_URL = 'https://twemoji.maxcdn.com/v/latest/svg';

type Props = {
  emoji: string;
  size?: number;
};

export const Twemoji: React.VFC<Props> = ({ emoji, size = 24 }) => {
  const emojiString = emoji.codePointAt(0)?.toString(16);
  if (!emojiString) return null;
  return (
    <Image
      className="flex items-center min-w-max"
      src={`${TWEMOJI_CDN_BASE_URL}/${emojiString}.svg`}
      height={size}
      width={size}
      alt={emoji}
    />
  );
};
