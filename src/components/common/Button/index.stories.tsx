import { Meta, StoryObj } from '@storybook/react';
import './index.css';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Component/Button/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: () => console.log('Button clicked'),
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',

    isLoading: false,
    disabled: false,
    onClick: () => console.log('Add item'),
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',

    isLoading: true,
    disabled: false,
    onClick: () => console.log('On action'),
  },
};
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',

    isLoading: false,
    disabled: true,
  },
};
