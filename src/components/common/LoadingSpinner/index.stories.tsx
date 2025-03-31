import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useLoadingSpinner } from '@contexts/LoadingSpinner.context';
import { LoadingSpinner } from './index';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullScreen: {
      control: 'boolean',
      description: 'Whether the spinner covers the entire screen',
    },
    loadingText: {
      control: 'text',
      description: 'Text displayed below the spinner',
    },
    minimumDisplayTime: {
      control: { type: 'number', min: 0, max: 10000, step: 100 },
      description: 'Minimum time in milliseconds the spinner will be displayed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

// Basic example
export const Default: Story = {
  args: {
    fullScreen: true,
    loadingText: 'Please wait...',
    minimumDisplayTime: 1000,
  },
};

// Example with custom text
export const CustomText: Story = {
  args: {
    fullScreen: true,
    loadingText: 'Loading data...',
    minimumDisplayTime: 1000,
  },
};

// Example with the global loading spinner manager
export const GlobalSpinnerDemo: React.FC = () => {
  const { show, hide, isLoading } = useLoadingSpinner();

  const handleFetchData = async () => {
    show(); // Show the spinner
    try {
      // Your async operations here
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      hide(); // Hide the spinner
    }
  };

  return (
    <div>
      <button onClick={handleFetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
    </div>
  );
};
