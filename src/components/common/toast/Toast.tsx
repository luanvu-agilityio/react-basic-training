import React, { useEffect, useState } from 'react';
import ICON from '@constants/toast-icon-src';
import './Toast.css';
import Button from '@components/common/buttons/Button';
import { ToastType } from 'types/toast';

interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, title, message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleCloseClick = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="toast-container">
      <div className={`toast toast--${type} ${isVisible ? 'toast--visible' : 'toast--hidden'}`}>
        <div className="toast__icon" dangerouslySetInnerHTML={{ __html: ICON[type] }}></div>
        <div className="toast__content">
          <p className="toast__title">{title}</p>
          <p className="toast__message">{message}</p>
        </div>
        <Button
          className="toast__close"
          htmlType="button"
          buttonType="close"
          onClick={handleCloseClick}
        >
          &times;
        </Button>
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
