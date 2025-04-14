import { Meta, StoryObj } from '@storybook/react';
import Text from './index';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    as: {
      control: { type: 'select' },
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Paragraph: Story = {
  args: {
    text: 'This is a paragraph text',
    as: 'p',
  },
};

export const Heading1: Story = {
  args: {
    text: 'This is a heading 1',
    as: 'h1',
  },
};

export const CustomStyled: Story = {
  args: {
    text: 'This text has custom styling',
    as: 'p',
    style: { color: 'blue', fontStyle: 'italic' },
    className: 'custom-text',
  },
};
