import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { IStudent } from 'types/student';

// Mock student data for stories, from database
const mockStudents: IStudent[] = [
  {
    name: 'David A',
    email: 'david@gmail.com.vn',
    phoneNum: '0807325450',
    enrollNum: 'EN9284215',
    dateAdmission: '4-Feb, 2025',
    id: 'e001a461-f496-45ce-a578-2dd6406ba1b0',
  },
  {
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    phoneNum: '1001234567',
    enrollNum: 'EN4567890',
    dateAdmission: '4-Feb, 2025',
    id: '45678901-4567-4567-4567-456789012345',
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phoneNum: '0801234567',
    enrollNum: 'EN2345678',
    dateAdmission: '2-Feb, 2025',
    id: '23456789-2345-2345-2345-234567890123',
  },
];

// Wrapper component for React Router
const HeaderWithRouter = (props: React.ComponentProps<typeof Header>) => (
  <BrowserRouter>
    <Header {...props} />
  </BrowserRouter>
);

const meta = {
  title: 'Components/Header',
  component: HeaderWithRouter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    allStudents: { control: 'object' },
    onSearchResults: { action: 'search results' },
    onNotificationClick: { action: 'notification clicked' },
    customBackHandler: { action: 'custom back clicked' },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    allStudents: mockStudents,
    onSearchResults: (students: IStudent[]) => console.log('Search results:', students),
  },
};

export const WithCustomBackHandler: Story = {
  args: {
    allStudents: mockStudents,
    onSearchResults: (students: IStudent[]) => console.log('Search results:', students),
    customBackHandler: () => console.log('Custom back button handler executed'),
  },
};

export const WithNotifications: Story = {
  args: {
    allStudents: mockStudents,
    onSearchResults: (students: IStudent[]) => console.log('Search results:', students),
    onNotificationClick: () => console.log('Notification clicked'),
  },
};
