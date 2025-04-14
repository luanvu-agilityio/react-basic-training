import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AvatarUpload from './index';

const meta: Meta<typeof AvatarUpload> = {
  title: 'Components/AvatarUpload',
  component: AvatarUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that handles image upload functionality for student avatars with preview capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    avatar: {
      control: 'text',
      description: 'URL of the current avatar image',
    },
    previewUrl: {
      control: 'text',
      description: 'URL of the preview image (temporarily clone and replace the avatar)',
    },
    onFileSelect: {
      action: 'fileSelected',
      description: 'Callback function to handle the selected file',
    },
    error: {
      control: 'text',
      description: 'Error message to display if upload fails',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarUpload>;

// Example of a controlled component wrapper to demonstrate file selection
const AvatarUploadWithState = (args: React.ComponentProps<typeof AvatarUpload>) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(args.previewUrl);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Create a local object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(undefined);
    }

    // Call the original action for Storybook controls
    args.onFileSelect(file);
  };

  return <AvatarUpload {...args} previewUrl={previewUrl} onFileSelect={handleFileSelect} />;
};

// Default state with placeholder camera icon
export const Default: Story = {
  render: (args) => <AvatarUploadWithState {...args} />,
  args: {
    avatar: undefined,
    previewUrl: undefined,
    error: undefined,
  },
};

// With existing avatar
export const WithAvatar: Story = {
  render: (args) => <AvatarUploadWithState {...args} />,
  args: {
    avatar:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1741144070/dfh4itqdkturgj3yqtwn.jpg',
    previewUrl: undefined,
    error: undefined,
  },
};

// With error message
export const WithError: Story = {
  render: (args) => <AvatarUploadWithState {...args} />,
  args: {
    avatar: undefined,
    previewUrl: undefined,
    error: 'File size exceeds 5MB limit',
  },
};

// With preview URL (simulating selected but not uploaded file)
export const WithPreview: Story = {
  render: (args) => <AvatarUploadWithState {...args} />,
  args: {
    avatar: undefined,
    previewUrl:
      'https://res.cloudinary.com/ds82onf5q/image/upload/v1741144070/dfh4itqdkturgj3yqtwn.jpg',
    error: undefined,
  },
};
