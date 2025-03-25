import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import Toast from '@components/common/toast/Toast';
import ConfirmDialog from '@components/common/toast/ConfirmDialog';
import { ToastType } from 'types/toast';

interface ToastContextProps {
  showToast: (
    type: Exclude<ToastType, 'confirm'>,
    title: string,
    message: string,
    duration?: number,
  ) => void;
  showConfirmation: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => void;
  hideToast: () => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastState {
  visible: boolean;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const showToast = (
    type: Exclude<ToastType, 'confirm'>,
    title: string,
    message: string,
    duration?: number,
  ) => {
    setToast({
      visible: true,
      type,
      title,
      message,
      duration,
      onConfirm: undefined,
      onCancel: undefined,
    });
  };

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => {
    setToast({
      visible: true,
      type: 'confirm',
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const contextValue = useMemo(() => ({ showToast, showConfirmation, hideToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast.visible && toast.type !== 'confirm' && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      {toast.visible && toast.type === 'confirm' && (
        <ConfirmDialog
          title={toast.title}
          message={toast.message}
          onClose={hideToast}
          onConfirm={toast.onConfirm}
          onCancel={toast.onCancel}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
