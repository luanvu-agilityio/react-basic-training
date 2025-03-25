import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

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
    activeItem: {
      options: ['home', 'course', 'student', 'payment', 'report', 'setting'],
      control: { type: 'select' },
      description: 'Currently active navigation item',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the sidebar is expanded or collapsed',
    },
    onNavItemClick: { action: 'clicked' },
    onLogout: { action: 'logout clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    username: 'Karthi Madesh',
    userRole: 'Admin',
    userProfileImage: '../../src/assets/images/user-images/user-profile.png',
    activeItem: 'students',
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
    activeItem: 'payment',
  },
};

export const DifferentUser: Story = {
  args: {
    username: 'Jane Doe',
    userRole: 'Teacher',
    userProfileImage: './assets/images/user-images/alternate-profile.png',
    activeItem: 'home',
    expanded: true,
  },
};
