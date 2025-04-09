import { Meta, StoryObj } from '@storybook/react';
import ConfirmDialog from './index';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    onClose: { action: 'closed' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  args: {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    onClose: () => console.log('Dialog closed'),
    onConfirm: () => console.log('Action confirmed'),
    onCancel: () => console.log('Action cancelled'),
  },
};

export const DeleteConfirmation: Story = {
  args: {
    title: 'Delete Item',
    message: 'This action cannot be undone. Are you sure you want to delete this item?',
    onClose: () => console.log('Dialog closed'),
    onConfirm: () => console.log('Delete confirmed'),
    onCancel: () => console.log('Delete cancelled'),
  },
};

export const WarningDialog: Story = {
  args: {
    title: 'Warning',
    message: 'This operation will affect multiple records in your database. Do it anyways?',
    onClose: () => console.log('Dialog closed'),
    onConfirm: () => console.log('Warning acknowledged'),
    onCancel: () => console.log('Operation cancelled'),
  },
};
