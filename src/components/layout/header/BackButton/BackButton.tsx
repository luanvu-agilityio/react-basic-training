import React from 'react';
import '../Header/Header.css';
export interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      className="back-icon"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label="Go back"
    >
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg"
        alt="Click to get back"
        loading="lazy"
      />
    </button>
  );
};

export default BackButton;
