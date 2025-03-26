import type { Meta, StoryObj } from '@storybook/react';
import NotificationIcon, { NotificationIconProps } from './NotificationIcon';

const meta: Meta<NotificationIconProps> = {
  title: 'Components/Header/NotificationIcon',
  component: NotificationIcon,
  tags: ['auto-docs'],
} satisfies Meta<typeof NotificationIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Notification clicked'),
  },
};

export const WithNotificationBadge: Story = {
  args: {
    onClick: () => console.log('Notification clicked'),
    hasNotifications: true,
    notificationCount: 5,
  },
};
