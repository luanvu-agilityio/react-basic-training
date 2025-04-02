import React from 'react';

interface AvatarProps {
  className: string;
  src: string;
  alt: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

const Avatar = ({ src, alt, className = '', style, loading = 'lazy' }: AvatarProps) => {
  return <img className={className} src={src} alt={alt} style={style} loading={loading} />;
};
export default Avatar;
