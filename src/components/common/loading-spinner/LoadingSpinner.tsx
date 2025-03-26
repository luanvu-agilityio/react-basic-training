import React, { useEffect, useState } from 'react';

import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  loadingText?: string;
  minimumDisplayTime?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = true,
  loadingText = 'Please wait,,,',
  minimumDisplayTime = 1000,
}) => {
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

class LoadingSpinnerManager {
  private static instance: LoadingSpinnerManager | null = null;
  private loadingCount = 0;
  private callbacks: Array<(isLoading: boolean) => void> = [];

  private constructor() {}

  /**
   * Returns the singleton instance of the LoadingSpinnerManager.
   * Ensures that only one instance of the manager exists.
   */
  public static getInstance(): LoadingSpinnerManager {
    if (!LoadingSpinnerManager.instance) {
      LoadingSpinnerManager.instance = new LoadingSpinnerManager();
    }
    return LoadingSpinnerManager.instance;
  }

  /**
   * Increments the loading count and notifies all subscribers.
   * This is used to indicate that a loading process has started.
   */
  public show(): void {
    this.loadingCount++;
    this.notifySubscribers();
  }

  /**
   * Decrements the loading count (ensuring it doesn't go below zero)
   * and notifies all subscribers. This is used to indicate that a
   * loading process has ended.
   */
  public hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.notifySubscribers();
  }

  /**
   * Returns whether there are any active loading processes.
   * @returns {boolean} True if loadingCount > 0, otherwise false.
   */
  public isLoading(): boolean {
    return this.loadingCount > 0;
  }

  /**
   * Subscribes a callback to be notified whenever the loading state changes.
   * @param callback - A function to be called with the current loading state.
   * @returns {() => void} A function to unsubscribe the callback.
   */
  public subscribe(callback: (isLoading: boolean) => void): () => void {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  /**
   * Notifies all subscribed callbacks of the current loading state.
   * This is called internally whenever the loading state changes.
   */
  private notifySubscribers(): void {
    const isLoading = this.isLoading();
    this.callbacks.forEach((callback) => callback(isLoading));
  }
}

export const useLoadingSpinner = () => {
  const manager = LoadingSpinnerManager.getInstance();

  return {
    show: () => manager.show(),
    hide: () => manager.hide(),
    isLoading: () => manager.isLoading(),
  };
};

/**
 * Container component that manages the global loading spinner
 */
export const LoadingSpinnerContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const manager = LoadingSpinnerManager.getInstance();

  useEffect(() => {
    // Subscribe to loading state changes
    const unsubscribe = manager.subscribe(setIsLoading);
    return unsubscribe;
  }, []);

  return isLoading ? <LoadingSpinner /> : null;
};

export default LoadingSpinner;
