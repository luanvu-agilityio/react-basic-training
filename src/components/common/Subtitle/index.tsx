import React from 'react';
/**
 * A simple Subtitle component for React applications.
 *
 * This component renders a heading level 2 (h2) element with customizable text
 * and styling through className prop.
 *
 * Props:
 * - `subtitle` (string): The text to be displayed as subtitle. Defaults to 'sign in'
 * - `className` (string, optional): Additional CSS class names for styling
 */
interface SubtitleProps {
  subtitle: string;
  className?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ subtitle = 'sign in', className }) => (
  <h2 className={className}>{subtitle}</h2>
);
