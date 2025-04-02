import React from 'react';
import ImageIcon from '../ImageIcon';

/**
 * A versatile FormInput component
 *
 * This component renders an input field with an optional icon.
 *
 * Props:
 * - `id` (string): The unique identifier for the input field.
 * - `type` (string, optional): The type of the input field (e.g., "text", "password", "date"). Defaults to "text".
 * - `placeholder` (string, optional): Placeholder text for the input field. Defaults to an empty string.
 * - `value` (string): The current value of the input field.
 * - `disabled` (boolean, optional): A flag to disable the input field. Defaults to `false`.
 * - `onChange` (function): A callback function triggered when the input value changes.
 * - `onKeyDown` (function, optional): A callback function triggered when a key is pressed in the input field.
 * - `style` (React.CSSProperties, optional): Inline styles for the input field.
 * - `className` (string, optional): Additional CSS class names for styling the input field. Defaults to an empty string.
 * - `hasError` (boolean, optional): A flag to indicate if the input field has an error. Defaults to `false`.
 * - `imgSrc` (string, optional): The source URL for an optional icon image.
 * - `imgAlt` (string, optional): The alt text for the icon image. Defaults to "input icon".
 * - `imgClassName` (string, optional): Additional CSS class names for styling the icon.
 */

export interface InputFieldProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  hasError?: boolean;
  imgSrc?: string;
  imgAlt?: string;
  imgClassName?: string;
  min?: string;
  max?: number;
}

const InputField = ({
  id,
  type = 'text',
  placeholder = '',
  value,
  style,
  disabled,
  onChange,
  onKeyDown,
  onClick,
  className = '',
  hasError = false,
  imgSrc,
  imgAlt = 'input icon',
  imgClassName = '',
}: InputFieldProps) => {
  const disabledStyles: React.CSSProperties = disabled
    ? {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        cursor: 'not-allowed',
        opacity: 0.7,
      }
    : {};

  const errorStyles: React.CSSProperties = hasError
    ? {
        border: '1px solid #ef4444',
      }
    : {};

  // If we have an image source, render a container with both input and image
  if (imgSrc) {
    return (
      <div
        className={`input-with-icon ${className}`}
        style={{
          border: hasError ? '1px solid #ef4444' : '1px solid #d1d5db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          ...style,
        }}
      >
        <input
          type={type}
          className="form-input"
          id={id}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={disabledStyles && { border: 'none', outline: 'none' }}
          onClick={onClick}
        />
        <ImageIcon loading="lazy" src={imgSrc} alt={imgAlt} className={imgClassName} />
      </div>
    );
  }

  // Otherwise, render just the input
  return (
    <input
      type={type}
      className={`form-input ${className}`}
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={onClick}
      style={{ ...style, ...disabledStyles, ...errorStyles }}
    />
  );
};

export default InputField;
