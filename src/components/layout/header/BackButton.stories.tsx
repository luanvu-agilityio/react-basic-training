import type { Meta, StoryObj } from '@storybook/react';
import BackButton, { BackButtonProps } from './BackButton';

const meta: Meta<BackButtonProps> = {
  title: 'Components/Header/BackButton',
  component: BackButton,
  tags: ['auto-docs'],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Back button clicked'),
  },
};
