import React from 'react';

/**
 * A reusable FormLabel component for React applications.
 *
 * This component renders a label element for form inputs.
 *
 * Props:
 * - `htmlFor` (string): The ID of the input element this label is associated with.
 * - `children` (React.ReactNode): The content to be displayed inside the label.
 * - `className` (string, optional): Additional CSS class names for styling the label. Defaults to an empty string.
 */
interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

export const FormLabel: React.FC<LabelProps> = ({ htmlFor, children, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`form__label ${className}`}
    style={{
      fontSize: '14px',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--dark-gray-color)',
    }}
  >
    {children}
  </label>
);
