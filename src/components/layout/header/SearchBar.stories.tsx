import type { Meta, StoryObj } from '@storybook/react';
import SearchBar, { SearchBarProps } from './SearchBar';

const meta: Meta<SearchBarProps> = {
  title: 'Components/Header/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => console.log(`Search query: ${query}`),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSearch: (query: string) => console.log(`Search query: ${query}`),
    placeholder: 'Search students...',
  },
};
