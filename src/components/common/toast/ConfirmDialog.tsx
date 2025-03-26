import React, { useState } from 'react';
import ICON from '@constants/toast-icon-src';
import './Toast.css';
import Button from '@components/common/buttons/Button';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsVisible(false);
    setTimeout(onClose, 2000);
  };

  const handleDismiss = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleCloseClick = () => handleDismiss(onCancel);
  const handleCancelClick = () => handleDismiss(onCancel);

  const getDialogClassName = () => {
    return `confirm-dialog confirm-dialog--warning ${!isVisible ? 'confirm-dialog--hidden' : ''}`;
  };
  return (
    <div className="confirm-container">
      <div className={getDialogClassName()}>
        <div className="toast__icon" dangerouslySetInnerHTML={{ __html: ICON['warning'] }}></div>
        <div className="toast__content">
          <p className="toast__title">{title}</p>
          <p className="toast__message">{message}</p>
          <div className="toast__actions">
            <Button
              className="toast__button toast__button--primary"
              onClick={handleConfirmClick}
              htmlType="button"
              buttonType="confirm"
            >
              Confirm
            </Button>
            <Button
              className="toast__button toast__button--secondary"
              onClick={handleCancelClick}
              htmlType="button"
              buttonType="cancel"
            >
              Cancel
            </Button>
          </div>
        </div>
        <Button
          className="toast__close"
          htmlType="button"
          buttonType="close"
          onClick={handleCloseClick}
        >
          &times;
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDialog;
