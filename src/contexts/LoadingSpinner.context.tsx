import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { LoadingSpinner, LoadingSpinnerProps } from '@components/common/LoadingSpinner';

// Define the type for our context value
interface LoadingContextType {
  show: () => void;
  hide: () => void;
  isLoading: boolean;
}

// Create the context with a default value (null with type assertion)
const LoadingContext = createContext<LoadingContextType | null>(null);

interface LoadingProviderProps {
  children: ReactNode;
  spinnerProps?: LoadingSpinnerProps;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  spinnerProps = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingCount = useRef(0);

  const show = () => {
    loadingCount.current++;
    setIsLoading(true);
  };

  const hide = () => {
    loadingCount.current = Math.max(0, loadingCount.current - 1);
    if (loadingCount.current === 0) {
      setIsLoading(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading }}>
      {children}
      {isLoading && <LoadingSpinner {...spinnerProps} />}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading spinner context
export const useLoadingSpinner = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoadingSpinner must be used within a LoadingProvider');
  }

  return context;
};
