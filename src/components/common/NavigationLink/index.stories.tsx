import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationLink from './index';

const meta: Meta<typeof NavigationLink> = {
  title: 'Components/NavigationLink',
  component: NavigationLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for sidebar navigation and action items with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to display in the navigation link',
    },
    to: {
      control: 'text',
      description: 'URL for the link (optional for action items like logout)',
    },
    icon: {
      control: 'text',
      description: 'Icon URL to display',
    },
    iconRight: {
      control: 'boolean',
      description: 'Whether the icon should be displayed on the right side',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the navigation link is currently active',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the navigation item',
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: '2rem', backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationLink>;

// Default navigation link with route
export const Default: Story = {
  args: {
    text: 'Home',
    to: '/home',
    icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/home_ydi5zu.svg',
    iconRight: false,
    isActive: true,
  },
};

// Navigation link with icon on the right
export const IconRight: Story = {
  args: {
    text: 'Settings',
    to: '/settings',
    icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/setting_qbe1fw.svg',
    iconRight: true,
    isActive: true,
  },
};

// Inactive navigation link
export const Inactive: Story = {
  args: {
    text: 'Reports',
    to: '/reports',
    icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/report_rm69ya.svg',
    iconRight: false,
    isActive: false,
  },
};

// Action item (like logout) without route
export const ActionItem: Story = {
  args: {
    text: 'Logout',
    icon: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742867571/logout_qfh4jb.svg',
    iconRight: true,
    isActive: true,
  },
};

// Navigation link without icon
export const TextOnly: Story = {
  args: {
    text: 'Profile',
    to: '/profile',
    isActive: true,
  },
};
