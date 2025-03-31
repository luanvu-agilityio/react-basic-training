import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '@constants/dummy-user';

interface AvatarProps {
  className: string;
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Profile', className, style }) => (
  <img
    className={className}
    src={src || DEFAULT_PROFILE_IMAGE}
    alt={alt}
    style={style}
    onError={(e) => {
      (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE;
    }}
  />
);
export default Avatar;
