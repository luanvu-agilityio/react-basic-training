import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import Toast from '@components/common/Toast';
import ConfirmDialog from '@components/common/ConfirmDialog';
import { ToastType } from 'types/toast';

/**
 * Toast Context
 *
 * Manages application-wide toast notifications and confirmation dialogs.
 */

/**
 * Toast context interface defining available methods
 */
interface ToastContextProps {
  /** Shows a toast notification with specified type, title, and message */
  showToast: (
    type: Exclude<ToastType, 'confirm'>,
    title: string,
    message: string,
    duration?: number,
  ) => void;
  /** Shows a confirmation dialog with confirm/cancel actions */
  showConfirmation: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => void;

  /** Hides the currently visible toast/dialog */
  hideToast: () => void;
}

/**
 * Props for the Toast Provider component
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Internal state interface for toast management
 */
interface ToastState {
  visible: boolean;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Create context with undefined default value
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Toast Provider Component
 *
 * Provides toast notification functionality to the application.
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  // State to manage toast visibility and content
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  /**
   * Shows a toast notification
   * @param type - Type of toast (success, error, warning, info)
   * @param title - Toast header text
   * @param message - Toast content
   * @param duration - Optional display duration in milliseconds
   */
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

  /**
   * Shows a confirmation dialog
   * @param title - Dialog header text
   * @param message - Dialog content
   * @param onConfirm - Callback for confirm action
   * @param onCancel - Callback for cancel action
   */
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

  /**
   * Hides the current toast/dialog
   */
  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Memoize context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({ showToast, showConfirmation, hideToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Render Toast or ConfirmDialog based on type */}
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
          onConfirm={toast.onConfirm ?? (() => {})}
          onCancel={toast.onCancel ?? (() => {})}
        />
      )}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to use toast functionality
 *
 * @throws {Error} If used outside of ToastProvider
 * @returns {ToastContextProps} Toast context methods
 */
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
