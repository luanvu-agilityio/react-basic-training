import { ReactNode } from 'react';
import styled from 'styled-components';
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

// Styled Components
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 0;
  width: 80%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease-out;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 576px) {
    width: 95%;
    max-width: none;
  }
`;

const HeaderContainer = styled.div`
  padding: 16px 24px;
  margin-bottom: 0;
  background: linear-gradient(135deg, var(--orange-color), #ff9f43);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: var(--font-weight-semibold);

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const ModalHeader = styled(Text)`
  margin: 0;
  color: #333;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: var(--font-weight-bold);
`;

const Body = styled.div`
  padding: 24px;
  margin-bottom: 0;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

const CloseButton = styled(Button)`
  background: transparent;
  border: none;
  font-size: 32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SubmitButton = styled(Button)<{ $disabled?: boolean }>`
  background-color: ${(props) =>
    props.$disabled ? 'var(--light-gray-color)' : 'var(--orange-color)'};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  border: none;
  color: var(--black-color);
  font-weight: var(--font-weight-bold);
`;

// Form related styled components
const FormGroup = styled.div`
  margin-bottom: 1.75rem;
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  font-size: 0.9rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--orange-color);
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: 12px;
  margin-top: 0.25rem;
  font-weight: 500;
`;

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
      <ModalBackground>
        <ModalContainer
          ref={modalRef}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <HeaderContainer>
            <ModalHeader as="h2">{title}</ModalHeader>
            <CloseButton variant="close" onClick={() => closeModal(false)} aria-label="Close modal">
              <span aria-hidden="true">×</span>
            </CloseButton>
          </HeaderContainer>
          <Body>{children}</Body>
          <Footer>
            <>
              <Button variant="cancel" onClick={handleCancel}>
                {cancelText}
              </Button>
              {onSubmit && (
                <SubmitButton
                  variant="save"
                  onClick={handleSubmit}
                  disabled={submitDisabled}
                  $disabled={submitDisabled}
                >
                  {submitText}
                </SubmitButton>
              )}
            </>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    )
  );
};

// Export form-related styled components for reuse
export { FormGroup, FormLabel, FormInput, ErrorMessage };

export default Modal;
