import { useState, useEffect } from 'react';
/**
 * A custom React hook that tracks whether the current viewport width is mobile-sized.
 *
 * @returns {boolean} Returns true if the viewport width is 480px or less, false otherwise.
 *
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 480);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export default useIsMobile;
