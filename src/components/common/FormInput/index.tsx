import React from 'react';
/**
 * A reusable FormInput component for React applications.
 *
 * This component renders an input field with customizable properties such as type, placeholder,
 * value, and styles. It also supports event handlers for change and keydown events.
 *
 * Props:
 * - `id` (string): The unique identifier for the input field.
 * - `type` (string, optional): The type of the input field (e.g., "text", "password"). Defaults to "text".
 * - `placeholder` (string, optional): Placeholder text for the input field. Defaults to an empty string.
 * - `value` (string): The current value of the input field.
 * - `disabled` (boolean, optional): A flag to disable the input field. Defaults to `false`.
 * - `onChange` (function): A callback function triggered when the input value changes.
 * - `onKeyDown` (function, optional): A callback function triggered when a key is pressed in the input field.
 * - `style` (React.CSSProperties, optional): Inline styles for the input field.
 * - `className` (string, optional): Additional CSS class names for styling the input field. Defaults to an empty string.
 */

export interface FormInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type = 'text',
  placeholder = '',
  value,
  style,
  disabled,
  onChange,
  onKeyDown,
  className = '',
}) => {
  const disabledStyles: React.CSSProperties = disabled
    ? {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        cursor: 'not-allowed',
        opacity: 0.7,
      }
    : {};

  return (
    <input
      type={type}
      className={` ${className}`}
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{ ...style, ...disabledStyles }}
    />
  );
};
export default FormInput;
