//Data input component with icon
import React, { KeyboardEvent } from 'react';
import FormInput, { FormInputProps } from '../FormInput';

/**
 * A reusable InputWithIcon component for React applications.
 *
 * This component renders an input field with an accompanying icon. It supports
 * customizable properties such as type, value, error state, and event handlers.
 * The icon is displayed alongside the input field, making it suitable for use cases
 * like date pickers, search bars, or other input fields with visual indicators.
 *
 * Props:
 * - `id` (string): The unique identifier for the input field.
 * - `type` (string, optional): The type of the input field (e.g., "text", "date"). Defaults to "date".
 * - `value` (string): The current value of the input field.
 * - `onChange` (function): A callback function triggered when the input value changes.
 * - `onKeyDown` (function, optional): A callback function triggered when a key is pressed in the input field.
 * - `hasError` (boolean, optional): A flag to indicate if the input field has an error. Defaults to `false`.
 * - `className` (string, optional): Additional CSS class names for styling the input field. Defaults to an empty string.
 * - `icon` (object): The icon to display next to the input field.
 *   - `alt` (string): The alt text for the icon.
 *   - `src` (string): The source URL for the icon image.
 *   - `className` (string, optional): Additional CSS class names for styling the icon.
 * - `...inputProps` (FormInputProps): Additional props for the underlying FormInput component.
 */
interface InputWithIconProps extends FormInputProps {
  hasError?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  icon: {
    alt: string;
    src: string;
    className?: string;
  };
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  id,
  value,
  onChange,
  onKeyDown,
  hasError = false,
  className = '',
  type = 'date',
  icon,
  ...inputProps
}) => (
  <div
    className={`input-with-icon ${className}`}
    style={{
      border: hasError ? '1px solid #ef4444' : '1px solid #d1d5db',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}
  >
    <FormInput
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`form-input ${className}`}
      {...inputProps}
    />
    <img loading="lazy" src={icon.src} alt={icon.alt} className={icon.className} />
  </div>
);
export default InputWithIcon;
