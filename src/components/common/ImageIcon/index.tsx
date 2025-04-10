interface ImageIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  onError?: (e: HTMLImageElement) => void;
  loading?: 'lazy' | 'eager';
}

const ImageIcon = ({
  src,
  alt,
  size = 24,
  className = '',
  loading = 'lazy',
  onError,
}: ImageIconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`image-icon ${className}`}
      loading={loading}
      style={{
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
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
