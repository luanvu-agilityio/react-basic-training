import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, LoadingSpinnerContainer, useLoadingSpinner } from './LoadingSpinner';
import Button from '../buttons/Button';

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

  const handleShowSpinner = () => {
    show();
    // Auto-hide after 3 seconds
    setTimeout(() => {
      hide();
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h2>Global Loading Spinner Demo</h2>
      <p>Click the button below to show the loading spinner for 3 seconds.</p>
      <div>
        <Button htmlType="button" onClick={handleShowSpinner} disabled={isLoading()}>
          {isLoading() ? 'Loading...' : 'Show Loading Spinner'}
        </Button>
      </div>
      <p>Current Status: {isLoading() ? 'Loading' : 'Idle'}</p>

      <LoadingSpinnerContainer />
    </div>
  );
};
