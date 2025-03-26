import { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginPage';

const meta: Meta<typeof LoginForm> = {
  title: 'Component/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const LoadingState: Story = {
  args: {
    initialState: {
      isLoading: true,
    },
  },
  name: 'Button Loading State',
};

export const PrefilledEmail: Story = {
  args: {
    initialState: {
      email: 'admin@example.com',
      password: '',
    },
  },
};

export const WithValidationErrors: Story = {
  args: {
    initialErrors: {
      email: 'Invalid email format',
      password: 'Password must be at least 6 characters',
    },
  },
};

export const WithToastNotification: Story = {
  args: {
    initialToast: {
      show: true,
      type: 'error',
      title: 'Error!',
      message: 'Invalid email or password',
    },
  },
};

export const SuccessToast: Story = {
  args: {
    initialToast: {
      show: true,
      type: 'success',
      title: 'Success',
      message: 'Login successfully! Redirecting...',
    },
  },
};
