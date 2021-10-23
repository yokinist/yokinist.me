import Image from 'next/image';
import React from 'react';

type Props = {
  emoji: string;
  size?: number;
};

export const Twemoji: React.VFC<Props> = ({ emoji, size = 24 }) => {
  const img = emoji.codePointAt(0)?.toString(16);
  if (!img) return null;
  return (
    <span className="flex items-center min-w-max">
      <Image src={`https://twemoji.maxcdn.com/v/latest/svg/${img}.svg`} height={size} width={size} alt={emoji} />
    </span>
  );
};
