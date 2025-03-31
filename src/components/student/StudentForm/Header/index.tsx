import React from 'react';
import Button from '@components/common/Button';
import './index.css';
/**
 * FormHeader Component
 *
 * A reusable header component for modal forms that includes a title and close button.
 */
interface FormHeaderProps {
  title: string;
  /** Callback function for close button click */
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="popup-header">
      <h2>{title}</h2>
      <Button className="close-btn" onClick={onClose}>
        {' '}
        &times;
      </Button>
    </div>
  );
};

export default FormHeader;
