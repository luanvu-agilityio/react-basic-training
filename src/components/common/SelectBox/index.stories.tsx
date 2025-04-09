import { Meta, StoryObj } from '@storybook/react';
import SelectBox from './index';

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    className: { control: 'text' },
    value: { control: 'text' },
    options: { control: 'object' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  args: {
    id: 'default-select',
    value: 1,
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    onChange: (value) => console.log('Selected value:', value),
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-select',
    value: 2,
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    onChange: (value) => console.log('Selected value:', value),
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    id: 'custom-class-select',
    className: 'custom-select',
    value: 3,
    options: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    onChange: (value) => console.log('Selected value:', value),
  },
};
