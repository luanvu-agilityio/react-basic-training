import { useEffect } from 'react';

/**
 * A custom hook that triggers a callback function when the Escape key is pressed.
 *
 * @param callback - The function to be executed when the Escape key is pressed
 * @param enabled - Optional boolean to enable/disable the escape key listener. Defaults to true
 *
 */
export const useEscapeKey = (callback: () => void, enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [callback, enabled]);
};
