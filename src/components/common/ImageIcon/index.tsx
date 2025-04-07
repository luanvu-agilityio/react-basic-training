import React from 'react';

interface ImageIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  onError?: (e: HTMLImageElement) => void;
  loading?: 'lazy' | 'eager';
}

const ImageIcon: React.FC<ImageIconProps> = ({ src, alt, size = 24, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`image-icon ${className}`}
      loading="lazy"
      style={{
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
};

export default ImageIcon;
