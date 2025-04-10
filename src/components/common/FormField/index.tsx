import { ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import ImageIcon from '../ImageIcon';

/**
 * A unified FormField component that combines label and input functionality
 *
 * This component renders an input field with an optional label and optional icon.
 *
 * Props:
 * - `name` (string): The unique identifier for the input field.
 * - `label` (string, optional): The text to display as label. If not provided, no label will be rendered.
 * - `type` (string, optional): The type of the input field. Defaults to "text".
 * - `placeholder` (string, optional): Placeholder text for the input field. Defaults to an empty string.
 * - `value` (string): The current value of the input field.
 * - `disabled` (boolean, optional): A flag to disable the input field. Defaults to `false`.
 * - `onInputChange` (function): A callback function triggered when the input value changes.
 * - `onKeyDown` (function, optional): A callback function triggered when a key is pressed in the input field.
 * - `onClick` (function, optional): A callback function triggered when the input is clicked.
 * - `style` (React.CSSProperties, optional): Inline styles for the input field.
 * - `className` (string, optional): Additional CSS class names for styling the input field.
 * - `labelClassName` (string, optional): Additional CSS class names for styling the label.
 * - `hasError` (boolean, optional): A flag to indicate if the input field has an error. Defaults to `false`.
 * - `icon` (ReactNode, optional): A custom icon component to render with the input.
 * - `iconPosition` (string, optional): Position of the icon, either "left" or "right". Defaults to "right".
 * - `imgSrc` (string, optional): The source URL for an optional icon image (legacy support).
 * - `imgAlt` (string, optional): The alt text for the icon image. Defaults to "input icon".
 * - `imgClassName` (string, optional): Additional CSS class names for styling the icon.
 * - `min` (number | string, optional): Minimum value for number input types.
 * - `max` (number | string, optional): Maximum value for number input types.
 */

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  className?: string;
  labelClassName?: string;
  hasError?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  imgSrc?: string;
  imgAlt?: string;
  imgClassName?: string;
  min?: number | string;
  max?: number | string;
}

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  style,
  disabled,
  required,
  onInputChange,
  onKeyDown,
  onClick,
  className = '',
  labelClassName = '',
  hasError = false,
  icon,
  iconPosition = 'right',
  imgSrc,
  imgAlt = 'input icon',
  imgClassName = '',
  min,
  max,
}: FormFieldProps) => {
  // Styling config
  const disabledStyles: CSSProperties = disabled
    ? {
        backgroundColor: 'var(--gray-color)',
        color: 'var(--dark-gray-color)',
        cursor: 'not-allowed',
        opacity: 0.7,
      }
    : {};

  const errorStyles: CSSProperties = hasError
    ? {
        border: '1px solid var(--color-error)',
      }
    : {};

  // Determine which icon to use (custom icon or ImageIcon)
  const iconElement =
    icon ||
    (imgSrc && <ImageIcon loading="lazy" src={imgSrc} alt={imgAlt} className={imgClassName} />);

  // Input props to be applied regardless of icon presence
  const inputProps = {
    id: name,
    type,
    name,
    placeholder,
    value,
    disabled,
    required,
    onChange: onInputChange,
    onKeyDown,
    onClick,
    min,
    max,
    className: 'form-input',
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <label
        htmlFor={name}
        className={`form-label ${labelClassName}`}
        style={{
          fontSize: '14px',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--dark-gray-color)',
          display: 'block',
          marginBottom: '4px',
        }}
      >
        {label}
      </label>
    );
  };

  const renderInput = () => {
    // If we have an icon, render a container with both input and icon
    if (iconElement) {
      const containerStyles: CSSProperties = {
        border: hasError ? '1px solid var(--color-error)' : '1px solid var(--input-border-color)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: iconPosition === 'left' ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        position: 'relative',
        ...style,
      };

      const inputStyles: CSSProperties = {
        ...disabledStyles,
        border: 'none',
        outline: 'none',
        flex: 1,
      };

      const iconStyles: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      return (
        <div className={`input-with-icon ${className}`} style={containerStyles}>
          <input {...inputProps} style={inputStyles} />
          <div className="input-icon" style={iconStyles}>
            {iconElement}
          </div>
        </div>
      );
    }

    // Otherwise, render just the input
    return (
      <input
        {...inputProps}
        className={`form-input ${className}`}
        style={{ ...style, ...disabledStyles, ...errorStyles }}
      />
    );
  };

  return (
    <div className="form-field">
      {renderLabel()}
      {renderInput()}
    </div>
  );
};

export default FormField;
