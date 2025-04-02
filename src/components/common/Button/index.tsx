import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import './index.css';

/**
 * A reusable Button component
 *
 * This component renders a customizable button element with support for
 * additional props, click handling, and disabled state.
 *
 * Props:
 * - `children` (React.ReactNode): The content to be displayed inside the button.
 * - `onClick` (function): A callback function triggered when the button is clicked.
 * - `className` (string): A CSS class name for styling the button.
 * - `disabled` (boolean, optional): A flag to disable the button. Defaults to `false`.
 * - `...restProps` (ButtonHTMLAttributes<HTMLButtonElement>): Additional props for the button element.
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  className: string;
}

export const Button = ({
  children,
  onClick,
  isLoading,
  className,
  disabled = false,
  ...restProps
}: ButtonProps) => {
  /**
   * Handles click events on the button
   * Prevents default behavior when button is loading or disabled
   * Calls the provided onClick handler only when button is interactive
   *
   * @param event - The mouse event from clicking the button
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {/* Show loading indicator or children content */}
      {isLoading ? <span className="btn-text">Loading...</span> : children}
    </button>
  );
};
export default Button;
