import React, { useState } from 'react';
import ICON from '@constants/toast-icon-src';
import '../Toast/index.css';
import Button from '../Button';

/**
 * A ConfirmDialog component for displaying confirmation dialogs in React applications.
 *
 * This component renders a dialog box with a title, message, and action buttons
 * for confirming or canceling an action. It also supports closing the dialog.
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

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
}) => {
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
    return `confirm-dialog confirm-dialog--warning ${!isVisible ? 'confirm-dialog--hidden' : ''}`;
  };

  return (
    <div className="confirm-container">
      <div className={getDialogClassName()}>
        <div className="toast__icon" dangerouslySetInnerHTML={{ __html: ICON['warning'] }}></div>

        {/* Content section with title, message and action buttons */}
        <div className="toast__content">
          <p className="toast__title">{title}</p>
          <p className="toast__message">{message}</p>
          <div className="toast__actions">
            <Button className="toast__button toast__button--primary" onClick={handleConfirmClick}>
              Confirm
            </Button>
            <Button className="toast__button toast__button--secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
        </div>

        {/* Close button (X) */}
        <Button className="toast__close" onClick={handleCloseClick}>
          &times;
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDialog;
