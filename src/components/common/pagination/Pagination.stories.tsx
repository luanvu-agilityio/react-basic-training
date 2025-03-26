import React, { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 1 },
      description: 'Total number of items to paginate',
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Callbacks function triggered when page or items per page changes',
    },
    initialPage: {
      control: { type: 'number', min: 1 },
      description: 'Initial page to display, default to 1',
    },
    initialItemsPerPage: {
      control: { type: 'select', options: [5, 10, 15, 20] },
      description: 'Initial items per page, default to 5 ',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalItems: 100,
    initialPage: 1,
    initialItemsPerPage: 5,
  },
  render: (args) => (
    <Pagination
      {...args}
      onPageChange={(page, itemsPerPage) => {
        console.log(`Page: ${page}, Items per page: ${itemsPerPage}`);
        args.onPageChange?.(page, itemsPerPage);
      }}
    />
  ),
};

// Example with small number of items
export const FewItems: Story = {
  args: {
    totalItems: 12,
    initialPage: 1,
    initialItemsPerPage: 5,
  },
};

//Example with large number of items
export const LargeNumOfItems: Story = {
  args: {
    totalItems: 500,
    initialPage: 1,
    initialItemsPerPage: 15,
  },
};

//Example: start on Page 4
export const StartOnPage4: Story = {
  args: {
    totalItems: 200,
    initialPage: 4,
    initialItemsPerPage: 15,
  },
};

export const WithMockData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing how the pagination works with a mock data table',
      },
    },
  },
  render: () => {
    // Define student interface
    interface Student {
      id: number;
      name: string;
      grade: number;
    }

    // Mock student data
    const allStudents: Student[] = [];

    // Create 100 students
    for (let i = 0; i < 100; i++) {
      const student = {
        id: i + 1,
        name: `Student ${i + 1}`,
        grade: Math.floor(Math.random() * 100),
      };
      allStudents.push(student);
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [displayedStudents, setDisplayedStudents] = useState(allStudents.slice(0, itemsPerPage));

    const handlePageChange = (page: number, perPage: number) => {
      setCurrentPage(page);
      setItemsPerPage(perPage);
      const startIndex = (page - 1) * perPage;
      setDisplayedStudents(allStudents.slice(startIndex, startIndex + perPage));
    };

    return (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                ID
              </th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                Name
              </th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{student.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{student.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {student.grade}/100
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalItems={allStudents.length}
          onPageChange={handlePageChange}
          initialPage={currentPage}
          initialItemsPerPage={itemsPerPage}
        />
      </div>
    );
  },
};
