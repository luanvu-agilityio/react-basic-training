import { CSSProperties } from 'react';

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarVariant = 'round' | 'rectangle';

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  style?: CSSProperties;
  onError?: () => void;
}

const getAvatarSize = (size: AvatarSize = 'medium'): number => {
  const sizes = {
    small: 32,
    medium: 65,
    large: 120,
  };
  return sizes[size];
};

const Avatar = ({
  src,
  alt,
  className = 'avatar',
  size = 'medium',
  variant = 'round',
  style,
  onError,
}: AvatarProps) => {
  const baseStyles: CSSProperties = {
    width: getAvatarSize(size),
    height: getAvatarSize(size),
    borderRadius: variant === 'round' ? '50%' : '4px',
    objectFit: 'cover',
    ...style,
  };

  return <img className={className} src={src} alt={alt} style={baseStyles} onError={onError} />;
};

export default Avatar;
