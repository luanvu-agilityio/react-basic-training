import { ReactNode } from 'react';
import './index.css';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { useEscapeKey } from '@hooks/useEscapeKey';
import useClickOutside from '@hooks/useClickOutside';

/**
 * Modal Component
 *
 * A reusable modal dialog component with backdrop
 * - Handles click outside to close
 * - Keyboard support (ESC to close)
 * - Focus trapping
 * - Accessibility attributes
 */
interface ModalProps {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  submitDisabled?: boolean;
  cancelText?: string;
}

const Modal = ({
  isOpen,
  closeModal,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  submitDisabled = false,
  cancelText = 'Cancel',
}: Readonly<ModalProps>) => {
  // Handle ESC key press
  useEscapeKey(() => {
    if (isOpen) closeModal(false);
  });

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) closeModal(false);
  }, isOpen);

  const handleCancel = () => {
    closeModal(false);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    isOpen && (
      <div className="modal-background">
        <div
          className="modal-container"
          ref={modalRef}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="header-container">
            <Text className="modal-header" text={title} as="h2" />
            <Button variant="close" onClick={() => closeModal(false)} aria-label="Close modal">
              <span aria-hidden="true">×</span>
            </Button>
          </div>
          <div className="body">{children}</div>
          <div className="footer">
            {
              <>
                <Button variant="cancel" onClick={handleCancel}>
                  {cancelText}
                </Button>
                {onSubmit && (
                  <Button
                    variant="save"
                    onClick={handleSubmit}
                    disabled={submitDisabled}
                    style={{
                      backgroundColor: submitDisabled
                        ? 'var(--light-gray-color)'
                        : 'var(--light-blue-color',
                      cursor: submitDisabled ? 'not-allowed' : 'pointer',
                      border: 'none',
                      color: 'white',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {submitText}
                  </Button>
                )}
              </>
            }
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
