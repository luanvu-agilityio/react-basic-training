import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import styled, { css } from 'styled-components';

/**
 * A unified FormField component that combines label and input functionality
 *
 * This component renders an input field with an optional label and optional icon.
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

// Styled Components
const FormFieldContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label<{ className?: string }>`
  display: block;
  margin-bottom: 10px;
  color: var(--dark-gray-color, #555);
  font-size: 14px;
  font-weight: var(--font-weight-semibold, 600);
`;

interface InputProps {
  hasError?: boolean;
  disabled?: boolean;
}

const InputBase = css<InputProps>`
  width: 100%;
  padding: 1rem;
  border: ${(props) =>
    props.hasError
      ? '1px solid var(--color-error, #f44336)'
      : '1px solid var(--input-border-color, #e0e0e0)'};
  border-radius: 4px;
  font-size: var(--font-size-14, 14px);
  background-color: ${(props) => (props.disabled ? 'var(--gray-color, #f0f0f0)' : 'transparent')};
  color: ${(props) => (props.disabled ? 'var(--dark-gray-color, #555)' : 'inherit')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};

  &:focus {
    outline: none;
    border-color: #f5a623;
  }
`;

const StyledInput = styled.input<InputProps>`
  ${InputBase}
`;

interface InputContainerProps {
  hasError?: boolean;
  iconPosition?: 'left' | 'right';
}

const InputWithIconContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;

  flex-direction: ${(props) => (props.iconPosition === 'left' ? 'row-reverse' : 'row')};
  justify-content: space-between;
  position: relative;
  border: ${(props) =>
    props.hasError
      ? '1px solid var(--color-error, #f44336)'
      : '1px solid var(--input-border-color, #e0e0e0)'};
  border-radius: 4px;
`;

const InputWithIcon = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 1rem 0 1rem 1rem;
  font-size: var(--font-size-14, 14px);
  background-color: ${(props) => (props.disabled ? 'var(--gray-color, #f0f0f0)' : 'transparent')};
  color: ${(props) => (props.disabled ? 'var(--dark-gray-color, #555)' : 'inherit')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

// Calendar input specific styling
const CalendarInputContainer = styled.div<{ hasError?: boolean }>`
  border: ${(props) =>
    props.hasError
      ? '1px solid var(--color-error, #f44336)'
      : '1px solid var(--input-border-color, #e0e0e0)'};
  border-radius: 4px;
  position: relative;

  input {
    border: none;
    width: 100%;
    padding: 1rem;
    font-size: var(--font-size-14, 14px);
    z-index: 100;

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      height: auto;
      width: auto;
      background: transparent;
      color: transparent;
      cursor: pointer;
    }
  }

  img {
    z-index: 1;
    position: absolute;
    right: 0;
    padding-right: 1rem;
    pointer-events: auto;
    cursor: pointer;
  }
`;

// ImageIcon component
const ImageIcon = styled.img`
  max-width: 100%;
  height: auto;
`;

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
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
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <Label htmlFor={name} className={labelClassName}>
        {label}
      </Label>
    );
  };

  const renderInput = () => {
    // Handle calendar type specially
    if (type === 'date') {
      return (
        <CalendarInputContainer hasError={hasError}>
          <input {...inputProps} />
          {imgSrc && <img src={imgSrc} alt={imgAlt} className={imgClassName} />}
        </CalendarInputContainer>
      );
    }

    // If we have an icon, render a container with both input and icon
    if (iconElement) {
      return (
        <InputWithIconContainer
          hasError={hasError}
          iconPosition={iconPosition}
          className={className}
        >
          <InputWithIcon {...inputProps} />
          <IconContainer>{iconElement}</IconContainer>
        </InputWithIconContainer>
      );
    }

    // Otherwise, render just the input
    return (
      <StyledInput {...inputProps} className={className} hasError={hasError} disabled={disabled} />
    );
  };

  return (
    <FormFieldContainer>
      {renderLabel()}
      {renderInput()}
    </FormFieldContainer>
  );
};

export default FormField;
