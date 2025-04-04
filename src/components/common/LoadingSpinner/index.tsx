import React, { useEffect, useState } from 'react';
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
  const [shouldBeVisible, setShouldBeVisible] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(0);

  useEffect(() => {
    // When the component mounts, make it visible
    setShowTimestamp(Date.now());
    setIsVisible(true);
    setShouldBeVisible(true);

    // Set up a cleanup function to hide the spinner when component unmounts
    return () => {
      setShouldBeVisible(false);
    };
  }, []);

  // Handle the minimum display time logic
  useEffect(() => {
    if (!shouldBeVisible && isVisible) {
      const timeSinceShow = Date.now() - showTimestamp;

      if (timeSinceShow < minimumDisplayTime) {
        // If spinner hasn't been shown for minimum time, delay hiding
        const timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, minimumDisplayTime - timeSinceShow);

        return () => clearTimeout(timeoutId);
      } else {
        // If minimum time has passed, hide immediately
        setIsVisible(false);
      }
    }
  }, [shouldBeVisible, isVisible, showTimestamp, minimumDisplayTime]);

  // If spinner shouldn't be visible, don't render anything
  if (!isVisible) return null;

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
