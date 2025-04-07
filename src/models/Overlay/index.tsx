import React from 'react';
import './index.css';

/**
 * A reusable Overlay component
 *
 * This component creates a full-screen overlay that can contain child elements
 * and respond to click events.
 *
 */
interface OverlayProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export const Overlay = ({ children, onClick }: OverlayProps) => (
  <div className="overlay" onClick={onClick}>
    {children}
  </div>
);
