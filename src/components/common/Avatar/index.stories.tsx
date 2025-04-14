import { Meta, StoryObj } from '@storybook/react';
import Avatar from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742547304/iovvnjhgfhfybf25bnmu.jpg',
    alt: 'User Avatar',
    className: 'avatar',
  },
};

export const CustomStyle: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743393704/vujoz5shkd6op5k8rppz.jpg',
    alt: 'User Avatar with Custom Style',
    className: 'avatar-custom',
    style: {
      borderRadius: '10px',
      border: '2px solid blue',
      width: '100px',
      height: '100px',
    },
  },
};

export const SmallAvatar: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743393692/svxq9gzsjdav32kbuina.jpg',
    alt: 'Small Avatar',
    className: 'avatar-small',
    style: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
    },
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743393692/svxqv32kbuina.jpg',
    alt: 'Avatar with Fallback',
    className: 'avatar',
    onError: () => console.log('Image failed to load'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the avatar handles loading errors.',
      },
    },
  },
};
