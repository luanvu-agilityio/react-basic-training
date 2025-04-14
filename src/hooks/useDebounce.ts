import { useState, useEffect } from 'react';

/**
 * A custom hook that returns a debounced value after a specified delay.
 *
 * @template T - The type of the value being debounced
 * @param value - The value to be debounced
 * @param delay - The delay in milliseconds before the value updates
 * @returns The debounced value
 *
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
