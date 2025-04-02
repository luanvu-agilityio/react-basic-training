import React from 'react';

/**
 * A reusable FormLabel component for
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

const FormLabel = ({ htmlFor, children, className = '' }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`form__label ${className}`}
    style={{
      fontSize: '14px',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--dark-gray-color)',
    }}
  >
    {children}
  </label>
);
export default FormLabel;
