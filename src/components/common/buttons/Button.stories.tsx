import { Meta, StoryObj } from '@storybook/react';
import './button.css';
import Button from '@components/common/buttons/Button';

const meta: Meta<typeof Button> = {
  title: 'Component/Button/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonType: {
      control: {
        type: 'select',
        options: ['add', 'delete', 'cancel', 'submit', 'save', 'confirm', 'close'],
      },
    },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    htmlType: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    onClick: () => console.log('Button clicked'),
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    buttonType: 'add',
    isLoading: false,
    fullWidth: false,
    disabled: false,
    onClick: () => console.log('Add item'),
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    buttonType: 'add',
    isLoading: true,
    fullWidth: false,
    disabled: false,
    onClick: () => console.log('On action'),
  },
};
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    buttonType: 'add',
    isLoading: false,
    fullWidth: false,
    disabled: true,
  },
};
