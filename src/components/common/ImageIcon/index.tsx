import { CSSProperties } from 'react';

interface ImageIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  onError?: (e: HTMLImageElement) => void;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
}

const ImageIcon = ({
  src,
  alt,
  size = 24,
  className = '',
  loading = 'lazy',
  onError,
  style = { objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' },
}: ImageIconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`image-icon ${className}`}
      loading={loading}
      style={style}
      onError={(e) => {
        if (onError) {
          onError(e.currentTarget);
        } else {
          e.currentTarget.style.display = 'none';
        }
      }}
      onError={(e) => {
        if (onError) {
          onError(e.currentTarget);
        } else {
          e.currentTarget.style.display = 'none';
        }
      }}
    />
  );
};

export default ImageIcon;
