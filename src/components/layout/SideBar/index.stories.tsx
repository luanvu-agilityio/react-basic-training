import { Meta, StoryObj } from '@storybook/react';
import Sidebar from './index';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  title: 'Components/Sidebar',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the sidebar is expanded or collapsed',
    },
    onNavItemClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    username: 'Karthi Madesh',
    userRole: 'Admin',
    userProfileImage: '../../src/assets/images/user-images/user-profile.png',

    expanded: true,
  },
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    expanded: false,
  },
};

export const DifferentActiveTab: Story = {
  args: {
    ...Default.args,
  },
};

export const DifferentUser: Story = {
  args: {
    username: 'Jane Doe',
    userRole: 'Teacher',
    userProfileImage: './assets/images/user-images/alternate-profile.png',

    expanded: true,
  },
};
