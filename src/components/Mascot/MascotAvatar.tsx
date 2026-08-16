import React from 'react';

interface MascotAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  statusDot?: boolean;
  className?: string;
}

const AVATAR_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  size = 'md',
  statusDot = true,
  className = '',
}) => {
  const sizeClass = AVATAR_SIZES[size];

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizeClass} rounded-full overflow-hidden border-2 border-[#E3262E]/60 shadow-lg shadow-[#E3262E]/20 bg-[#080808] transition-transform hover:scale-105`}
      >
        <img
          src="/mascot/avatar.png"
          alt="SocialSamurai Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      {statusDot && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#E3262E] border-2 border-[#080808] rounded-full animate-pulse" />
      )}
    </div>
  );
};
