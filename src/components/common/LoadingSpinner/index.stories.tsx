import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './index';
import { Button } from '@components/common/Button';

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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      // Your async operations here
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner loadingText="Fetching data..." />}
      <Button onClick={handleFetchData} disabled={isLoading} className="button">
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </Button>
    </div>
  );
};
