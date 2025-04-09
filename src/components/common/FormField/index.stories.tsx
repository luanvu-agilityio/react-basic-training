import { Meta, StoryObj } from '@storybook/react';
import FormField from './index';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'date', 'checkbox', 'radio'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    onInputChange: { action: 'changed' },
    onKeyDown: { action: 'key pressed' },
    onClick: { action: 'clicked' },
    className: { control: 'text' },
    labelClassName: { control: 'text' },
    hasError: { control: 'boolean' },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    imgSrc: { control: 'text' },
    imgAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    value: '',
    required: true,
    onInputChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const WithError: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    required: true,
    hasError: true,
    onInputChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-field',
    label: 'Disabled Field',
    type: 'text',
    value: 'Cannot edit this value',
    disabled: true,
    onInputChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const WithIcon: Story = {
  args: {
    name: 'search',
    label: 'Searchbar',
    type: 'text',
    placeholder: 'Search...',
    value: '',
    imgSrc: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868125/search_jksrfd.svg',
    imgAlt: 'Search icon',
    iconPosition: 'right',
    onInputChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const WithIconLeft: Story = {
  args: {
    name: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Vietnam',
    value: 'Vietnam',
    imgSrc: 'https://cdn-icons-png.flaticon.com/256/2151/2151437.png',
    imgAlt: 'Vietnam flag',
    iconPosition: 'left',
    onInputChange: (e) => console.log('Input changed:', e.target.value),
  },
};
