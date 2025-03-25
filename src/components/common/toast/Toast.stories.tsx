import { Meta, StoryObj } from '@storybook/react';
import './Toast.css';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'confirm'],
      description: 'Type of toast notification',
    },
    title: {
      control: 'text',
      description: 'Toast title',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    duration: {
      control: 'number',
      description: 'Duration before auto close (for non confirm type only)',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback function when toast is closed',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;
export const SuccessState: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully',
    duration: 3000,
    onClose: () => console.log('Toast closed'),
  },
};

export const ErrorState: Story = {
  args: {
    type: 'error',
    title: 'Error!',
    message: 'Something went wrong. Please try again later',
    duration: 3000,
    onClose: () => console.log('Toast closed'),
  },
};

export const InfoState: Story = {
  args: {
    type: 'info',
    title: 'Information!',
    message: 'Here is some important information you should know',
    duration: 3000,
    onClose: () => console.log('Toast closed'),
  },
};

export const WarningState: Story = {
  args: {
    type: 'warning',
    title: 'Warning!',
    message: 'This action may lead to unexpected error',
    duration: 3000,
    onClose: () => console.log('Toast closed'),
  },
};
