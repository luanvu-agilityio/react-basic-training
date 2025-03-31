import React from 'react';
import './index.css';

/**
 * A reusable Overlay component for React applications.
 *
 * This component creates a full-screen overlay that can contain child elements
 * and respond to click events.
 *
 */
interface OverlayProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ children, onClick }) => (
  <div className="overlay" onClick={onClick}>
    {children}
  </div>
);
