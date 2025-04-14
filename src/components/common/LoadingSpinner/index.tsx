import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div<{ fullScreen: boolean; isVisible: boolean }>`
  z-index: 9999999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 3s linear infinite;
`;

const Text = styled.p`
  color: #333;
  font-size: 17px;
  margin: 0;
`;

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
    <LoadingContainer id="loadingContainer" fullScreen={fullScreen} isVisible={isVisible}>
      <LoadingContent>
        <Spinner />
        <Text>{loadingText}</Text>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
