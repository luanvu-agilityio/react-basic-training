import { useState } from 'react';
import ICON from '@constants/toast-icon-src';
import Button from '@components/common/Button';
import Text from '../Text';

/**
 * A ConfirmDialog component for displaying confirmation dialogs
 *
 * This component renders a dialog box with a title, message, and action buttons
 * for confirming or canceling an action.
 *
 * Props:
 * - `title` (string): The title of the confirmation dialog.
 * - `message` (string): The message displayed in the dialog.
 * - `onClose` (function): A callback function triggered when the dialog is closed.
 * - `onConfirm` (function): A callback function triggered when the confirm button is clicked.
 * - `onCancel` (function): A callback function triggered when the cancel button is clicked.
 */
interface ConfirmDialogProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ title, message, onClose, onConfirm, onCancel }: ConfirmDialogProps) => {
  // State to manage dialog visibility and animations
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handles the confirm button click
   * 1. Calls the onConfirm callback if provided
   * 2. Hides the dialog
   * 3. Triggers onClose after animation (2000ms)
   */
  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsVisible(false);
    setTimeout(onClose, 2000);
  };

  /**
   * Generic dismiss handler used by both close and cancel actions
   * 1. Executes the provided callback if any
   * 2. Hides the dialog
   * 3. Triggers onClose after animation (300ms)
   *
   * @param callback - Optional function to call before dismissing
   */
  const handleDismiss = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Handler for the close button (X)
  const handleCloseClick = () => handleDismiss(onCancel);

  // Handler for the Cancel button
  const handleCancelClick = () => handleDismiss(onCancel);

  /**
   * Generates the className string for the dialog
   * Includes base classes and visibility-dependent class
   * Used for styling and animations
   */
  const getDialogClassName = () => {
    return `confirm-dialog warning ${!isVisible ? 'hidden' : ''}`;
  };

  return (
    <div
      className="confirm-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className={getDialogClassName()}
        style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          maxWidth: '400px',
        }}
      >
        <div
          className="toast-icon"
          dangerouslySetInnerHTML={{ __html: ICON['warning'] }}
          style={{ marginRight: '15px' }}
        ></div>

        <div className="toast-content" style={{ flex: 1 }}>
          <Text
            text={title}
            as="p"
            className="toast-title"
            style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
          />

          <Text
            text={message}
            as="p"
            className="toast-message"
            style={{
              marginBottom: '20px',
              color: 'var(--color-text)',
              fontSize: 'var(--font-size-14)',
              lineHeight: '1.5',
            }}
          />

          <div className="toast-actions" style={{ display: 'flex', gap: '10px' }}>
            <Button variant="confirm" onClick={handleConfirmClick}>
              Confirm
            </Button>
            <Button variant="cancel" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
        </div>

        <Button
          variant="close"
          onClick={handleCloseClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '30px',
          }}
        >
          &times;
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDialog;
