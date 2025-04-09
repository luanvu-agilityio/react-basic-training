import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect clicks outside of a referenced element
 *
 * @param onClickOutside Callback function to execute when a click outside is detected
 * @param enabled Boolean to conditionally enable/disable the click detection
 * @returns React ref to attach to the element you want to monitor
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
  onClickOutside: () => void,
  enabled: boolean = true,
) => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [onClickOutside],
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [enabled, handleClickOutside]);

  return ref;
};

export default useClickOutside;
