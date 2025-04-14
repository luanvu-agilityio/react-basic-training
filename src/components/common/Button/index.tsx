import React, { ButtonHTMLAttributes, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

// Define button variants
export type ButtonVariant =
  | 'submit'
  | 'add'
  | 'back'
  | 'toggle'
  | 'close'
  | 'upload'
  | 'delete'
  | 'edit'
  | 'cancel'
  | 'confirm'
  | 'pagination'
  | 'notification'
  | 'link'
  | 'save'
  | 'dropdown';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
}

// Define size mappings
const sizeStyles = {
  small: css`
    padding: 0.6rem 1.2rem;
    font-size: 12px;
  `,
  medium: css`
    padding: 1rem 2rem;
    font-size: 14px;
  `,
  large: css`
    padding: 1.4rem 2.8rem;
    font-size: 16px;
  `,
};

// Styled Button Base
const StyledButton = styled.button<{
  variant?: ButtonVariant;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Size styles */
  ${(props) => (props.size && sizeStyles[props.size]) || sizeStyles.medium}

  /* Disabled state */
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Base button (default) */
  ${(props) =>
    !props.variant &&
    css`
      padding: 1rem 2rem;
      border-radius: 4px;
      font-size: 12px;
    `}

  /* Submit button */
  ${(props) =>
    props.variant === 'submit' &&
    css`
      margin-top: 1rem;
      padding: 1.4rem;
      border: none;
      border-radius: 0.4rem;
      background-color: var(--orange-color);
      color: #333;
      font-size: 14px;
      font-weight: var(--font-weight-regular);
      text-transform: uppercase;

      &:hover {
        background-color: var(--button-hover-color);
      }
    `}
  
  /* Add button */
  ${(props) =>
    props.variant === 'add' &&
    css`
      background-color: var(--orange-color);
      font-size: 14px;
      font-weight: bold;
      border: none;
      padding: 13px 25px;

      &:hover {
        background-color: var(--button-hover-color);
      }

      &:disabled {
        background-color: var(--light-gray-color);
        border-color: var(--semi-gray-color);
      }

      @media screen and (max-width: 768px) {
        z-index: 10000;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 90px;
        right: 30px;
        margin-right: 20px;

        span {
          display: none;
        }

        &::after {
          content: '+';
          font-size: 24px;
          font-weight: bold;
        }
      }
    `}
  
  /* Back button */
  ${(props) =>
    props.variant === 'back' &&
    css`
      border: none;
      background-color: transparent;
      padding: 0.5rem;

      img {
        width: 2.3rem;
        height: 2.3rem;
        cursor: pointer;
      }

      &:hover {
        border-radius: 1rem;

        border: 1px solid var(--orange-color);
      }
    `}
  
  /* Toggle button */
  ${(props) =>
    props.variant === 'toggle' &&
    css`
      position: absolute;
      bottom: -13px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;

      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      z-index: 100;
      display: none;

      &:hover {
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
      }

      img {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
      }

      @media screen and (max-width: 992px) {
        display: block;
        padding: 0;
      }

      @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
  
  /* Close button */
  ${(props) =>
    props.variant === 'close' &&
    css`
      background: transparent;
      border: none;
      font-size: 32px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      transition: background-color 0.2s;

      &:hover {
        color: var(--red-color);
        border: none;
        background-color: transparent;
        font-weight: var(--font-weight-semibold);
      }
    `}
  
  /* Upload button */
  ${(props) =>
    props.variant === 'upload' &&
    css`
      border: none;
      border-radius: 4px;
      padding: 0.8rem 1.6rem;
      font-size: 10px;
      background-color: var(--light-gray-color);
      color: #555;

      &:hover {
        background-color: #ddd;
      }
    `}
  
  /* Delete button */
  ${(props) =>
    props.variant === 'delete' &&
    css`
      padding: 0;
      border: none;
      cursor: pointer;
      background-color: transparent;

      @media screen and (max-width: 768px) {
        padding: 0.5rem;
      }
    `}
  
  /* Edit button */
  ${(props) =>
    props.variant === 'edit' &&
    css`
      padding: 0;
      border: none;
      cursor: pointer;
      background-color: transparent;

      @media screen and (max-width: 768px) {
        padding: 0.5rem;
      }
    `}
  
  /* Cancel button */
  ${(props) =>
    props.variant === 'cancel' &&
    css`
      border: 1px solid var(--input-border-color);
      background-color: var(--white-color);
      color: var(--dark-gray-color);

      &:hover {
        background-color: var(--button-hover-color);
        color: var(--white-color);
      }
    `}
  
  /* Confirm button */
  ${(props) =>
    props.variant === 'confirm' &&
    css`
      background: var(--orange-color);
      color: var(--color-white);

      &:hover {
        background-color: var(--button-hover-color);
        color: var(--black-color);
      }
    `}
  
  /* Pagination button */
  ${(props) =>
    props.variant === 'pagination' &&
    css`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 3.5rem;
      height: 2.5rem;
      padding: 0.6rem 1.2rem;
      border-radius: 4px;
      border: 1px solid #ced4da;
      background-color: #fff;
      color: var(--semi-light-blue-color);
      transition: all 0.2s ease;
      box-sizing: border-box;

      &.btn-first span,
      &.btn-prev span,
      &.btn-next span,
      &.btn-last span {
        font-size: 10px;
        font-weight: var(--font-weight-semibold);
      }

      &:hover:not(:disabled) {
        background-color: var(--pagination-btn-color);
        border-color: var(--semi-light-blue-color);
        color: black;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 480px) {
        width: 2.5rem;
        min-width: 2.5rem;
        padding: 0.4rem;
      }
    `}
  
  /* Notification button */
  ${(props) =>
    props.variant === 'notification' &&
    css`
      border: none;
      background-color: transparent;
      position: relative;
      margin-left: 15px;
      cursor: pointer;
    `}
  
  /* Link button */
  ${(props) =>
    props.variant === 'link' &&
    css`
      background: none;
      border: none;
      color: var(--orange-color);
      text-decoration: underline;
      padding: 0;

      &:hover {
        color: var(--button-hover-color);
      }
    `}
  
  /* Save button */
  ${(props) =>
    props.variant === 'save' &&
    css`
      background-color: var(--orange-color);
      color: var(--white-color);
      border: none;

      &:hover:not(.disabled) {
        background-color: var(--button-hover-color);
      }
    `}
  
  /* Dropdown button */
  ${(props) =>
    props.variant === 'dropdown' &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 14px;
      background-color: white;
      border: 1px solid var(--input-border-color);
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      min-height: 38px;
      margin-left: 0;
      max-width: 240px;

      &:hover {
        border-color: #ccc;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      @media (max-width: 480px) {
        min-width: unset;
        padding: 8px 12px;
        font-size: 13px;
        min-height: 36px;
      }

      @media screen and (max-width: 320px) {
        font-size: 12px;
        padding: 6px 10px;
        min-height: 32px;
      }
    `}
  
  /* Loading state */
  ${(props) =>
    props.isLoading &&
    css`
      position: relative;
      pointer-events: none;
    `}
  
  /* Media queries for all buttons */
  @media (max-width: 576px) {
    padding: 0.8rem 1.5rem;
  }
`;

const LoadingText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: left;
`;

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
 * - `variant` (ButtonVariant, optional): The visual style variant of the button.
 * - `size` (string, optional): The size of the button ('small', 'medium', 'large'). Defaults to 'medium'.
 * - `isLoading` (boolean, optional): Whether the button is in a loading state.
 * - `...restProps` (ButtonHTMLAttributes<HTMLButtonElement>): Additional props for the button element.
 */
export const Button = ({
  children,
  onClick,
  isLoading,
  className,
  disabled = false,
  variant,
  size = 'medium',
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
    <StyledButton
      className={className}
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant={variant}
      isLoading={isLoading}
      size={size}
      {...restProps}
    >
      {/* Show loading indicator or children content */}
      {isLoading ? <LoadingText>Loading...</LoadingText> : children}
    </StyledButton>
  );
};

export default Button;
