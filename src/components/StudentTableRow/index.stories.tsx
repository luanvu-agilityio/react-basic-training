import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StudentTableRow from './index';
import { IStudent } from 'types/student';
import StudentTableHeader from '@components/StudentTableHeader';

const meta: Meta<typeof StudentTableRow> = {
  title: 'Components/StudentTableRow',
  component: StudentTableRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Renders a table row for a student record with configurable columns and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    student: {
      description: 'Student data to display in the row',
    },
    onEdit: {
      action: 'edited',
      description: 'Callback function when edit button is clicked',
    },
    onDelete: {
      action: 'deleted',
      description: 'Callback function when delete button is clicked',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <StudentTableHeader />
          <tbody>
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudentTableRow>;

// Sample student data
const sampleStudent: IStudent = {
  id: '1',
  name: 'Jane Smith Jr',
  email: 'jane.smithjr@example.com',
  phoneNum: '(123) 456-7890',
  enrollNum: 'EN-0904-2025',
  dateAdmission: '09/04/2025',
  avatar: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1743393699/uheuulhahgpbuudrkyaa.jpg',
};

const sampleStudentNoAvatar: IStudent = {
  id: '2',
  name: 'Alice Tran',
  email: 'alice.tran@example.com',
  phoneNum: '(0888) 888-8888',
  enrollNum: 'EN-123-4567',
  dateAdmission: '22/11/2024',
};

// Default state with avatar
export const WithAvatar: Story = {
  args: {
    student: sampleStudent,
  },
};

// Without avatar (uses default)
export const WithoutAvatar: Story = {
  args: {
    student: sampleStudentNoAvatar,
  },
};

// Row with long content
export const WithLongContent: Story = {
  args: {
    student: {
      id: '3',
      name: 'Alex John Alice Tom',
      email: 'alex.john.alice.tom@very-long-text-here-for-example.com',
      phoneNum: '(555) 123-4567-891011',
      enrollNum: 'SAMPLE_ENROLLMENT_NUMBER_1234567890',
      dateAdmission: 'September 15, 2023',
      avatar:
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1743393692/svxq9gzsjdav32kbuina.jpg',
    } as IStudent,
  },
};
