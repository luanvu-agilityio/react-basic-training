import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@components/common/Modal';
import ICON from '@constants/toast-icon-src';

/**
 * A ConfirmDialog component for displaying confirmation dialogs
 *
 * This component leverages the Modal component to display a warning dialog
 * with confirmation and cancel options.
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

// Styled Components
const DialogContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  margin-right: 15px;
`;

const MessageContainer = styled.div`
  flex: 1;
  font-size: 16px;
`;

const ConfirmDialog = ({ title, message, onClose, onConfirm, onCancel }: ConfirmDialogProps) => {
  // State to manage dialog visibility
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Handles the confirm button click
   * 1. Calls the onConfirm callback
   * 2. Closes the dialog
   */
  const handleConfirmClick = () => {
    onConfirm();
    setIsVisible(false);
    onClose();
  };

  /**
   * Handles the cancel action
   * 1. Calls the onCancel callback
   * 2. Closes the dialog
   */
  const handleCancelClick = () => {
    onCancel();
    setIsVisible(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isVisible}
      closeModal={() => handleCancelClick()}
      title={title}
      onSubmit={handleConfirmClick}
      submitText="Confirm"
      cancelText="Cancel"
    >
      <DialogContent>
        <IconContainer
          className="toast-icon"
          dangerouslySetInnerHTML={{ __html: ICON['warning'] }}
        />
        <MessageContainer>{message}</MessageContainer>
      </DialogContent>
    </Modal>
  );
};

export default ConfirmDialog;
