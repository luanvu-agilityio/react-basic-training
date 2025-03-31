import React, { useEffect, useState } from 'react';
import ICON from '@constants/toast-icon-src';
import './index.css';
import Button from '@components/common/Button';
import { ToastType } from 'types/toast';

/**
 * A reusable Toast notification component for React applications.
 *
 * This component displays temporary notifications with different types (success, error, warning, info)
 * and automatically dismisses them after a specified duration. It includes an icon, title,
 * message, close button, and progress bar.
 *
 * Features:
 * - Multiple notification types with corresponding icons
 * - Auto-dismiss with configurable duration
 * - Progress bar indicating remaining time
 * - Smooth enter/exit animations
 * - Manual close option
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

const Toast: React.FC<ToastProps> = ({ type, title, message, duration = 3000, onClose }) => {
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
    <div className="toast-container">
      {/* Main toast component with dynamic classes based on type and visibility */}
      <div className={`toast toast--${type} ${isVisible ? 'toast--visible' : 'toast--hidden'}`}>
        {/* Icon section - uses dangerouslySetInnerHTML for SVG icons */}
        <div className="toast__icon" dangerouslySetInnerHTML={{ __html: ICON[type] }}></div>
        <div className="toast__content">
          <p className="toast__title">{title}</p>
          <p className="toast__message">{message}</p>
        </div>

        {/* Close button */}
        <Button className="toast__close" onClick={handleCloseClick}>
          &times;
        </Button>

        {/* Progress bar indicating remaining time */}
        <div className="toast__progress">
          <div
            className="toast__progress-bar"
            style={{
              animation: `progress ${duration}ms linear forwards`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
