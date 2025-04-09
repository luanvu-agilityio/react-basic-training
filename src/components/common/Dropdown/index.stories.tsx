import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

// Custom render function to handle state
const DropdownWithState = (args: React.ComponentProps<typeof Dropdown>) => {
  const [selectedValue, setSelectedValue] = useState(args.currentValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string, text: string) => {
    setSelectedValue(value);
    args.onSelect(value, text);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ minHeight: '400px', padding: '20px' }}>
      <Dropdown
        {...args}
        currentValue={selectedValue}
        onSelect={handleSelect}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};

export const SortField: StoryObj<typeof Dropdown> = {
  render: DropdownWithState,
  args: {
    id: 'sortField',
    label: 'Sort By',
    options: [
      { value: 'name', text: 'Name' },
      { value: 'date', text: 'Date' },
      { value: 'size', text: 'Size' },
      { value: 'type', text: 'Type' },
    ],
    currentValue: 'name',
    onSelect: (value, text) => console.log(`Selected: ${value} (${text})`),
  },
};

export const SortOrder: StoryObj<typeof Dropdown> = {
  render: DropdownWithState,
  args: {
    id: 'sortOrder',
    label: 'Order',
    options: [
      { value: 'asc', text: 'Ascending' },
      { value: 'desc', text: 'Descending' },
    ],
    currentValue: 'asc',
    onSelect: (value, text) => console.log(`Selected: ${value} (${text})`),
  },
};

export const LongOptionsList: StoryObj<typeof Dropdown> = {
  render: DropdownWithState,
  args: {
    id: 'categories',
    label: 'Category',
    options: [
      { value: 'electronics', text: 'Electronics' },
      { value: 'books', text: 'Books' },
      { value: 'clothing', text: 'Clothing' },
      { value: 'home', text: 'Home & Kitchen' },
      { value: 'sports', text: 'Sports & Outdoors' },
      { value: 'toys', text: 'Toys & Games' },
      { value: 'beauty', text: 'Beauty & Personal Care' },
    ],
    currentValue: 'electronics',
    onSelect: (value, text) => console.log(`Selected: ${value} (${text})`),
  },
};
