import { Meta, StoryObj } from '@storybook/react';
import ImageIcon from './index'; // Make sure path matches your file structure

const meta: Meta<typeof ImageIcon> = {
  title: 'Components/ImageIcon',
  component: ImageIcon,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'number' },
    className: { control: 'text' },
    loading: {
      control: { type: 'select' },
      options: ['lazy', 'eager'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageIcon>;

export const Default: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg',
    alt: 'Default Icon',
  },
};

export const LargeIcon: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg',
    alt: 'Large Icon',
    size: 48,
  },
};

export const CustomClass: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868124/back_sk4lcp.svg',
    alt: 'Custom Class Icon',
    className: 'custom-icon',
  },
};
