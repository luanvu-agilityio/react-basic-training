import { useEffect, useState } from 'react';
import './index.css';

/**
 * LoadingSpinner Component
 *
 * A reusable loading spinner component for React applications.
 *
 * This component displays a spinner with optional text to indicate loading states.
 *
 * Features:
 * - Full-screen or inline spinner display
 * - Customizable loading text
 * - Minimum display time to prevent flickering
 * - Clean-up logic to manage visibility state
 */

export interface LoadingSpinnerProps {
  fullScreen?: boolean;
  loadingText?: string;
  minimumDisplayTime?: number;
}

export const LoadingSpinner = ({
  fullScreen = true,
  loadingText = 'Please wait...',
  minimumDisplayTime = 1000,
}: LoadingSpinnerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimestamp] = useState(Date.now());

  useEffect(() => {
    // When the component mounts, make it visible
    setIsVisible(true);

    // If there's a minimum display time, handle it
    if (minimumDisplayTime > 0) {
      const elapsedTime = Date.now() - showTimestamp;
      const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);

      const timerId = setTimeout(() => {
        setIsVisible(true);
      }, remainingTime);

      return () => clearTimeout(timerId);
    }
  }, [minimumDisplayTime, showTimestamp]);

  return (
    <div
      id="loadingContainer"
      className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">{loadingText}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
