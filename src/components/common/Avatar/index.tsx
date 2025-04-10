import { CSSProperties } from 'react';
interface AvatarProps {
  className: string;
  src: string;
  alt: string;
  style?: CSSProperties;
  onError?: () => void;
}

const Avatar = ({ src, alt, className = 'avatar', style, onError }: AvatarProps) => {
  return <img className={className} src={src} alt={alt} style={style} onError={onError} />;
};
export default Avatar;
