import React from 'react';
import './header.css';
export interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="back-icon" onClick={onClick}>
      <img
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg"
        alt="Click to get back"
      />
    </div>
  );
};

export default BackButton;
