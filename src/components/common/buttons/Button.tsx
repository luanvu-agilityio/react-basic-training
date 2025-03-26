import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import './Button.css';
import { ButtonType } from 'types/button';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  //Button content
  children: React.ReactNode;
  //Button action type - determines styling and default icon
  buttonType?: ButtonType;
  //Handle click event
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  // fullwidth property
  fullWidth?: boolean;

  // loading state
  isLoading?: boolean;
  className?: string;
  id?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  buttonType,
  onClick,
  fullWidth = false,
  isLoading,
  className,
  id,
  disabled = false,
  htmlType = 'button',
  ...restProps
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  const buttonClass = [
    'action-btn',
    `action-btn--${buttonType}`,
    fullWidth ? 'action-btn--full-width' : '',
    isLoading ? 'action-btn--loading' : '',
    disabled ? 'action-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      id={id}
      type={htmlType}
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading}
      <span className="action-btn__text">{isLoading ? 'Loading...' : children}</span>
      <span className="action-btn__spinner" aria-hidden="true"></span>
    </button>
  );
};
export default Button;
