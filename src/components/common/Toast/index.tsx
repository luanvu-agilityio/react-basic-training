import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ICON from '@constants/toast-icon-src';
import Button from '@components/common/Button';
import { ToastType } from 'types/toast';

/**
 * A reusable Toast notification component
 *
 * This component displays temporary notifications with different types (success, error, warning, info)
 * and automatically dismisses them after a specified duration.
 *
 * Features:
 * - Multiple notification types with corresponding icons
 * - Auto-dismiss with configurable duration
 * - Progress bar indicating remaining time
 *
 * Props:
 * - `type` (ToastType): The type of notification (success, error, warning, info)
 * - `title` (string): The title of the notification
 * - `message` (string): The main message content
 * - `duration` (number, optional): Time in milliseconds before auto-dismiss. Defaults to 3000ms
 * - `onClose` (function): Callback function triggered when toast is closed
 */
interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

// Define animations
const toastInAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const toastOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

// Styled Components
const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 35rem;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToastWrapper = styled.div<{ type: ToastType; isVisible: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.6rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? toastInAnimation : toastOutAnimation)} 0.3s ease
    forwards;
  transition: opacity 0.5s ease-out;

  ${(props) => {
    switch (props.type) {
      case 'success':
        return css`
          background-color: var(--color-success-light);
          border-left: 4px solid var(--color-success);
        `;
      case 'error':
        return css`
          background-color: var(--color-error-light);
          border-left: 4px solid var(--color-error);
        `;
      case 'warning':
        return css`
          background-color: var(--color-warning-light);
          border-left: 4px solid var(--color-warning);
        `;
      case 'info':
        return css`
          background-color: var(--color-info-light);
          border-left: 4px solid var(--color-info);
        `;
      default:
        return css`
          background-color: var(--color-info-light);
          border-left: 4px solid var(--color-info);
        `;
    }
  }}
`;

const ToastIcon = styled.div<{ type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 1.2rem;
  width: 3rem;
  height: 3rem;

  ${(props) => {
    switch (props.type) {
      case 'success':
        return css`
          color: var(--color-success);
        `;
      case 'error':
        return css`
          color: var(--color-error);
        `;
      case 'warning':
        return css`
          color: var(--color-warning);
        `;
      case 'info':
        return css`
          color: var(--color-info);
        `;
      default:
        return css`
          color: var(--color-info);
        `;
    }
  }}
`;

const ToastContent = styled.div`
  flex-grow: 1;
`;

const ToastTitle = styled.p`
  font-weight: 600;
  margin: 0 0 0.4rem;
  color: var(--color-text);
  font-size: var(--font-size-14);
  line-height: 1.4;
`;

const ToastMessage = styled.p`
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-14);
  line-height: 1.5;
`;

const ToastProgressContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ToastProgressBar = styled.div<{ type: ToastType; duration: number }>`
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 0;
  animation: ${progressAnimation} ${(props) => props.duration}ms linear forwards;

  ${(props) => {
    switch (props.type) {
      case 'success':
        return css`
          background-color: var(--color-success);
        `;
      case 'error':
        return css`
          background-color: var(--color-error);
        `;
      case 'warning':
        return css`
          background-color: var(--color-warning);
        `;
      case 'info':
        return css`
          background-color: var(--color-info);
        `;
      default:
        return css`
          background-color: var(--color-info);
        `;
    }
  }}
`;

const Toast = ({ type, title, message, duration = 3000, onClose }: ToastProps) => {
  // State to manage visibility of the toast
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Effect to handle auto-dismiss functionality
   * Sets up a timer to hide the toast after the specified duration
   * Includes a cleanup function to prevent memory leaks
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Add slight delay before calling onClose to allow exit
      setTimeout(onClose, 300);
    }, duration);

    // Cleanup function to clear the timer if component unmounts
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  /**
   * Handles manual close button click
   * Triggers the exit animation and calls onClose after animation completes
   */
  const handleCloseClick = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <ToastContainer>
      <ToastWrapper type={type} isVisible={isVisible}>
        {/* Icon section - uses dangerouslySetInnerHTML for SVG icons */}
        <ToastIcon type={type} dangerouslySetInnerHTML={{ __html: ICON[type] }} />

        <ToastContent>
          <ToastTitle>{title}</ToastTitle>
          <ToastMessage>{message}</ToastMessage>
        </ToastContent>

        {/* Close button */}
        <Button variant="close" onClick={handleCloseClick}>
          &times;
        </Button>

        {/* Progress bar indicating remaining time */}
        <ToastProgressContainer>
          <ToastProgressBar type={type} duration={duration} />
        </ToastProgressContainer>
      </ToastWrapper>
    </ToastContainer>
  );
};

export default Toast;
