import { Meta, StoryObj } from '@storybook/react';
import Title from './index'; // Make sure path matches your file structure

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    title: 'Default Title',
  },
};

export const CustomClass: Story = {
  args: {
    title: 'Custom Class Title Example',
    className: 'custom-title',
  },
};
