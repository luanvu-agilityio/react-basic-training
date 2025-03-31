import React from 'react';
import Button from '@components/common/Button';
import './index.css';
/**
 * FormFooter Component
 *
 * A reusable footer component for forms with cancel and submit actions.
 */
interface FormFooterProps {
  /** Callback function for cancel button click */
  onCancel: () => void;
  /** Callback function for submit button click */
  onSubmit: () => void;
  submitButtonText: string;
  hasErrors?: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({
  onCancel,
  onSubmit,
  submitButtonText,
  hasErrors,
}) => {
  return (
    <div className="popup-footer">
      {/* Cancel button */}
      <Button className="btn btn-cancel" onClick={onCancel}>
        Cancel
      </Button>

      {/* Submit button with dynamic styling based on error state */}
      <Button
        className="btn btn-add"
        style={{
          backgroundColor: hasErrors ? 'var(--light-gray-color)' : 'var(--orange-color)',
          cursor: hasErrors ? 'not-allowed' : 'pointer',
        }}
        onClick={onSubmit}
        disabled={hasErrors}
      >
        {submitButtonText}
      </Button>
    </div>
  );
};

export default FormFooter;
