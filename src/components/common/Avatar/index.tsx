import React from 'react';
import { DEFAULT_PROFILE_IMAGE } from '@constants/dummy-user';

interface AvatarProps {
  className: string;
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps & { lazyLoad?: boolean }> = ({
  src,
  alt = 'Profile',
  className,
  style,
  lazyLoad,
}) => {
  // Add transformations to the Cloudinary URL if it exists
  const avatarSrc = src.includes('cloudinary.com') ? src : DEFAULT_PROFILE_IMAGE;

  return (
    <img
      className={className}
      src={avatarSrc}
      alt={alt}
      style={style}
      loading={lazyLoad ? 'lazy' : 'eager'}
      onError={(e) => {
        (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE;
      }}
    />
  );
};
export default Avatar;
